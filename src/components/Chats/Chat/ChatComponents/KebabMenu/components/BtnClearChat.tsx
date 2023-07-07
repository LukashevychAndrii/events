import React from "react";
import styles from "../../../Chat.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../../../utils/redux";
import { chatClearMessages } from "../../../../../../store/slices/chat-slice";
import { useParams } from "react-router-dom";
import { messageI } from "../../../../../../store/slices/chat-slice";

const BtnClearChat = () => {
  const dispatch = useAppDispatch();
  const { chatID } = useParams();
  const userDATA = useAppSelector((state) => state.user);
  const handleClearClick = () => {
    if (chatID) {
      const message: messageI = {
        messageType: "announcement",
        text: "cleared chat",
        time: "",
        userID: userDATA.ID,
        userNAME: userDATA.name,
        userPHOTO: userDATA.photo,
      };
      dispatch(chatClearMessages({ chatID, message }));
    }
  };
  return (
    <div
      onClick={handleClearClick}
      className={`${styles["chat__btn-clear-chat"]} subtitle`}
    >
      CLEAR
    </div>
  );
};

export default BtnClearChat;
