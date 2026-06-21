import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

const STORAGE_KEY = "earthy_spin_wheel_fd50";

type Segment = {
  label: string;
  win: boolean;
  color: string;
};

// 6 segments — 3 winners (50% OFF) alternating with 3 "Try Again"
const SEGMENTS: Segment[] = [
  { label: "50% OFF", win: true, color: "hsl(var(--primary))" },
  { label: "Try Again", win: false, color: "hsl(var(--petal))" },
  { label: "50% OFF", win: true, color: "hsl(var(--primary))" },
  { label: "Try Again", win: false, color: "hsl(var(--petal))" },
  { label: "50% OFF", win: true, color: "hsl(var(--primary))" },
  { label: "Try Again", win: false, color: "hsl(var(--petal))" },
];

const WIN_CODE = "fd50";
const SEG_ANGLE = 360 / SEGMENTS.length;

interface SpinWheelProps {
  compact?: boolean;
}

const SpinWheel = ({ compact = false }: SpinWheelProps) => {
  const sizeClass = compact ? "w-52 h-52 sm:w-56 sm:h-56" : "w-72 h-72 sm:w-80 sm:h-80";
  const hubSize = compact ? "w-9 h-9" : "w-12 h-12";
  const iconSize = compact ? "w-4 h-4" : "w-5 h-5";
  const textSize = compact ? "text-xs sm:text-sm" : "text-sm sm:text-base";
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

    const targetIndex = Math.floor(Math.random() * SEGMENTS.length);
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

  const conic = SEGMENTS.map((s, i) => {
    const start = i * SEG_ANGLE;
    const end = (i + 1) * SEG_ANGLE;
    return `${s.color} ${start}deg ${end}deg`;
  }).join(", ");

  return (
    <div className="flex flex-col items-center gap-6">
      <div className={`relative ${sizeClass}`}>
        {/* Pointer */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-10">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: compact ? "10px solid transparent" : "14px solid transparent",
              borderRight: compact ? "10px solid transparent" : "14px solid transparent",
              borderTop: compact ? "16px solid hsl(var(--primary))" : "22px solid hsl(var(--primary))",
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
                <span className={`block text-center font-display ${textSize} text-foreground whitespace-nowrap`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center hub */}
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${hubSize} rounded-full bg-card border-4 border-primary/40 shadow-soft flex items-center justify-center`}>
          <Gift className={`${iconSize} text-primary`} />
        </div>
      </div>

      {!alreadySpun && (
        <Button onClick={handleSpin} disabled={spinning} size="lg" className="px-10">
          {spinning ? "Spinning..." : "Spin to Win!"}
        </Button>
      )}

      {alreadySpun && result?.win && (
        <div className="text-center space-y-2 max-w-md">
          <p className="font-display text-2xl text-primary">You won 50% off!</p>
          <p className="text-foreground/80 font-body">
            Enter code{" "}
            <span className="font-semibold text-primary tracking-wide">{WIN_CODE}</span>{" "}
            at checkout for 50% off a standard rate 60, 75, or 90-minute Classic Swedish session.
            Valid for appointments on June 21, 22, or 23, 2026 only.
          </p>
        </div>
      )}

      {alreadySpun && result && !result.win && (
        <p className="text-foreground/80 font-body text-center max-w-md">
          So close! Better luck next time.
        </p>
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
