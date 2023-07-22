import React from "react";
import styles from "../../../Chat.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../../../utils/redux";
import { chatLeave } from "../../../../../../store/slices/chat-slice";
import { useParams } from "react-router-dom";

import { ReactComponent as LeaveIcon } from "../../../../../../img/SVG/leave.svg";

interface props {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const BtnLeave: React.FC<props> = ({ setShowMenu }) => {
  const dispatch = useAppDispatch();
  const { chatID } = useParams();
  const userID = useAppSelector((state) => state.user.ID);
  const currentChat = useAppSelector((state) => state.chat.currentChat);

  const handleBtnLeaveClick = () => {
    if (chatID) {
      if (userID) {
        setShowMenu(false);
        if (currentChat?.type === "public") {
          if (
            currentChat?.members &&
            Object.values(currentChat.members).find(
              (el) => el.memberID === userID
            )
          ) {
            dispatch(
              chatLeave({
                chatID: chatID,
                userID: userID,
                chatTYPE: currentChat.type,
              })
            );
          } else {
          }
        } else if (currentChat?.type === "private") {
          dispatch(
            chatLeave({
              chatID: chatID,
              userID: userID,
              chatTYPE: currentChat.type,
            })
          );
        }
      }
    }
  };

  return (
    <div
      onClick={handleBtnLeaveClick}
      className={`${styles["chat__btn-leave"]} ${
        !userID && styles["chat__btn-leave__disabled"]
      } subtitle`}
    >
      <div>Leave</div>
      <LeaveIcon className={styles["chat__btn-clear-chat__icon"]} />
    </div>
  );
};

export default BtnLeave;
