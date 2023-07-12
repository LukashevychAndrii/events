import React from "react";
import styles from "../../Album.module.scss";

import { useScroll, useSpring, useTransform, motion } from "framer-motion";

interface props {
  photo: string;
}

const Container1: React.FC<props> = ({ photo }) => {
  const refContainer1 = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const springY = useSpring(scrollYProgress, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  let yIMG = useTransform(springY, [0, 1], ["0%", "-20%"]);

  return (
    <div ref={refContainer1} className={styles["album__content__container"]}>
      <motion.div className={styles["album__content__img__wrapper"]}>
        <motion.img
          style={{ x: yIMG }}
          className={styles["album__content__img"]}
          src={photo}
          alt="event"
        />
      </motion.div>
    </div>
  );
};
export default Container1;
