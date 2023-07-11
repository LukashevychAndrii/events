import React from "react";
import styles from "../../Chat.module.scss";
import KebabMenu from "../KebabMenu/KebabMenu";
import { useAppSelector } from "../../../../../utils/redux";

interface props {
  setShowGroupInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const Heading: React.FC<props> = ({ setShowGroupInfo }) => {
  const chatDATA = useAppSelector((state) => state.chat.currentChat);

  return (
    <div className={styles["chat__heading"]}>
      <div className={styles["chat__heading--left"]}>
        <h3 className="subtitle">{chatDATA?.name}</h3>
        {chatDATA?.date && <div className="subtitle">{chatDATA?.date}</div>}
      </div>
      <div className={styles["chat__heading--right"]}>
        <KebabMenu setShowGroupInfo={setShowGroupInfo} />
      </div>
    </div>
  );
};

export default Heading;
