import React from "react";
import styles from "../../../../Chats.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../../../utils/redux";

interface props {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FindChat: React.FC<props> = ({ setFilter }) => {
  const [value, setValue] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter(value);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={styles["app-sidebar__bar-top__chat-find"]}
    >
      <input
        placeholder="Search"
        type="text"
        name="find-chat"
        id="fint-chat"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <label htmlFor="find-chat"></label>
    </form>
  );
};

export default FindChat;
