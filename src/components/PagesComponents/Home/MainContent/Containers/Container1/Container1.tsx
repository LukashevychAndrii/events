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

const Container1: React.FC<props> = ({ eventDATA }) => {
  const { scrollY } = useScroll();
  const y = useSpring(useTransform(scrollY, [0, 2000], [400, -600]), {
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
  let yIMG = useTransform(springY, [0, 1], ["-20%", "20%"]);

  return (
    <motion.div
      ref={refContainer}
      className={styles["content__container--1"]}
      whileHover="visible"
      initial="initial"
      onMouseEnter={handleMouseEnterControls}
      onMouseLeave={handleMouseLeaveControls}
    >
      <div className={styles["content__img__wrapper--1"]}>
        <motion.div
          style={{ y: yIMG, backgroundImage: `url(${eventDATA?.photo})` }}
          className={styles["content__img"]}
        />
      </div>
      <motion.div
        style={{ y }}
        className={styles["content__container--1__right-info"]}
      >
        <motion.h5
          variants={vatiantsMoveTop}
          animate={controls}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
        >
          {eventDATA?.date}
        </motion.h5>

        <AnimatedLink
          variants={vatiantsMoveTop}
          animate={controls}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          viewport={{ once: true }}
          className={`${styles["content__container--1__right-info__title"]} underline`}
          to={`/events/album/${eventDATA?.name}`}
        >
          {eventDATA?.name}
        </AnimatedLink>

        <motion.p
          variants={variantsFadeIn}
          animate={controls}
          className={styles["content__container--1__right-info__description"]}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Reprehenderit el
        </motion.p>
        <motion.span
          variants={vatiantsMoveBot}
          animate={controls}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
        >
          Lorem ipsum dolor sit.
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default Container1;
