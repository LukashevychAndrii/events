import React from "react";
import styles from "../../../Chat.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../../../utils/redux";
import { chatClearMessages } from "../../../../../../store/slices/chat-slice";
import { useParams } from "react-router-dom";
import { messageI } from "../../../../../../store/slices/chat-slice";

import { ReactComponent as ClearIcon } from "../../../../../../img/SVG/delete.svg";

interface props {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const BtnClearChat: React.FC<props> = ({ setShowMenu }) => {
  const dispatch = useAppDispatch();
  const { chatID } = useParams();
  const userDATA = useAppSelector((state) => state.user);

  const currentChat = useAppSelector((state) => state.chat.currentChat);
  const handleClearClick = () => {
    if (chatID) {
      if (userDATA.ID) {
        setShowMenu(false);
        const message: messageI = {
          messageType: "announcement",
          text: "cleared chat",
          time: "",
          userID: userDATA.ID,
          userNAME: userDATA.name,
          userPHOTO: userDATA.photo,
        };
        if (currentChat?.type) {
          dispatch(
            chatClearMessages({ chatID, message, chatTYPE: currentChat?.type })
          );
        }
      }
    }
  };
  return (
    <div
      onClick={handleClearClick}
      className={`${styles["chat__btn-clear-chat"]} ${
        !userDATA.ID && styles["chat__btn-clear-chat__disabled"]
      } subtitle`}
    >
      <div>CLEAR</div>
      <ClearIcon className={styles["chat__btn-clear-chat__icon"]} />
    </div>
  );
};

export default BtnClearChat;
