import React from "react";
import styles from "../Navigation.module.scss";
import { motion, useAnimationControls } from "framer-motion";
import { NavLink } from "react-router-dom";

interface props {
  white?: boolean;
  showNav: boolean;
}

const Links2: React.FC<props> = ({ showNav, white }) => {
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
      <li className={styles["nav__li"]}>
        <NavLink
          to="/events/recent"
          className={`${
            white ? styles["nav__link__white"] : styles["nav__link"]
          } subtitle`}
        >
          Recent
        </NavLink>
      </li>
      <li className={styles["nav__li"]}>
        <NavLink
          to="/events/chats"
          className={`${
            white ? styles["nav__link__white"] : styles["nav__link"]
          } subtitle`}
        >
          Chats
        </NavLink>
      </li>
    </motion.ul>
  );
};

export default Links2;
