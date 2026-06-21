import { useEffect, useState } from "react";

interface SunRayClockProps {
  size?: number;
  className?: string;
}

const SunRayClock = ({ size = 200, className = "" }: SunRayClockProps) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = hours * 30 + minutes * 0.5;

  // 12 wavy sun rays around the dial
  const rays = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 360) / 12;
    return (
      <path
        key={i}
        d="M 100 38 Q 104 28 100 18 Q 96 8 100 -2"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinecap="round"
        transform={`rotate(${angle} 100 100)`}
        opacity="0.85"
      />
    );
  });

  // Hour tick marks
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 360) / 12;
    return (
      <line
        key={i}
        x1="100"
        y1="52"
        x2="100"
        y2={i % 3 === 0 ? 60 : 57}
        stroke="hsl(var(--foreground))"
        strokeWidth={i % 3 === 0 ? 2 : 1}
        strokeLinecap="round"
        transform={`rotate(${angle} 100 100)`}
        opacity="0.7"
      />
    );
  });

  return (
    <svg
      viewBox="-10 -10 220 220"
      width={size}
      height={size}
      className={className}
      aria-label={`Analog clock showing ${now.toLocaleTimeString()}`}
      role="img"
    >
      {/* Sun rays */}
      <g>{rays}</g>

      {/* Clock face */}
      <circle cx="100" cy="100" r="50" fill="hsl(var(--cream))" stroke="hsl(var(--primary))" strokeWidth="2.5" />

      {/* Ticks */}
      {ticks}

      {/* Hour hand */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="70"
        stroke="hsl(var(--foreground))"
        strokeWidth="3.5"
        strokeLinecap="round"
        transform={`rotate(${hourAngle} 100 100)`}
      />

      {/* Minute hand */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="60"
        stroke="hsl(var(--foreground))"
        strokeWidth="2.5"
        strokeLinecap="round"
        transform={`rotate(${minuteAngle} 100 100)`}
      />

      {/* Second hand */}
      <line
        x1="100"
        y1="105"
        x2="100"
        y2="58"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        strokeLinecap="round"
        transform={`rotate(${secondAngle} 100 100)`}
      />

      {/* Center cap */}
      <circle cx="100" cy="100" r="3.5" fill="hsl(var(--primary))" />
    </svg>
  );
};

export default SunRayClock;
