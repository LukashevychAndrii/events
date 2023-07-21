import React from "react";
import styles from "../../Chat.module.scss";
import BtnLeave from "./components/BtnLeave";
import BtnClearChat from "./components/BtnClearChat";
import useClickOutside from "../../../../../hooks/useClickOutside";
import { AnimatePresence, Variants, motion } from "framer-motion";
import GroupInfo from "./components/GroupInfo";
import { useAppSelector } from "../../../../../utils/redux";

const variantsShowMenu: Variants = {
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    pointerEvents: "all",
  },
  hidden: {
    opacity: 0,
    x: 30,
    y: 30,
    pointerEvents: "none",
  },
};

interface props {
  setShowGroupInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const KebabMenu: React.FC<props> = ({ setShowGroupInfo }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const outside = useClickOutside({ ref });

  const [chatTYPE, setChatTYPE] = React.useState<"public" | "private">();

  const currentCHAT = useAppSelector((state) => state.chat.currentChat);
  React.useEffect(() => {
    if (currentCHAT) {
      setChatTYPE(currentCHAT.type);
    }
  }, [currentCHAT]);

  React.useEffect(() => {
    if (outside) {
      setShowMenu(false);
    }
  }, [outside]);

  return (
    <div ref={ref}>
      <div
        onClick={() => setShowMenu(!showMenu)}
        className={`${styles["chat__kebab-menu__wrapper"]} ${
          showMenu && styles["chat__kebab-menu__wrapper--active"]
        }`}
      >
        <div className={styles["chat__kebab-menu"]}></div>
      </div>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            transition={{ duration: 0.4 }}
            variants={variantsShowMenu}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={styles["chat__kebab-menu__choices"]}
          >
            {chatTYPE === "public" && (
              <GroupInfo
                setShowMenu={setShowMenu}
                setShowGroupInfo={setShowGroupInfo}
              />
            )}
            <BtnClearChat setShowMenu={setShowMenu} />
            <BtnLeave setShowMenu={setShowMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KebabMenu;
