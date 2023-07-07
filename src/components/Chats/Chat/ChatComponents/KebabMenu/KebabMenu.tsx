import React from "react";
import styles from "../../Chat.module.scss";
import BtnLeave from "./components/BtnLeave";
import BtnClearChat from "./components/BtnClearChat";
import useClickOutside from "../../../../../hooks/useClickOutside";
import { AnimatePresence, Variants, motion } from "framer-motion";

const variantsShowMenu: Variants = {
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  hidden: {
    opacity: 0,
    x: 30,
    y: 30,
    pointerEvents: "none",
  },
};

const KebabMenu = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const outside = useClickOutside({ ref });
  React.useEffect(() => {
    if (outside) {
      setShowMenu(false);
    }
  }, [outside]);
  return (
    <div
      ref={ref}
      onClick={() => setShowMenu(!showMenu)}
      className={`${styles["chat__kebab-menu__wrapper"]} ${
        showMenu && styles["chat__kebab-menu__wrapper--active"]
      }`}
    >
      <div className={styles["chat__kebab-menu"]}></div>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            variants={variantsShowMenu}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={styles["chat__kebab-menu__choices"]}
          >
            <BtnClearChat />
            <BtnLeave />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KebabMenu;
