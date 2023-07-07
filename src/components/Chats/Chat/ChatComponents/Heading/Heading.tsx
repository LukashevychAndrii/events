import React from "react";
import styles from "../../Chat.module.scss";
import KebabMenu from "../KebabMenu/KebabMenu";
import { useAppSelector } from "../../../../../utils/redux";

const Heading = () => {
  const chatDATA = useAppSelector((state) => state.chat.currentChat);
  return (
    <div className={styles["chat__heading"]}>
      <div className={styles["chat__heading--left"]}>
        <h3 className="subtitle">{chatDATA?.name}</h3>
        <div className="subtitle">{chatDATA?.date}</div>
      </div>
      <div className={styles["chat__heading--right"]}>
        <KebabMenu />
      </div>
    </div>
  );
};

export default Heading;
