import React from "react";
import styles from "./Intro.module.scss";
import { motion, useAnimation } from "framer-motion";

import logo from "../../../../img/logo.png";
import TypeWriter from "./components/TypeWriter";
import LeftContent from "./components/left/LeftContent";
import RightContent from "./components/right/RightContent";

const Intro = () => {
  const controls = useAnimation();
  React.useEffect(() => {
    try {
      const sequence = async () => {
        await controls.start({
          transition: { delay: 0.75, duration: 1.5 },
          height: "100vh",
        });
        await controls.start({
          width: "100%",
          transition: { duration: 1.5, ease: [0.85, -0.03, 0, 1.09] },
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
    <div style={{ minHeight: "100vh" }}>
      <motion.div
        className={styles["intro"]}
        initial={{ height: 0, width: ".4rem" }}
        animate={controls}
      >
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className={styles["intro__logo"]}
          src={logo}
          alt="logo"
        />
        <TypeWriter />
        <LeftContent />
        <RightContent />
      </motion.div>
    </div>
  );
};

export default Intro;
