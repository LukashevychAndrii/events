import React from "react";
import styles from "../Navigation.module.scss";
import { motion, useAnimationControls } from "framer-motion";
import { NavLink } from "react-router-dom";

interface props {
  white?: boolean;
  showNav: boolean;
}

const Links1: React.FC<props> = ({ white, showNav }) => {
  const navControls = useAnimationControls();
  React.useEffect(() => {
    if (showNav) {
      navControls.start({
        opacity: 1,
        transition: { duration: 0.5 },
        pointerEvents: "all",
      });
    } else {
      navControls.start({
        opacity: 0,
        transition: { duration: 0.5 },
        pointerEvents: "none",
      });
    }
  }, [showNav, navControls]);

  return (
    <motion.ul animate={navControls}>
      <li>
        <NavLink
          className={`${
            white ? styles["nav__link__white"] : styles["nav__link"]
          } subtitle`}
          to="/events/calendar"
        >
          Calendar
        </NavLink>
      </li>
      <li>
        <NavLink
          className={`${
            white ? styles["nav__link__white"] : styles["nav__link"]
          } subtitle`}
          to="/events/about"
        >
          About
        </NavLink>
      </li>
    </motion.ul>
  );
};

export default Links1;
