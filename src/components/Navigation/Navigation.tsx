import React from "react";
import styles from "./Navigation.module.scss";
import ProgressBar from "./ProgressBar/ProgressBar";
import { NavLink } from "react-router-dom";
import { useAnimationControls, useScroll, useSpring } from "framer-motion";
import { motion } from "framer-motion";
import User from "./User/User";

const Navigation = () => {
  const navControls = useAnimationControls();
  const [showNav, setShowNav] = React.useState(true);

  React.useEffect(() => {
    if (showNav) {
      navControls.start({
        opacity: 1,
        transition: { duration: 0.5 },
      });
    } else {
      navControls.start({
        opacity: 0,
        transition: { duration: 0.5 },
      });
    }
  }, [showNav, navControls]);

  const [hover, setHover] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const scrollY = useSpring(scrollYProgress, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  React.useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);
  const [scrollYPersentage, setScrollYPersentage] = React.useState(0);

  React.useLayoutEffect(() => {
    const scrollChangeHandler = (y: number) => {
      const scrollYPersentage = +y.toString().split(".")[1]?.slice(0, 2);
      if (scrollYPersentage) {
        setScrollYPersentage(scrollYPersentage);
      }
    };

    scrollY.on("change", scrollChangeHandler);

    return () => {
      scrollY.destroy();
    };
  }, [scrollY]);

  React.useEffect(() => {
    if (scrollYPersentage > 1 && !hover) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [scrollYPersentage, hover]);

  const handleScrollEnd = () => {
    const container = document.body;
    const isScrolledToEnd =
      container.scrollHeight - container.scrollTop === container.clientHeight;
    if (isScrolledToEnd) {
      setHover(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("scroll", handleScrollEnd);
    return () => {
      window.removeEventListener("scroll", handleScrollEnd);
    };
  }, []);

  return (
    <motion.nav className={styles["nav"]}>
      <User />
      <motion.ul animate={navControls}>
        <li>
          <NavLink className={`${styles["nav__link"]} subtitle`} to="calendar">
            Calendar
          </NavLink>
        </li>
        <li>
          <NavLink className={`${styles["nav__link"]} subtitle`} to="about">
            About
          </NavLink>
        </li>
      </motion.ul>
      <div
        onMouseEnter={() => {
          setHover(true);
        }}
        style={{ cursor: "pointer" }}
      >
        <ProgressBar scrollYPersentage={scrollYPersentage} hide={!showNav} />
      </div>
      <motion.ul animate={navControls}>
        <li>
          <NavLink to="/recent" className={`${styles["nav__link"]} subtitle`}>
            Recent
          </NavLink>
        </li>
        <li>
          <NavLink to="/chats" className={`${styles["nav__link"]} subtitle`}>
            Chats
          </NavLink>
        </li>
      </motion.ul>
    </motion.nav>
  );
};

export default Navigation;
