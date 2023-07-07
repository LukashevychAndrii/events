import React from "react";
import styles from "../../../Chat.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../../../utils/redux";
import { chatLeaveGroup } from "../../../../../../store/slices/chat-slice";
import { useParams } from "react-router-dom";

const BtnLeave = () => {
  const dispatch = useAppDispatch();
  const { chatID } = useParams();
  const userID = useAppSelector((state) => state.user.ID);
  const currentChatMembers = useAppSelector(
    (state) => state.chat.currentChat?.members
  );

  const handleBtnLeaveClick = () => {
    if (chatID) {
      if (
        currentChatMembers &&
        currentChatMembers.find((el) => el.memberID === userID)
      ) {
        dispatch(chatLeaveGroup({ chatID: chatID, userID: userID }));
      } else {
        console.log("NOT A MEMBER");
      }
    }
  };

  return (
    <div
      onClick={handleBtnLeaveClick}
      className={`${styles["chat__btn-leave"]} subtitle`}
    >
      LEAVE
    </div>
  );
};

export default BtnLeave;
