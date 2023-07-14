import React from "react";
import styles from "../../MainContent.module.scss";

import {
  motion,
  useAnimationControls,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  variantsFadeIn,
  vatiantsMoveBot,
  vatiantsMoveTop,
} from "../../MainContent";
import { eventDATAI } from "../../../../../../store/slices/recentEvents-slice";

interface props {
  eventDATA: eventDATAI;
}

const Container4: React.FC<props> = ({ eventDATA }) => {
  const { scrollY } = useScroll();
  const y = useSpring(useTransform(scrollY, [0, 6000], [1350, -1000]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });

  const AnimatedLink = motion(Link);

  const controls = useAnimationControls();

  React.useEffect(() => {
    controls.set("initial");
  }, [controls]);

  function handleMouseEnterControls() {
    controls.start("hover");
  }

  function handleMouseLeaveControls() {
    controls.start("initial");
  }

  const refContainer = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: refContainer,
    offset: ["start end", "end start"],
  });
  const springY = useSpring(scrollYProgress, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  let yIMG = useTransform(springY, [0, 1], ["-10%", "10%"]);
  return (
    <motion.div
      className={styles["content__container--4"]}
      whileHover="visible"
      initial="initial"
      onMouseEnter={handleMouseEnterControls}
      onMouseLeave={handleMouseLeaveControls}
    >
      <motion.div
        ref={refContainer}
        style={{ y: y }}
        className={styles["content__container--4__left-info"]}
      >
        <motion.h5
          variants={vatiantsMoveTop}
          animate={controls}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          viewport={{ once: true }}
        >
          {eventDATA?.date}
        </motion.h5>

        <AnimatedLink
          variants={vatiantsMoveTop}
          animate={controls}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className={`${styles["content__container--4__left-info__title"]} underline`}
          viewport={{ once: true }}
          to={`/album/${eventDATA?.name}`}
        >
          {eventDATA?.name}
        </AnimatedLink>

        <motion.p
          variants={variantsFadeIn}
          animate={controls}
          className={styles["content__container--4__left-info__description"]}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Reprehenderit el
        </motion.p>
        <motion.span
          variants={vatiantsMoveBot}
          animate={controls}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          viewport={{ once: true }}
        >
          Lorem, ipsum dolor.
        </motion.span>
      </motion.div>
      <div className={styles["content__img__wrapper--4"]}>
        <motion.div
          className={styles["content__img"]}
          style={{ y: yIMG, backgroundImage: `url(${eventDATA?.photo})` }}
        />
      </div>
    </motion.div>
  );
};

export default Container4;
