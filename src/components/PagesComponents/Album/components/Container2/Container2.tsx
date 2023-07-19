import React from "react";
import styles from "../../Album.module.scss";

import {
  useScroll,
  useSpring,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
interface props {
  photo: string;
}
const Container2: React.FC<props> = ({ photo }) => {
  const refContainer = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({});
  const springY = useSpring(scrollYProgress, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  let yIMG = useTransform(springY, [0, 1], ["0%", "-20%"]);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Page scroll: ", latest);
  });
  return (
    <div
      ref={refContainer}
      className={`${styles["album__content__container"]} ${styles["album__content__container--2"]}`}
    >
      <motion.div className={styles["album__content__img__wrapper--2"]}>
        <motion.img
          style={{ x: yIMG }}
          className={styles["album__content__img--2"]}
          src={photo}
          alt="event"
        />
      </motion.div>
    </div>
  );
};

export default Container2;
