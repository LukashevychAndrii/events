import React from "react";
import styles from "../../Chat.module.scss";
import { messageI } from "../../../../../store/slices/chat-slice";
import { useAppSelector } from "../../../../../utils/redux";

import { ReactComponent as DefaultAvatar } from "../../../../../img/SVG/default-avatar.svg";
import { userDetailsT } from "../UserDetails/UserDetails";
interface props {
  msg: messageI;
  getUserDATA: (userDATA: userDetailsT) => void;
}

const Message: React.FC<props> = ({ msg, getUserDATA }) => {
  const userID = useAppSelector((state) => state.user.ID);

  const handleUserClick = () => {
    const userDATA: userDetailsT = {
      userID: msg.userID,
      userNAME: msg.userNAME,
      userPHOTO: msg.userPHOTO,
    };
    getUserDATA(userDATA);
  };
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
        {msg.messageType === "announcement" ? (
          <p>
            <span
              onClick={handleUserClick}
              className={`${styles["chat__message-box__message--announcement__name"]} underline`}
            >
              {msg.userNAME}
            </span>{" "}
            {msg.text}
          </p>
        ) : (
          <p> {msg.text}</p>
        )}
      </div>
      {msg.messageType === "default" && (
        <div style={{ cursor: "pointer" }} onClick={handleUserClick}>
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
            <DefaultAvatar
              className={styles["chat__message-box__message__photo"]}
            />
          )}
        </div>
      )}
    </li>
  );
};

export default Message;
