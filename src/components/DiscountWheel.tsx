import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BLANK_RESULT_MESSAGE,
  SEGMENTS,
  SEGMENT_COUNT,
  SPIN_DURATION_MS,
  STORAGE_KEY,
  canSpin,
  formatCountdown,
  nextSpinAt,
  pickSegmentIndex,
  resultMessage,
} from "@/lib/discount-wheel";

interface SpinRecord {
  at: number;
  index: number;
}

const SWEEP_MS = SPIN_DURATION_MS;

function readRecord(): SpinRecord | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SpinRecord>;
    if (
      typeof parsed.at === "number" &&
      Number.isFinite(parsed.at) &&
      typeof parsed.index === "number" &&
      Number.isInteger(parsed.index) &&
      parsed.index >= 0 &&
      parsed.index < SEGMENT_COUNT
    ) {
      return { at: parsed.at, index: parsed.index };
    }
    return null;
  } catch {
    return null;
  }
}

function wedgePath(index: number): string {
  const radius = 96;
  const toXY = (compass: number) => {
    const radians = ((compass - 90) * Math.PI) / 180;
    return [100 + radius * Math.cos(radians), 100 + radius * Math.sin(radians)];
  };
  const [x0, y0] = toXY(index * 45 - 22.5);
  const [x1, y1] = toXY((index + 1) * 45 - 22.5);

  return `M100,100 L${x0.toFixed(2)},${y0.toFixed(2)} A96,96 0 0 1 ${x1.toFixed(2)},${y1.toFixed(2)} Z`;
}

/** Rotation that parks a given section under the top pointer. */
function restAngle(index: number): number {
  const mid = index * 45 - 22.5;
  return ((-mid % 360) + 360) % 360;
}

function labelPlacement(index: number) {
  const mid = index * 45; // centre of this wedge, in compass degrees
  const flipped = mid > 180;

  return { angle: flipped ? mid - 270 : mid - 90, x: flipped ? 44 : 156 };
}


const DiscountWheel = () => {
  const [record, setRecord] = useState<SpinRecord | null>(() => readRecord());
  const [rotation, setRotation] = useState(() => {
    const stored = readRecord();
    return stored ? restAngle(stored.index) : 0;
  });

  const [spinning, setSpinning] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [sweep, setSweep] = useState(SWEEP_MS);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setNow(Date.now());

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSweep(700);
    }
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  const onCooldown = record !== null && !canSpin(record.at, now);

  useEffect(() => {
    if (!onCooldown) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [onCooldown]);

  const spin = () => {
    if (spinning || onCooldown) return;
    const index = pickSegmentIndex();
    const mid = index * 45 - 22.5;
    const jitter = (Math.random() - 0.5) * 14;
    const desired = (((-mid + jitter) % 360) + 360) % 360;

    const current = ((rotation % 360) + 360) % 360;
    const delta = (((desired - current) % 360) + 360) % 360;

    setSpinning(true);
    setRotation(rotation + 360 * 6 + delta);
    timer.current = window.setTimeout(() => {
      const next: SpinRecord = { at: Date.now(), index };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // A blocked storage just means the next visit starts fresh.
      }
      setRecord(next);
      setNow(Date.now());
      setSpinning(false);
    }, sweep + 120);
  };

  const shown = record ? SEGMENTS[record.index] : null;
  const won = shown?.kind === "prize";
  const msLeft = record ? nextSpinAt(record.at) - now : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-lg p-8 shadow-soft border border-border/30 text-center">

      <span className="inline-block bg-petal text-primary font-body px-3 py-1 rounded-full mb-4 text-sm">
        This Week Only
      </span>
      <h3 className="font-display text-xl text-foreground mb-2">Spin the Discount Wheel</h3>
      <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
        Two 10% off 60-minute codes, two 10% off 75-minute codes, and four blank sections.
        One spin every 12 hours.  Through Sunday, November 8.
      </p>

      <div className="relative mx-auto w-full max-w-[300px] mb-6">
        <svg
          viewBox="0 0 200 200"
          role="img"
          aria-label="Discount wheel with eight sections"
          className="w-full block"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: `transform ${sweep}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          }}>
          {SEGMENTS.map((segment, index) => (
            <path
              key={index}
              d={wedgePath(index)}
              className={segment.kind === "prize" ? "fill-petal" : "fill-cream-dark"}
              stroke="hsl(var(--border))"
              strokeWidth={0.6} />
          ))}
          {SEGMENTS.map((segment, index) => {
            const { angle, x } = labelPlacement(index);
            if (segment.kind === "blank") {
              return (
                <g key={`mark-${index}`} transform={`rotate(${angle} 100 100)`}>
                  <circle cx={x} cy={100} r={2.4} className="fill-border" />
                </g>
              );
            }
            const [line1, line2] = segment.label.split("\n");
            return (
              <g key={`label-${index}`} transform={`rotate(${angle} 100 100)`}>
                <text
                  x={x}
                  y={100}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-primary font-body"
                  fontSize={9}
                  fontWeight={700}
                  letterSpacing={0.3}>
                  <tspan x={x} dy={-5}>{line1}</tspan>
                  <tspan x={x} dy={11}>{line2}</tspan>
                </text>
              </g>
            );
          })}
          <circle cx={100} cy={100} r={97} fill="none" className="stroke-primary" strokeWidth={2} />
          <circle cx={100} cy={100} r={13} className="fill-primary" />
          <circle cx={100} cy={100} r={4} className="fill-primary-foreground" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-6 pointer-events-none">
          <path d="M12 21 L4 3 L20 3 Z" className="fill-primary" stroke="hsl(var(--card))" strokeWidth={1.2} />
        </svg>
      </div>

      <Button onClick={spin} disabled={spinning || onCooldown} className="font-body">
        {spinning ? "Spinning..." : record ? "Spin again" : "Spin the wheel"}
      </Button>

      <div aria-live="polite" className="mt-6 min-h-[3.5rem]">
        {shown && !spinning && (
          <div>
            <p className={`font-display text-lg ${won ? "text-primary" : "text-muted-foreground"}`}>
              {resultMessage(shown)}
            </p>
            {won && (
              <p className="text-muted-foreground font-body text-sm mt-1">
                Use promo code{" "}
                <span className="font-bold text-foreground">{shown.code}</span> when booking online.
              </p>
            )}
          </div>
        )}
        {onCooldown && (
          <p className="text-muted-foreground font-body text-xs mt-2">
            You can spin again in {formatCountdown(msLeft)}.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default DiscountWheel;
