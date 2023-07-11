import React from "react";
import styles from "../../Chat.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../../utils/redux";
import {
  chatJoinGroup,
  memberDATAI,
} from "../../../../../store/slices/chat-slice";
import { useNavigate, useParams } from "react-router-dom";

const BtnJoin = () => {
  const dispatch = useAppDispatch();
  const userDATA = useAppSelector((state) => state.user);
  const { chatID } = useParams();
  const navigate = useNavigate();
  const handleJoinGroupClick = () => {
    if (!userDATA.ID) {
      navigate("/auth/sign-in");
    }
    if (chatID) {
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
