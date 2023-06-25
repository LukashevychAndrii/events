import React from "react";
import { Variants, motion } from "framer-motion";

const circleVariants: Variants = {
  hidden: { r: 6.5, opacity: 0, transition: { duration: 1 } },
  visible: { r: 10.5, opacity: 1, transition: { duration: 1 } },
  small: { scale: 0.6, opacity: 1 },
};

interface props {
  colour: string;
  pct: number;
  hide: boolean;
}

const ProgressBarCircle: React.FC<props> = ({ colour, pct, hide }) => {
  const r = 10.5;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <motion.circle
      variants={circleVariants}
      initial="visible"
      animate={
        pct > 1 && hide ? "visible" : pct > 1 && !hide ? "small" : "hidden"
      }
      // r={r}
      cx={-25}
      cy={20}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""}
      transition={{ duration: 0.5 }}
      strokeWidth={".2rem"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : undefined}
      strokeLinecap="round"
    ></motion.circle>
  );
};
export default ProgressBarCircle;
