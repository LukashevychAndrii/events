import React from "react";
import styles from "../../MainContent.module.scss";

import {
  motion,
  useAnimationControls,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  variantsFadeIn,
  vatiantsMoveBot,
  vatiantsMoveTop,
} from "../../MainContent";
import { eventDATAI } from "../../../../../../store/slices/recentEvents-slice";

import { Textfit } from "react-textfit";
import useLess768 from "../../../../../../hooks/useLess768";

interface props {
  eventDATA: eventDATAI;
}

const Container4: React.FC<props> = ({ eventDATA }) => {
  const controls = useAnimationControls();

  const less768 = useLess768();

  React.useEffect(() => {
    if (less768) {
      controls.set("hover");
    } else {
      controls.set("initial");
    }
  }, [controls, less768]);

  function handleMouseEnterControls() {
    if (!less768) {
      controls.start("hover");
    }
  }

  function handleMouseLeaveControls() {
    if (!less768) {
      controls.start("initial");
    }
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

  const { scrollYProgress: scrollYProgressTEXT } = useScroll({
    target: refContainer,
    offset: ["start end", "end start"],
  });
  const refIMG = React.useRef<HTMLDivElement>(null);

  const refTEXT = React.useRef<HTMLDivElement>(null);

  const [imgHeight, setImgHeight] = React.useState(0);
  const [textHeight, setTextHeight] = React.useState(0);

  React.useEffect(() => {
    if (refIMG.current?.clientHeight && refTEXT.current?.clientHeight) {
      setImgHeight(refIMG.current.clientHeight);
      setTextHeight(refTEXT.current.clientHeight);
    }
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      if (refIMG.current?.clientHeight && refTEXT.current?.clientHeight) {
        setImgHeight(refIMG.current?.clientHeight);
        setTextHeight(refTEXT.current?.clientHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const y = useSpring(
    useTransform(
      scrollYProgressTEXT,
      [0, 1],
      [imgHeight / 2 + textHeight / 2, -imgHeight / 2 - textHeight / 2]
    ),
    {
      damping: 15,
      mass: 0.27,
      stiffness: 55,
    }
  );
  const navigate = useNavigate();

  return (
    <motion.div
      ref={refContainer}
      onClick={() => {
        navigate(`/events/album/${eventDATA?.name}`);
      }}
      className={styles["content__container--4"]}
      whileHover="visible"
      initial="initial"
      onMouseEnter={handleMouseEnterControls}
      onMouseLeave={handleMouseLeaveControls}
    >
      <motion.div
        ref={refTEXT}
        style={{ y: y }}
        className={`${styles["content__container--4__left-info"]} ${styles["content__container--4__left-info--2"]}`}
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

        <motion.div
          variants={vatiantsMoveTop}
          animate={controls}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className={`${styles["content__container--4__left-info__title"]} underline`}
          viewport={{ once: true }}
        >
          <Textfit mode="single" max={75}>
            {eventDATA?.name}
          </Textfit>
        </motion.div>

        <motion.p
          variants={variantsFadeIn}
          animate={controls}
          className={styles["content__container--4__left-info__description"]}
        >
          <Textfit mode="single">
            Lorem ipsum dolor sit amet consectetur, adipisicing
          </Textfit>
          <span>
            <Textfit mode="single">elit. Reprehenderit el</Textfit>
          </span>
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
      <div ref={refIMG} className={styles["content__img__wrapper--4"]}>
        <motion.div
          className={styles["content__img"]}
          style={{ y: yIMG, backgroundImage: `url(${eventDATA?.photo})` }}
        />
      </div>
    </motion.div>
  );
};

export default Container4;
