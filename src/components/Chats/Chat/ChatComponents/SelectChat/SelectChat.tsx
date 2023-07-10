import React from "react";
import styles from "../../../Chats.module.scss";

const SelectChat = () => {
  return (
    <div className={styles["select-chat__wrapper"]}>
      <div className={styles["select-chat"]}>
        Select a chat to start messaging
      </div>
    </div>
  );
};

export default SelectChat;
