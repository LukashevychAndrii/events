import React, { FormEvent } from "react";
import styles from "../../Chat.module.scss";
import {
  chatSendMessage,
  messageI,
} from "../../../../../store/slices/chat-slice";
import { useAppDispatch, useAppSelector } from "../../../../../utils/redux";
import { useParams } from "react-router-dom";

const Input = () => {
  const [enteredMsg, setEnteredMsg] = React.useState<string>("");
  const userDATA = useAppSelector((state) => state.user);
  const chatLIST = useAppSelector((state) => state.chat.chatsList);
  const dispatch = useAppDispatch();
  const { chatID } = useParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEnteredMsg("");
    if (enteredMsg.trim().length > 0 && chatID) {
      const messageDATA: messageI = {
        messageType: "default",
        text: enteredMsg,
        time: "",
        userID: userDATA.ID,
        userNAME: userDATA.name,
        userPHOTO: userDATA.photo,
      };
      dispatch(
        chatSendMessage({
          chatID,
          messageDATA,
          chatType: chatLIST[chatID].type,
        })
      );
    } else {
      //error
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        autoFocus
        className={styles["chat__input"]}
        type="text"
        name="chat-msg"
        id="chat-msg"
        placeholder="Write a message..."
        value={enteredMsg}
        onChange={(e) => {
          setEnteredMsg(e.target.value);
        }}
      />
      <label htmlFor="chat-msg"></label>
    </form>
  );
};

export default Input;
