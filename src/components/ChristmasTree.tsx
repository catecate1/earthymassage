const ChristmasTree = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Christmas tree">
    <polygon points="24,3 26.5,8 32,8.5 28,12 29,17 24,14.5 19,17 20,12 16,8.5 21.5,8" fill="hsl(var(--bulb-gold))" />
    <polygon points="24,10 34,22 29,22 37,32 31,32 40,42 8,42 17,32 11,32 19,22 14,22" fill="hsl(var(--pine))" />
    <rect x="21" y="42" width="6" height="5" rx="1" fill="hsl(var(--earth))" />
    <circle cx="20" cy="26" r="1.8" fill="hsl(var(--bulb-red))" />
    <circle cx="29" cy="29" r="1.8" fill="hsl(var(--bulb-gold))" />
    <circle cx="16" cy="37" r="1.8" fill="hsl(var(--bulb-blue))" />
    <circle cx="26" cy="36" r="1.8" fill="hsl(var(--bulb-red))" />
    <circle cx="33" cy="39" r="1.8" fill="hsl(var(--bulb-gold))" />
  </svg>
);
export default ChristmasTree;
