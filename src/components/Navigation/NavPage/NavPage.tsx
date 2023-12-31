import React from "react";
import styles from "./NavPage.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Textfit } from "react-textfit";
import { AnimatePresence, Variants, motion } from "framer-motion";

interface props {
  setShowNavPage: React.Dispatch<React.SetStateAction<boolean>>;
  showNavPage: boolean;
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const variantsH: Variants = {
  hidden: {
    y: 25,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const NavPage: React.FC<props> = ({ showNavPage, setShowNavPage }) => {
  const AnimatedLink = motion(Link);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {showNavPage && (
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={styles["nav-page__wrapper"]}
        >
          <div className={styles["nav-page"]}>
            <AnimatedLink
              onClick={() => {
                setShowNavPage(false);
              }}
              variants={variantsH}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.65, delay: 0.25 }}
              className={`${styles["nav-page__heading"]} ${styles["nav-page__heading--1"]} heading-1`}
              to={"/events/calendar"}
            >
              <Textfit mode="singe">Calendar</Textfit>
            </AnimatedLink>
            <AnimatedLink
              onClick={() => {
                setShowNavPage(false);
              }}
              variants={variantsH}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.65, delay: 0.35 }}
              className={`${styles["nav-page__heading"]} ${styles["nav-page__heading--2"]} heading-2`}
              to={"/events/about"}
            >
              <Textfit mode="singe">About</Textfit>
            </AnimatedLink>
            <AnimatedLink
              onClick={() => {
                setShowNavPage(false);
              }}
              variants={variantsH}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.65, delay: 0.45 }}
              className={`${styles["nav-page__heading"]} ${styles["nav-page__heading--3"]} heading-1`}
              to={"/events/recent"}
            >
              <Textfit mode="singe">Recent</Textfit>
            </AnimatedLink>
            <AnimatedLink
              onClick={() => {
                setShowNavPage(false);
              }}
              variants={variantsH}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.65, delay: 0.55 }}
              className={`${styles["nav-page__heading"]} ${styles["nav-page__heading--4"]} heading-2`}
              to={"/events/chats"}
            >
              <Textfit mode="singe">Chats</Textfit>
            </AnimatedLink>
          </div>
          <span
            onClick={() => {
              setShowNavPage(false);
              if (pathname === "/events/") navigate("/events/main");
            }}
            className={styles["nav-page__btn-close"]}
          >
            &#10005;
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavPage;
