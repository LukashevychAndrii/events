import React from "react";
import styles from "../../../../Chats.module.scss";

const FindChat = () => {
  const [value, setValue] = React.useState<string>("");
  return (
    <form className={styles["app-sidebar__bar-top__chat-find"]}>
      <input
        placeholder="Search"
        type="text"
        name="find-chat"
        id="fint-chat"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={(e) => console.log("qwe")}
      />
      <label htmlFor="find-chat"></label>
    </form>
  );
};

export default FindChat;
