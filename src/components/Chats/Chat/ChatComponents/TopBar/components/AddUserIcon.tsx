import React from "react";
import styles from "../../../../Chats.module.scss";

import { ReactComponent as AddUser } from "../../../../../../img/SVG/add-user.svg";

interface props {
  setShowNewContact: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUserIcon: React.FC<props> = ({ setShowNewContact }) => {
  return (
    <AddUser
      onClick={() => setShowNewContact(true)}
      className={styles["app-sidebar__bar-top__add-user__icon"]}
    />
  );
};

export default AddUserIcon;
