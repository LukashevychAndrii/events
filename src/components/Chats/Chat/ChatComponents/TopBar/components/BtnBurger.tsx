import React from "react";
import styles from "../../../../Chats.module.scss";

interface props {
  setShowCurrentUserD: React.Dispatch<React.SetStateAction<boolean>>;
}

const BtnBurger: React.FC<props> = ({ setShowCurrentUserD }) => {
  return (
    <div
      onClick={() => setShowCurrentUserD(true)}
      className={styles["app-sidebar__bar-top__btn-burger"]}
    >
      <span></span>
    </div>
  );
};

export default BtnBurger;
