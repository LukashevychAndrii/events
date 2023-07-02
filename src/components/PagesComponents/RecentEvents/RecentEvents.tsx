import React from "react";
import styles from "./RecentEvents.module.scss";

import {
  AnimatePresence,
  Variants,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";

const variantsIMG: Variants = {
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

const variantsIMG_TEXT1: Variants = {
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

const variantsIMG_TEXT2: Variants = {
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

interface props {
  getHoveredImage: (img: string) => void;
}

const Container1: React.FC<props> = ({ getHoveredImage }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const temporaryY = useSpring(scrollYProgress, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  let y = useTransform(temporaryY, [0, 1], ["-40%", "-60%"]);

  const [isHovered, setIsHovered] = React.useState(false);
  const [isHovered2, setIsHovered2] = React.useState(false);

  const AnimatedLink = motion(Link);

  return (
    <div ref={ref} className={styles["recent__gallery__container--1"]}>
      <motion.div
        onPointerEnter={() => {
          setIsHovered(true);
          getHoveredImage("https://picsum.photos/700/700");
        }}
        className={styles["recent__gallery__img__wrapper"]}
      >
        <motion.div
          style={{
            y,
            backgroundImage: `url(https://picsum.photos/700/700)`,
          }}
          className={styles["recent__gallery__img"]}
        ></motion.div>
        <AnimatePresence>
          {isHovered && (
            <AnimatedLink
              to={`/album/testname`}
              variants={variantsIMG}
              initial="initial"
              animate="animated"
              exit="exit"
              className={styles["recent__gallery__img__text"]}
              onPointerLeave={() => {
                getHoveredImage("");
                setIsHovered(false);
              }}
            >
              <motion.h3
                variants={variantsIMG_TEXT1}
                initial="initial"
                animate="visible"
                exit="initial"
                className="subtitle"
              >
                Lorem
              </motion.h3>
              <motion.h2
                variants={variantsIMG_TEXT2}
                initial="initial"
                animate="visible"
                exit="initial"
                className="underline"
              >
                Lorem, ipsum.
              </motion.h2>
            </AnimatedLink>
          )}
        </AnimatePresence>
      </motion.div>

      <span></span>
      <motion.div
        onPointerEnter={() => {
          setIsHovered2(true);
          getHoveredImage("https://picsum.photos/700/700");
        }}
        className={styles["recent__gallery__img__wrapper"]}
      >
        <motion.div
          style={{
            y,
            backgroundImage: `url(https://picsum.photos/700/700)`,
          }}
          className={styles["recent__gallery__img"]}
        ></motion.div>
        <AnimatePresence>
          {isHovered2 && (
            <AnimatedLink
              to={`/album/testname`}
              variants={variantsIMG}
              initial="initial"
              animate="animated"
              exit="exit"
              className={styles["recent__gallery__img__text"]}
              onPointerLeave={() => {
                getHoveredImage("");
                setIsHovered2(false);
              }}
            >
              <motion.h3
                variants={variantsIMG_TEXT1}
                initial="initial"
                animate="visible"
                exit="initial"
                className="subtitle"
              >
                Lorem
              </motion.h3>
              <motion.h2
                variants={variantsIMG_TEXT2}
                initial="initial"
                animate="visible"
                exit="initial"
                className="underline"
              >
                Lorem, ipsum.
              </motion.h2>
            </AnimatedLink>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
const Container2: React.FC<props> = ({ getHoveredImage }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const temporaryY = useSpring(scrollYProgress, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  let y = useTransform(temporaryY, [0, 1], ["-40%", "-60%"]);
  const [isHovered, setIsHovered] = React.useState(false);

  const AnimatedLink = motion(Link);

  return (
    <div ref={ref} className={styles["recent__gallery__container--2"]}>
      <span></span>
      <div className={styles["recent__gallery__img__wrapper"]}>
        <motion.div
          onPointerEnter={() => {
            setIsHovered(true);
            getHoveredImage("https://picsum.photos/700/700");
          }}
          className={styles["recent__gallery__img__wrapper"]}
        >
          <motion.div
            style={{
              y,
              backgroundImage: `url(https://picsum.photos/700/700)`,
            }}
            className={styles["recent__gallery__img"]}
          ></motion.div>
          <AnimatePresence>
            {isHovered && (
              <AnimatedLink
                to={`/album/testtext2`}
                variants={variantsIMG}
                initial="initial"
                animate="animated"
                exit="exit"
                className={styles["recent__gallery__img__text"]}
                onPointerLeave={() => {
                  getHoveredImage("");
                  setIsHovered(false);
                }}
              >
                <motion.h3
                  variants={variantsIMG_TEXT1}
                  initial="initial"
                  animate="visible"
                  exit="initial"
                  className="subtitle"
                >
                  Lorem
                </motion.h3>
                <motion.h2
                  variants={variantsIMG_TEXT2}
                  initial="initial"
                  animate="visible"
                  exit="initial"
                  className="underline"
                >
                  Lorem, ipsum.
                </motion.h2>
              </AnimatedLink>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <span></span>
    </div>
  );
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
  const y2 = useSpring(useTransform(scrollY, [0, 2000], [0, -400]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });

  return (
    <section ref={ref} className={styles["recent"]}>
      <div className={styles["recent__heading__wrapper"]}>
        <div className={styles["recent__heading"]}>
          <motion.h2
            style={{ y: y1 }}
            className={`${styles["recent__heading--1"]} heading-1`}
          >
            Recent
          </motion.h2>
          <motion.h2
            style={{ y: y2 }}
            className={`${styles["recent__heading--2"]} heading-2`}
          >
            Events
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
        <Container1 getHoveredImage={getHoveredImage} />
        <Container2 getHoveredImage={getHoveredImage} />
        <Container1 getHoveredImage={getHoveredImage} />
        <Container2 getHoveredImage={getHoveredImage} />
        <Container1 getHoveredImage={getHoveredImage} />
        <Container2 getHoveredImage={getHoveredImage} />
        <Container1 getHoveredImage={getHoveredImage} />
        <Container2 getHoveredImage={getHoveredImage} />
        <Container1 getHoveredImage={getHoveredImage} />
        <Container2 getHoveredImage={getHoveredImage} />
      </div>
    </section>
  );
};

export default RecentEvents;
