import React from "react";
import styles from "../../../Chat.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../../../utils/redux";
import { chatLeaveGroup } from "../../../../../../store/slices/chat-slice";
import { useParams } from "react-router-dom";

import { ReactComponent as LeaveIcon } from "../../../../../../img/SVG/leave.svg";

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
      <div>Leave</div>
      <LeaveIcon className={styles["chat__btn-clear-chat__icon"]} />
    </div>
  );
};

export default BtnLeave;
