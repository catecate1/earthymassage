const colors = ["--bulb-red", "--bulb-green", "--bulb-gold", "--bulb-blue"];
const COUNT = 28;

const StringLights = () => (
  <div className="string-lights" aria-hidden="true">
    <div className="bulb-row">
      {Array.from({ length: COUNT }, (_, i) => (
        <span key={i} className="bulb" style={{ ["--bulb" as string]: `var(${colors[i % 4]})`, animationDelay: `${(i % 4) * 0.6}s` }} />
      ))}
    </div>
  </div>
);
export default StringLights;
