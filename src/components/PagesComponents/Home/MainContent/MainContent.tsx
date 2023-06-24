import React from "react";
import styles from "./MainContent.module.scss";
import {
  useScroll,
  motion,
  useTransform,
  useAnimationControls,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Heading from "../../Layout/Heading/Heading";

import logo from "../../../../img/logo.png";
import { Link } from "react-router-dom";

const MainContent = () => {
  const { scrollY } = useScroll();
  const y = useSpring(useTransform(scrollY, [0, 2000], [400, -600]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  const y2 = useSpring(useTransform(scrollY, [0, 2500], [800, -300]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  const y3 = useSpring(useTransform(scrollY, [0, 3500], [800, -300]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  const y4 = useSpring(useTransform(scrollY, [0, 6000], [1600, -1000]), {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  const AnimatedLink = motion(Link);

  const variantsFadeIn = {
    initial: {
      opacity: 0,
    },
    hover: { opacity: 1, transition: { delay: 0.2, duration: 1 } },
  };
  const vatiantsMoveTop = {
    initial: {
      y: "3.5rem",
      transition: { duration: 0.5 },
    },
    hover: {
      y: 0,
      transition: { duration: 0.5 },
    },
  };
  const vatiantsMoveBot = {
    initial: {
      y: "-3.5rem",
      transition: { duration: 0.5 },
    },
    hover: {
      y: 0,
      transition: { duration: 0.5 },
    },
  };
  const controls = useAnimationControls();
  const controls2 = useAnimationControls();
  const controls3 = useAnimationControls();

  React.useEffect(() => {
    controls.set("initial");
    controls2.set("initial");
    controls3.set("initial");
  }, [controls, controls2, controls3]);

  function handleMouseEnterControls(i: number) {
    if (i === 0) {
      controls.start("hover");
    } else if (i === 1) {
      controls2.start("hover");
    } else if (i === 2) {
      controls3.start("hover");
    }
  }

  function handleMouseLeaveControls(i: number) {
    if (i === 0) {
      controls.start("initial");
    } else if (i === 1) {
      controls2.start("initial");
    } else if (i === 2) {
      controls3.start("initial");
    }
  }

  return (
    <>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className="logo"
        src={logo}
        alt="logo"
      />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className={styles["content__heading"]}
      >
        <Heading />
      </motion.section>
      <section className={styles["content"]}>
        <motion.div
          className={styles["content__container--1"]}
          whileHover="visible"
          initial="initial"
          onMouseEnter={() => handleMouseEnterControls(0)}
          onMouseLeave={() => handleMouseLeaveControls(0)}
        >
          {/* <div className={styles["test"]}></div> */}
          <img src="https://picsum.photos/500/750" alt="" />
          <motion.div
            style={{ y }}
            className={styles["content__container--1__right-info"]}
          >
            <motion.h5
              variants={vatiantsMoveTop}
              animate={controls}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
            >
              Lorem 18/05/2022
            </motion.h5>

            <AnimatedLink
              variants={vatiantsMoveTop}
              animate={controls}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
              className={`${styles["content__container--1__right-info__title"]} underline`}
              to=""
            >
              Lorem, ipsum.
            </AnimatedLink>

            <motion.p
              variants={variantsFadeIn}
              animate={controls}
              className={
                styles["content__container--1__right-info__description"]
              }
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
            >
              qweasd
            </motion.span>
          </motion.div>
        </motion.div>
        <motion.div
          className={styles["content__container--2"]}
          whileHover="visible"
          initial="initial"
          onMouseEnter={() => handleMouseEnterControls(1)}
          onMouseLeave={() => handleMouseLeaveControls(1)}
        >
          <motion.div
            style={{ y: y2 }}
            className={styles["content__container--2__left-info"]}
          >
            <motion.h5
              variants={vatiantsMoveTop}
              animate={controls2}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
            >
              Lorem 18/05/2022
            </motion.h5>

            <AnimatedLink
              variants={vatiantsMoveTop}
              animate={controls2}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
              className={`${styles["content__container--2__left-info__title"]} underline`}
              to=""
            >
              Lorem, ipsum.
            </AnimatedLink>

            <motion.p
              variants={variantsFadeIn}
              animate={controls2}
              className={
                styles["content__container--2__left-info__description"]
              }
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Reprehenderit el
            </motion.p>
            <motion.span
              variants={vatiantsMoveBot}
              animate={controls2}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
            >
              qweasd
            </motion.span>
          </motion.div>
          <img
            style={{ marginLeft: "-20rem" }}
            src="https://picsum.photos/960/640"
            alt=""
          />
        </motion.div>
        <motion.div
          className={styles["content__container--3"]}
          whileHover="visible"
          initial="initial"
          onMouseEnter={() => handleMouseEnterControls(2)}
          onMouseLeave={() => handleMouseLeaveControls(2)}
        >
          <img
            style={{ marginLeft: "-20rem" }}
            src="https://picsum.photos/960/640"
            alt=""
          />
          <motion.div
            style={{ y: y3, x: "-50%" }}
            className={styles["content__container--3__right-info"]}
          >
            <motion.h5
              variants={vatiantsMoveTop}
              animate={controls3}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
            >
              Lorem 18/05/2022
            </motion.h5>

            <AnimatedLink
              variants={vatiantsMoveTop}
              animate={controls3}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
              className={`${styles["content__container--3__right-info__title"]} underline`}
              to=""
            >
              Lorem, ipsum.
            </AnimatedLink>

            <motion.p
              variants={variantsFadeIn}
              animate={controls3}
              className={
                styles["content__container--3__right-info__description"]
              }
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Reprehenderit el
            </motion.p>
            <motion.span
              variants={vatiantsMoveBot}
              animate={controls3}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
            >
              qweasd
            </motion.span>
          </motion.div>
        </motion.div>
        <motion.div
          className={styles["content__container--4"]}
          whileHover="visible"
          initial="initial"
          onMouseEnter={() => handleMouseEnterControls(2)}
          onMouseLeave={() => handleMouseLeaveControls(2)}
        >
          <motion.div
            style={{ y: y4 }}
            className={styles["content__container--4__left-info"]}
          >
            <motion.h5
              variants={vatiantsMoveTop}
              animate={controls3}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
            >
              Lorem 18/05/2022
            </motion.h5>

            <AnimatedLink
              variants={vatiantsMoveTop}
              animate={controls3}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
              className={`${styles["content__container--4__left-info__title"]} underline`}
              to=""
            >
              Lorem, ipsum.
            </AnimatedLink>

            <motion.p
              variants={variantsFadeIn}
              animate={controls3}
              className={
                styles["content__container--4__left-info__description"]
              }
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Reprehenderit el
            </motion.p>
            <motion.span
              variants={vatiantsMoveBot}
              animate={controls3}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
            >
              qweasd
            </motion.span>
          </motion.div>
          <img
            style={{ marginLeft: "-20rem" }}
            src="https://picsum.photos/500/750"
            alt=""
          />
        </motion.div>
      </section>
      <div style={{ minHeight: "100vh" }}></div>
    </>
  );
};

export default MainContent;
