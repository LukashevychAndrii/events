import React from "react";
import styles from "../../../Chat.module.scss";
import { useAppSelector } from "../../../../../../utils/redux";

import { ReactComponent as DefaultAvatar } from "../../../../../../img/SVG/default-avatar.svg";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Variants, motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../../../../../hooks/useClickOutside";

const variantsGroupInfo: Variants = {
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

const variantsGroupInfoWrapper: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

interface props {
  setShowGroupInfo: React.Dispatch<React.SetStateAction<boolean>>;
  showGroupInfo: boolean;
}
const GroupInfoBox: React.FC<props> = ({ setShowGroupInfo, showGroupInfo }) => {
  const currentCHAT = useAppSelector((state) => state.chat.currentChat);
  const userID = useAppSelector((state) => state.user.ID);

  const ref = React.useRef<HTMLDivElement>(null);
  const outside = useClickOutside({ ref });
  React.useEffect(() => {
    if (outside) {
      setShowGroupInfo(false);
    }
    console.log(outside);
  }, [outside, setShowGroupInfo]);

  React.useEffect(() => {
    console.log(currentCHAT);
  }, [currentCHAT]);

  const handleCloseClick = () => {
    setShowGroupInfo(false);
  };

  return (
    <AnimatePresence>
      {showGroupInfo && (
        <motion.div
          transition={{ duration: 0.4 }}
          variants={variantsGroupInfoWrapper}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={styles["chat__group-info-box__wrapper"]}
        >
          <motion.div
            transition={{ duration: 0.4 }}
            ref={ref}
            variants={variantsGroupInfo}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={styles["chat__group-info-box"]}
          >
            <div>Group Info</div>
            <div className={styles["chat__group-info-box__content"]}>
              {currentCHAT?.photo ? (
                <div
                  className={styles["chat__group-info-box__img"]}
                  style={{ backgroundImage: `url(${currentCHAT.photo})` }}
                ></div>
              ) : (
                <DefaultAvatar />
              )}
              <div className={styles["chat__group-info-box__content__text"]}>
                <div>{currentCHAT?.name}</div>
                <div>{currentCHAT?.date}</div>
              </div>
            </div>
            {currentCHAT?.members ? (
              <ul className={styles["chat__group-info-box__content__members"]}>
                <SimpleBar
                  autoHide={false}
                  style={{ height: "25rem", width: "35rem" }}
                >
                  {Object.values(currentCHAT?.members).map((el, index) => (
                    <li
                      className={
                        styles["chat__group-info-box__content__members__member"]
                      }
                      key={index}
                    >
                      {el.memberPHOTO ? (
                        <div
                          className={
                            styles[
                              "chat__group-info-box__content__members__member__img"
                            ]
                          }
                          style={{ backgroundImage: `url(${el.memberPHOTO})` }}
                        ></div>
                      ) : (
                        <DefaultAvatar
                          className={
                            styles[
                              "chat__group-info-box__content__members__member__img"
                            ]
                          }
                        />
                      )}
                      <div>
                        <div>
                          {el.memberID === userID
                            ? `${el.memberNAME} (you)`
                            : `${el.memberNAME}`}
                        </div>
                        <div>{Object.keys(currentCHAT?.members)[index]}</div>
                      </div>
                    </li>
                  ))}
                </SimpleBar>
              </ul>
            ) : (
              <span
                className={`${styles["chat__group-info-box__no-members-text"]} subtitle`}
              >
                No members!
              </span>
            )}
            <span
              onClick={handleCloseClick}
              className={styles["chat__group-info-box__btn-close"]}
            >
              &#10005;
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GroupInfoBox;
