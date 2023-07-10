import React from "react";
import styles from "../../../../Chats.module.scss";
import { useAppSelector } from "../../../../../../utils/redux";
import { Variants, motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../../../../../hooks/useClickOutside";

import { ReactComponent as DefaultAvatar } from "../../../../../../img/SVG/default-avatar.svg";

interface props {
  showCurrentUserD: boolean;
  setShowCurrentUserD: React.Dispatch<React.SetStateAction<boolean>>;
}

const variantsUserDetails: Variants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: "-1.5rem",
    opacity: 1,
  },
};

const CurrentUserDetails: React.FC<props> = ({
  showCurrentUserD,
  setShowCurrentUserD,
}) => {
  const userDATA = useAppSelector((state) => state.user);

  const ref = React.useRef<HTMLDivElement>(null);
  const clickOutside = useClickOutside({ ref });
  React.useEffect(() => {
    if (clickOutside) {
      setShowCurrentUserD(false);
    }
  }, [clickOutside, setShowCurrentUserD]);
  return (
    <AnimatePresence>
      {showCurrentUserD && (
        <motion.div
          ref={ref}
          transition={{ duration: 0.3 }}
          variants={variantsUserDetails}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={styles["app-sidebar__content__current-user"]}
        >
          {userDATA.photo ? (
            <img
              className={styles["app-sidebar__content__current-user__img"]}
              src={userDATA.photo}
              alt="current user"
            />
          ) : (
            <DefaultAvatar />
          )}
          <div>{userDATA.name}</div>
          <div>{userDATA.ID}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CurrentUserDetails;
