import React from "react";

import { motion, useAnimationControls } from "framer-motion";

interface props {
  text: string;
  hover: boolean;
}

const RenderLink2Text: React.FC<props> = ({ text, hover }) => {
  const controls = useAnimationControls();

  const handleHover = async () => {
    await controls.start({ x: "100%" });
    await controls.start({ x: "-100%", transition: { duration: 0 } });
    await controls.start({ x: 0 });
  };
  const handleEnd = async () => {
    controls.stop();
    await controls.start({ x: 0 });
  };
  React.useEffect(() => {
    if (hover) {
      handleHover();
    } else {
      handleEnd();
    }
  }, [hover]);

  return (
    <>
      {text.split("").map((el, index) => (
        <motion.span
          key={index}
          style={{ display: "inline-block" }}
          transition={{ duration: 0.2, delay: index * 0.035 }}
          animate={controls}
        >
          {el}
        </motion.span>
      ))}
    </>
  );
};

export default RenderLink2Text;
