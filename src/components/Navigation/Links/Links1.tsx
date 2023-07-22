import React from "react";
import styles from "../Navigation.module.scss";
import { motion, useAnimationControls } from "framer-motion";
import { NavLink } from "react-router-dom";
import RenderLink1Text from "./RenderLink1Text";

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

  const [hover1, setHover1] = React.useState(false);

  const [hover2, setHover2] = React.useState(false);

  return (
    <motion.ul animate={navControls}>
      <motion.li
        onHoverStart={() => {
          setHover1(true);
        }}
        onHoverEnd={() => setHover1(false)}
        className={styles["nav__li"]}
      >
        <NavLink
          className={`${
            white ? styles["nav__link__white"] : styles["nav__link"]
          } subtitle`}
          to="/events/calendar"
        >
          <RenderLink1Text hover={hover1} text="Calendar" />
        </NavLink>
      </motion.li>
      <motion.li
        onHoverStart={() => {
          setHover2(true);
        }}
        onHoverEnd={() => setHover2(false)}
        className={styles["nav__li"]}
      >
        <NavLink
          className={`${
            white ? styles["nav__link__white"] : styles["nav__link"]
          } subtitle`}
          to="/events/about"
        >
          <RenderLink1Text hover={hover2} text="About" />
        </NavLink>
      </motion.li>
    </motion.ul>
  );
};

export default Links1;
