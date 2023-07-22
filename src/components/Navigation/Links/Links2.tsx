import React from "react";
import styles from "../Navigation.module.scss";
import { motion, useAnimationControls } from "framer-motion";
import { NavLink } from "react-router-dom";
import RenderLink2Text from "./RenderLink2Text";

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
          to="/events/recent"
          className={`${
            white ? styles["nav__link__white"] : styles["nav__link"]
          } subtitle`}
        >
          <RenderLink2Text hover={hover1} text="Recent" />
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
          to="/events/chats"
          className={`${
            white ? styles["nav__link__white"] : styles["nav__link"]
          } subtitle`}
        >
          <RenderLink2Text hover={hover2} text="Chats" />
        </NavLink>
      </motion.li>
    </motion.ul>
  );
};

export default Links2;
