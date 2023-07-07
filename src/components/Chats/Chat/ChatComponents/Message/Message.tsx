import React from "react";
import styles from "../../Chat.module.scss";
import { messageI } from "../../../../../store/slices/chat-slice";
import { useAppSelector } from "../../../../../utils/redux";

import { ReactComponent as DefaultAvatar } from "../../../../../img/SVG/default-avatar.svg";
interface props {
  msg: messageI;
}

const Message: React.FC<props> = ({ msg }) => {
  const userID = useAppSelector((state) => state.user.ID);
  return (
    <li
      className={`${
        userID === msg.userID
          ? styles["chat__message-box__message--current-user"]
          : styles["chat__message-box__message"]
      } ${
        msg.messageType === "announcement"
          ? styles["chat__message-box__message--announcement"]
          : userID === msg.userID &&
            styles["chat__message-box__message--current-user"]
      } `}
    >
      <div
        className={`${
          userID === msg.userID
            ? styles["chat__message-box__message--current-user__text"]
            : styles["chat__message-box__message__text"]
        }`}
      >
        {msg.messageType === "announcement"
          ? `${msg.userNAME} ${msg.text}`
          : msg.text}
      </div>
      {msg.messageType === "default" && (
        <>
          {msg.userPHOTO ? (
            <img
              className={`${
                userID === msg.userID
                  ? styles["chat__message-box__message--current-user__photo"]
                  : styles["chat__message-box__message__photo"]
              }`}
              src={msg.userPHOTO}
              alt="user"
            />
          ) : (
            <DefaultAvatar />
          )}
        </>
      )}
    </li>
  );
};

export default Message;
