import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Chats from "../../components/Chats/Chats";
import { useAppDispatch, useAppSelector } from "../../utils/redux";
import {
  chatFetchMembers,
  chatFetchMessages,
} from "../../store/slices/chat-slice";

const RootLayoutChat = () => {
  const dispatch = useAppDispatch();
  const { chatID } = useParams();
  React.useEffect(() => {
    if (chatID) {
      dispatch(chatFetchMembers({ chatID }));
      dispatch(chatFetchMessages({ chatID }));
    }
  }, [dispatch, chatID]);
  return (
    <>
      <Chats outlet={<Outlet />} />
    </>
  );
};

export default RootLayoutChat;
