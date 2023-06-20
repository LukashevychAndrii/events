import React from "react";
import ProgressBarCircle from "./ProgressBarCircle";
import useScrollPercentage from "../../../hooks/useScrollPercentage";
import ProgressBarStaticCircle from "./ProgressBarStaticCircle";

const ProgressBar = () => {
  const completion = useScrollPercentage();
  return (
    <svg width={40} height={40}>
      <g transform={`rotate(-90 ${"0 0"})`}>
        <ProgressBarCircle colour="black" pct={completion} />
        <ProgressBarStaticCircle colour="black" />
      </g>
    </svg>
  );
};

export default ProgressBar;
