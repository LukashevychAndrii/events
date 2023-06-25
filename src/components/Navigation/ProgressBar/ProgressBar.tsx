import React from "react";
import ProgressBarCircle from "./ProgressBarCircle";
import ProgressBarStaticCircle from "./ProgressBarStaticCircle";

interface props {
  scrollYPersentage: number;
  hide: boolean;
}

const ProgressBar: React.FC<props> = ({ scrollYPersentage, hide }) => {
  return (
    <svg width={40} height={40}>
      <g transform={`rotate(-90 ${"0 0"})`}>
        <ProgressBarCircle colour="black" pct={scrollYPersentage} hide={hide} />
        <ProgressBarStaticCircle colour="black" />
      </g>
    </svg>
  );
};

export default ProgressBar;
