const ProgressBarCircle = ({
  colour,
  pct,
}: {
  colour: string;
  pct: number;
}) => {
  const r = 10.5;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={-25}
      cy={20}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={".2rem"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};
export default ProgressBarCircle;
