import React from "react";
import styles from "../Intro.module.scss";
import { motion, useAnimation } from "framer-motion";

const TypeWriter = () => {
  const controls = useAnimation();

  React.useEffect(() => {
    try {
      const sequence = async () => {
        await controls.start({
          transition: { duration: 3.5 },
          opacity: 0,
          display: "none",
        });
        await controls.start({
          transition: { duration: 1 },

          display: "block",
          opacity: 1,
        });
        await controls.start({
          transition: { duration: 0.5, delay: 3.5 },
          opacity: 0,
          filter: "blur(50px)",
        });
      };

      sequence();
    } catch (error) {
      controls.stop();
    }

    return () => {
      controls.stop();
    };
  }, [controls]);

  return (
    <motion.h1 style={{ width: "100vw", height: "100vh" }}>
      <motion.span
        animate={controls}
        className={`${styles["intro__typewriter"]}`}
      >
        Events
      </motion.span>
    </motion.h1>
  );
};

export default TypeWriter;
