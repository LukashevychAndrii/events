import React from "react";
import styles from "./Navigation.module.scss";
import ProgressBar from "./ProgressBar/ProgressBar";
import { NavLink } from "react-router-dom";
import { useAnimationControls } from "framer-motion";
import useScrollPercentage from "../../hooks/useScrollPercentage";
import { motion } from "framer-motion";

const Navigation = () => {
  const navControls = useAnimationControls();
  const completion = useScrollPercentage();
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

  React.useEffect(() => {
    if (completion > 1) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [completion]);

  return (
    <motion.nav className={styles["nav"]}>
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
        onPointerEnter={() => {
          setShowNav(true);
        }}
        style={{ cursor: "pointer" }}
      >
        <ProgressBar />
      </div>
      <motion.ul animate={navControls}>
        <li>
          <NavLink to="" className={`${styles["nav__link"]} subtitle`}>
            lorem
          </NavLink>
        </li>
        <li>
          <NavLink to="" className={`${styles["nav__link"]} subtitle`}>
            lorem
          </NavLink>
        </li>
      </motion.ul>
    </motion.nav>
  );
};

export default Navigation;
