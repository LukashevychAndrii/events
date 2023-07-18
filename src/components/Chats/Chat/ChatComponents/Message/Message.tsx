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

  const ref = React.useRef<HTMLDivElement>(null);
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
      }  ${
        ref.current?.clientHeight &&
        ref.current.clientHeight > 35 &&
        styles["chat__message-box__message__big"]
      }`}
    >
      <div
        className={`${
          userID === msg.userID
            ? styles["chat__message-box__message--current-user__text"]
            : styles["chat__message-box__message__text"]
        }  ${
          ref.current?.clientHeight &&
          ref.current.clientHeight > 35 &&
          styles["chat__message-box__message__big"]
        }`}
      >
        {msg.messageType === "announcement" ? (
          <p style={{ marginRight: "-3.5rem" }}>
            <span
              onClick={handleUserClick}
              className={`${styles["chat__message-box__message--announcement__name"]} underline`}
            >
              {msg.userNAME}
            </span>{" "}
            {msg.text}
          </p>
        ) : (
          <div ref={ref}>
            <p>{msg.text}</p>
            <span className={styles["chat__message-box__message__time"]}>
              {msg.time}
            </span>
          </div>
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
