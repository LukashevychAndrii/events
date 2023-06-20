const ProgressBarStaticCircle = ({ colour }: { colour: string }) => {
  const r = 8;
  const circ = 2 * Math.PI * r;

  return (
    <circle
      r={r}
      cx={-20}
      cy={20}
      fill="transparent"
      stroke={colour} // remove colour as 0% sets full circumference
      strokeWidth={".2rem"}
      strokeDasharray={circ}
      strokeDashoffset={0}
      strokeLinecap="round"
    ></circle>
  );
};
export default ProgressBarStaticCircle;
