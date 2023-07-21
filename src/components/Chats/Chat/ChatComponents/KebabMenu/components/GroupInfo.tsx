import React from "react";
import styles from "../../../Chat.module.scss";

import { ReactComponent as InfoIcon } from "../../../../../../img/SVG/info.svg";

interface props {
  setShowGroupInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const GroupInfo: React.FC<props> = ({ setShowGroupInfo, setShowMenu }) => {
  const handleClick = () => {
    setShowGroupInfo(true);
    setShowMenu(false);
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles["chat__group-info"]} subtitle`}
    >
      <div>Group Info</div>
      <InfoIcon className={styles["chat__group-info__icon"]} />
    </div>
  );
};

export default GroupInfo;
