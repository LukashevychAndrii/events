const ProgressBarStaticCircle = ({ colour }: { colour: string }) => {
  const r = 6.5;
  const circ = 2 * Math.PI * r;

  return (
    <circle
      r={r}
      cx={-12.5}
      cy={12.5}
      fill="transparent"
      stroke={colour} // remove colour as 0% sets full circumference
      strokeWidth={".1rem"}
      strokeDasharray={circ}
      strokeDashoffset={0}
      strokeLinecap="round"
    ></circle>
  );
};
export default ProgressBarStaticCircle;
