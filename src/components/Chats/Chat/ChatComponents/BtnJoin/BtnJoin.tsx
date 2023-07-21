import React from "react";
import styles from "../../Chat.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../../utils/redux";
import {
  chatJoinGroup,
  memberDATAI,
} from "../../../../../store/slices/chat-slice";
import { useNavigate, useParams } from "react-router-dom";
import { addAlert } from "../../../../../store/slices/alert-slice";

const BtnJoin = () => {
  const dispatch = useAppDispatch();
  const userDATA = useAppSelector((state) => state.user);
  const { chatID } = useParams();
  const navigate = useNavigate();
  const handleJoinGroupClick = () => {
    if (!userDATA.ID) {
      navigate("/events/auth/sign-in");
      dispatch(
        addAlert({
          alertTitle: "Error!",
          alertText: "U must have an account to join group",
          alertType: "error",
        })
      );
    } else if (chatID) {
      const memberDATA: memberDATAI = {
        memberID: userDATA.ID,
        memberPHOTO: userDATA.photo,
        memberNAME: userDATA.name,
      };

      dispatch(chatJoinGroup({ chatID: chatID, newMemberDATA: memberDATA }));
    }
  };
  return (
    <div
      onClick={handleJoinGroupClick}
      className={`${styles["chat__btn-join"]} subtitle`}
    >
      Join group
    </div>
  );
};

export default BtnJoin;
