import React from "react";
import styles from "./Heading.module.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Textfit } from "react-textfit";

const Heading = () => {
  const { scrollY } = useScroll();
  const yHeading1 = useSpring(useTransform(scrollY, [0, 2000], [0, -750]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  const yHeading2 = useSpring(useTransform(scrollY, [0, 2000], [0, -400]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });

  return (
    <div className={styles["heading"]}>
      <motion.h1
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 2 }}
        className={`${styles["heading--1"]} heading-1`}
        style={{ y: yHeading1 }}
      >
        <Textfit mode="single" min={20} max={200}>
          LoremLorem &
        </Textfit>
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 2 }}
        className={`${styles["heading--2"]} heading-2`}
        style={{ y: yHeading2 }}
      >
        <Textfit mode="single" min={20} max={200}>
          LoremLorem
        </Textfit>
      </motion.h2>
    </div>
  );
};

export default Heading;
