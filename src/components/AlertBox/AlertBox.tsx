import React from "react";
import styles from "./AlertBox.module.scss";

import { AnimatePresence, motion } from "framer-motion";

import { ReactComponent as IconError } from "../../img/SVG/error.svg";
import { ReactComponent as IconSuccess } from "../../img/SVG/success.svg";
import { useAppDispatch, useAppSelector } from "../../utils/redux";
import { removeAlert } from "../../store/slices/alert-slice";

const AlertBox = () => {
  const alertQueue = useAppSelector((state) => state.alert.alertQueue);

  const dispatch = useAppDispatch();
  const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null);
  React.useEffect(() => {
    if (alertQueue.length > 0) {
      const timeout = setTimeout(() => {
        dispatch(removeAlert());
      }, 3500);
      setTimeoutId(timeout);
      return () => clearTimeout(timeout);
    }
  }, [alertQueue, dispatch]);

  const handleBtnCloseClick = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      dispatch(removeAlert());
    }
  };

  return (
    <>
      {alertQueue.length > 0 && (
        <motion.div className={styles["alert"]}>
          <div
            className={`${styles["alert__icon__wrapper"]} ${
              alertQueue[0].alertType === "error"
                ? styles["alert__icon__wrapper__error"]
                : styles["alert__icon__wrapper__success"]
            }`}
          >
            {alertQueue[0].alertType === "error" ? (
              <IconError
                className={`${styles["alert__icon"]} ${styles["alert__icon__error"]}`}
              />
            ) : (
              <IconSuccess
                className={`${styles["alert__icon"]} ${styles["alert__icon__success"]}`}
              />
            )}
          </div>
          <div className={styles["alert__content"]}>
            <div className={`${styles["alert__content__title"]} subtitle`}>
              {alertQueue[0].alertTitle}
            </div>
            <p className={styles["alert__content__text"]}>
              {alertQueue[0].alertText}
            </p>
          </div>
          <span className={styles["alert__queue"]}>{alertQueue.length}</span>
          <span
            onClick={handleBtnCloseClick}
            className={styles["alert__close-btn"]}
          >
            &#10005;
          </span>
          <AnimatePresence>
            <motion.span
              key={alertQueue.length}
              className={styles["alert__expire-bar"]}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3.5 }}
            ></motion.span>
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
};

export default AlertBox;
