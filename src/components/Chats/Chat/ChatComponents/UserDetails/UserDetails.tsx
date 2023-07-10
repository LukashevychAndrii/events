import React from "react";
import styles from "../../Chat.module.scss";
import { messageI } from "../../../../../store/slices/chat-slice";
import { ReactComponent as DefaultAvatar } from "../../../../../img/SVG/default-avatar.svg";
import { Variants, motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../../../../hooks/useClickOutside";

export type userDetailsT = Pick<messageI, "userID" | "userNAME" | "userPHOTO">;

const userDetailsVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    x: "-50%",
    y: "-50%",
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: "-50%",
    y: "-50%",
  },
};

const userDetailsWrapperVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

interface props {
  userDATA: userDetailsT | undefined;
  showUserDetails: boolean;
  setShowUserDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserDetails: React.FC<props> = ({
  userDATA,
  showUserDetails,
  setShowUserDetails,
}) => {
  const handleBtnClose = () => {
    setShowUserDetails(false);
  };

  const ref = React.useRef<HTMLDivElement>(null);
  const outside = useClickOutside({ ref });
  React.useEffect(() => {
    if (outside) {
      setShowUserDetails(false);
    }
  }, [outside, setShowUserDetails]);
  return (
    <AnimatePresence>
      {showUserDetails && (
        <motion.div
          transition={{ duration: 0.4 }}
          variants={userDetailsWrapperVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={styles["chat__user-details__wrapper"]}
        >
          <motion.div
            transition={{ duration: 0.4 }}
            ref={ref}
            variants={userDetailsVariants}
            initial="hidden"
            exit="hidden"
            animate="visible"
            className={styles["chat__user-details"]}
          >
            <div className={styles["chat__user-details__header"]}>
              <div>User Info</div>
              <div
                className={styles["chat__user-details__header__btn-close"]}
                onClick={handleBtnClose}
              >
                &#10005;
              </div>
            </div>
            <div className={styles["chat__user-details__user-info"]}>
              {userDATA?.userPHOTO ? (
                <img
                  className={styles["chat__user-details__user-info__img"]}
                  src={userDATA?.userPHOTO}
                  alt="user"
                />
              ) : (
                <DefaultAvatar
                  className={styles["chat__user-details__user-info__img"]}
                />
              )}
              <div className={styles["chat__user-details__user-info__text"]}>
                <div>{userDATA?.userNAME}</div>
                <div>{userDATA?.userID}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserDetails;
