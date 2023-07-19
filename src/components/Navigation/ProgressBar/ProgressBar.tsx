import React from "react";
import ProgressBarCircle from "./ProgressBarCircle";
import ProgressBarStaticCircle from "./ProgressBarStaticCircle";

interface props {
  scrollYPersentage: number;
  hide: boolean;
  white?: boolean;
}

const ProgressBar: React.FC<props> = ({ scrollYPersentage, hide, white }) => {
  return (
    <svg width={25} height={25}>
      <g transform={`rotate(-90 ${"0 0"})`}>
        <ProgressBarCircle
          colour={`${white ? "white" : "black"}`}
          pct={scrollYPersentage}
          hide={hide}
        />
        <ProgressBarStaticCircle colour={`${white ? "white" : "black"}`} />
      </g>
    </svg>
  );
};

export default ProgressBar;
