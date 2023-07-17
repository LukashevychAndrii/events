import React from "react";
import styles from "./RecentEvents.module.scss";

import Container1 from "./components/Container1/Container1";
import Container2 from "./components/Container2/Container2";

import { Textfit } from "react-textfit";

import {
  AnimatePresence,
  Variants,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../utils/redux";
import { recentEventsFetch } from "../../../store/slices/recentEvents-slice";

export const variantsIMG: Variants = {
  initial: {
    opacity: 0,
    transition: { duration: 1 },
  },
  animated: {
    opacity: 1,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 1 },
  },
};

export const variantsIMG_TEXT1: Variants = {
  initial: {
    y: 30,
    opacity: 0,
    transition: { duration: 0, delay: 0 },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35, delay: 0.3 },
  },
};

export const variantsIMG_TEXT2: Variants = {
  initial: {
    y: 30,
    opacity: 0,
    transition: { duration: 0, delay: 0 },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35, delay: 0.4 },
  },
};

const variantsBG: Variants = {
  initial: {
    opacity: 0,
    transition: { duration: 1 },
    scale: 1,
    filter: "blur(20px)",
  },
  animated: {
    opacity: 1,
    transition: { duration: 1 },
    scale: 1.1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    transition: { duration: 1 },
    scale: 1,
    filter: "blur(20px)",
  },
};

const RecentEvents = () => {
  const [hoveredImage, setHoveredImage] = React.useState<string>();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(recentEventsFetch());
  }, [dispatch]);

  const eventsDATA = useAppSelector((state) => state.recentEvents.eventsDATA);

  const getHoveredImage = (img: string): void => {
    setHoveredImage(img);
  };
  const ref = React.useRef<HTMLElement>(null);
  const { scrollY } = useScroll({
    target: ref,
  });
  const springY = useSpring(scrollY, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });

  const y1 = useSpring(useTransform(scrollY, [0, 2000], [0, -750]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  const y2 = useSpring(useTransform(scrollY, [0, 2000], [0, -500]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });

  const renderContainers = () => {
    const content: JSX.Element[] = [];
    for (let i = 0; i < 8; i++) {
      content.push(
        <Container1
          key={i}
          getHoveredImage={getHoveredImage}
          event1DATA={eventsDATA[i]}
          event2DATA={eventsDATA[i + 1]}
        />
      );
      if (i >= 6) {
        break;
      }
      content.push(
        <Container2
          key={i + 1}
          getHoveredImage={getHoveredImage}
          event1DATA={eventsDATA[i + 2]}
        />
      );
      i++;
      i++;
    }
    return content;
  };

  return (
    <section ref={ref} className={styles["recent"]}>
      <div className={styles["recent__heading__wrapper"]}>
        <div className={styles["recent__heading"]}>
          <motion.h2
            style={{ y: y1 }}
            className={`${styles["recent__heading--1"]} heading-1`}
          >
            <Textfit mode="single" min={1} max={200}>
              Recent
            </Textfit>
          </motion.h2>
          <motion.h2
            style={{ y: y2 }}
            className={`${styles["recent__heading--2"]} heading-2`}
          >
            <Textfit mode="single" min={1} max={200}>
              Events
            </Textfit>
          </motion.h2>
        </div>
      </div>
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            style={{
              y: springY,
              backgroundImage: hoveredImage ? `url(${hoveredImage})` : "",
            }}
            className={styles["recent__gallery__bg"]}
            variants={variantsBG}
            initial="initial"
            animate="animated"
            exit="exit"
          ></motion.div>
        )}
      </AnimatePresence>
      <div className={styles["recent__gallery"]}>
        {eventsDATA.length > 0 && renderContainers()}
      </div>
    </section>
  );
};

export default RecentEvents;
