import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

const STORAGE_KEY = "earthy_spin_wheel_v1";

type Segment = {
  label: string;
  win: boolean;
  color: string;
};

// 6 alternating segments: win, lose, win, lose, win, lose
const SEGMENTS: Segment[] = [
  { label: "$5 OFF", win: true, color: "hsl(var(--primary))" },
  { label: "Next Time!", win: false, color: "hsl(var(--petal))" },
  { label: "$5 OFF", win: true, color: "hsl(var(--primary))" },
  { label: "Next Time!", win: false, color: "hsl(var(--petal))" },
  { label: "$5 OFF", win: true, color: "hsl(var(--primary))" },
  { label: "Next Time!", win: false, color: "hsl(var(--petal))" },
];

const SEG_ANGLE = 360 / SEGMENTS.length;

const SpinWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Segment | null>(null);
  const [alreadySpun, setAlreadySpun] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAlreadySpun(true);
        if (parsed.resultIndex != null) {
          setResult(SEGMENTS[parsed.resultIndex]);
          setRotation(parsed.rotation || 0);
        }
      } catch {
        setAlreadySpun(true);
      }
    }
  }, []);

  const handleSpin = () => {
    if (spinning || alreadySpun) return;
    setSpinning(true);

    const winIndices = SEGMENTS.map((s, i) => (s.win ? i : -1)).filter((i) => i >= 0);
    const loseIndices = SEGMENTS.map((s, i) => (!s.win ? i : -1)).filter((i) => i >= 0);
    // 50/50 odds — 3 win, 3 lose
    const pool = Math.random() < 0.5 ? winIndices : loseIndices;
    const targetIndex = pool[Math.floor(Math.random() * pool.length)];

    // Pointer is at top (12 o'clock). Segment 0 is drawn starting at top going clockwise.
    // Center of segment i is at angle (i * SEG_ANGLE + SEG_ANGLE/2) from top, clockwise.
    // We rotate the wheel by -segCenter so that segment lands under top pointer,
    // plus extra full rotations for drama.
    const segCenter = targetIndex * SEG_ANGLE + SEG_ANGLE / 2;
    const extraSpins = 6;
    const finalRotation = extraSpins * 360 + (360 - segCenter);

    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(SEGMENTS[targetIndex]);
      setAlreadySpun(true);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ resultIndex: targetIndex, rotation: finalRotation, ts: Date.now() }),
      );
    }, 4200);
  };

  // Build conic-gradient for wheel
  const conic = SEGMENTS.map((s, i) => {
    const start = i * SEG_ANGLE;
    const end = (i + 1) * SEG_ANGLE;
    return `${s.color} ${start}deg ${end}deg`;
  }).join(", ");

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-72 h-72 sm:w-80 sm:h-80">
        {/* Pointer */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-10">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "14px solid transparent",
              borderRight: "14px solid transparent",
              borderTop: "22px solid hsl(var(--primary))",
              filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.2))",
            }}
          />
        </div>

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full border-4 border-primary/30 shadow-soft relative overflow-hidden"
          style={{
            background: `conic-gradient(${conic})`,
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? "transform 4s cubic-bezier(0.17, 0.67, 0.21, 0.99)"
              : "none",
          }}
        >
          {SEGMENTS.map((s, i) => {
            // Label placed along radius at center of segment
            const angle = i * SEG_ANGLE + SEG_ANGLE / 2;
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  transform: `rotate(${angle - 90}deg) translateX(20%)`,
                  width: "50%",
                }}
              >
                <span className="block text-center font-display text-sm sm:text-base text-foreground whitespace-nowrap">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border-4 border-primary/40 shadow-soft flex items-center justify-center">
          <Gift className="w-5 h-5 text-primary" />
        </div>
      </div>

      {!alreadySpun && (
        <Button onClick={handleSpin} disabled={spinning} size="lg" className="px-10">
          {spinning ? "Spinning..." : "Spin to Win!"}
        </Button>
      )}

      {alreadySpun && result && (
        <div className="text-center space-y-2 max-w-md">
          {result.win ? (
            <>
              <p className="font-display text-2xl text-primary">You won $5 off!</p>
              <p className="text-foreground/80 font-body">
                Enter code{" "}
                <span className="font-semibold text-primary tracking-wide">ex5</span>{" "}
                at checkout for an extra $5.00 off any Early Bird Special.
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-2xl text-primary">Next time!</p>
              <p className="text-foreground/80 font-body">
                No discount this spin — but you can still book an Early Bird Special and save 25%.
              </p>
            </>
          )}
        </div>
      )}

      {alreadySpun && !result && (
        <p className="text-foreground/70 font-body text-center text-sm">
          You've already used your spin on this device.
        </p>
      )}
    </div>
  );
};

export default SpinWheel;
