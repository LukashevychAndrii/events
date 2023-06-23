const ProgressBarStaticCircle = ({ colour }: { colour: string }) => {
  const r = 6.5;
  const circ = 2 * Math.PI * r;

  return (
    <circle
      r={r}
      cx={-25}
      cy={20}
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
