import React from "react";
import styles from "./Chat.module.scss";
import SimpleBar from "simplebar-react";

import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../utils/redux";
import { chatFetchChat } from "../../../store/slices/chat-slice";

import BtnJoin from "./ChatComponents/BtnJoin/BtnJoin";
import Input from "./ChatComponents/Input/Input";
import Heading from "./ChatComponents/Heading/Heading";
import Message from "./ChatComponents/Message/Message";
import UserDetails from "./ChatComponents/UserDetails/UserDetails";

import { userDetailsT } from "./ChatComponents/UserDetails/UserDetails";

const Chat = () => {
  const { chatID } = useParams();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (chatID) {
      dispatch(chatFetchChat({ chatID: chatID }));
    }
  }, [dispatch, chatID]);

  const chatDATA = useAppSelector((state) => state.chat.currentChat);
  const userID = useAppSelector((state) => state.user.ID);

  const chatRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatDATA]);

  const [userDATA, setUserDATA] = React.useState<userDetailsT>();

  const [showUserDetails, setShowUserDetails] = React.useState(false);

  function getUserDATA(userDATA: userDetailsT) {
    setUserDATA(userDATA);
    setShowUserDetails(true);
  }

  return (
    <div className={styles["chat"]}>
      <Heading />
      <UserDetails
        userDATA={userDATA}
        setShowUserDetails={setShowUserDetails}
        showUserDetails={showUserDetails}
      />
      <div className={styles["chat__message-box"]}>
        <SimpleBar className={styles["chat__message-box__list__wrapper"]}>
          <ul className={styles["chat__message-box__list"]}>
            {chatDATA?.messages &&
              Object.values(chatDATA.messages).map((el, index) => (
                <Message getUserDATA={getUserDATA} key={index} msg={el} />
              ))}
          </ul>
          <span ref={chatRef}></span>
        </SimpleBar>
      </div>

      {chatDATA?.members &&
      Object.values(chatDATA.members).find((el) => el.memberID === userID) ? (
        <Input />
      ) : (
        <BtnJoin />
      )}
    </div>
  );
};

export default Chat;
