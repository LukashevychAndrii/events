import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  get,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { RootState } from "..";
import { pendingUpdateQueueDown, pendingUpdateQueueUp } from "./pending-slice";
import { addAlert } from "./alert-slice";
import { NavigateFunction } from "react-router-dom";

interface memberI {
  [chatID: string]: {
    memberNAME: string;
    memberPHOTO: string;
    memberID: string;
  };
}

export interface memberDATAI {
  memberNAME: string;
  memberPHOTO: string;
  memberID: string;
}

export interface messageI {
  time: string;
  text: string;
  userNAME: string;
  userID: string;
  userPHOTO: string;
  messageType: "announcement" | "default";
}

export interface currentChatI {
  name: string;
  photo: string;
  date: string;
  members: memberI;
  messages: messageI[];
  type: "public" | "private";
}
export interface chatsListPartialT
  extends Pick<currentChatI, "name" | "photo" | "type"> {
  lastMessageDATA?: messageI;
}
export interface initialStateI {
  currentChat: currentChatI | null;
  publicChats: { [chatID: string]: chatsListPartialT };
  privateChats: { [chatID: string]: currentChatI };
  allChats: { [chatID: string]: chatsListPartialT };
}

const initialState: initialStateI = {
  currentChat: null,
  publicChats: {},
  privateChats: {},
  allChats: {},
};

//FIX
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatSetMembers(state, action: { payload: any }) {
      if (state.currentChat) {
        state.currentChat.members = action.payload;
      }
    },
    chatSetMessages(state, action: { payload: messageI[] }) {
      if (state.currentChat) {
        state.currentChat.messages = action.payload;
      }
    },
    chatSetUserChats(state, action) {
      state.privateChats = action.payload;
      if (action.payload) {
        state.allChats = { ...state.publicChats, ...action.payload };
      } else {
        state.allChats = state.publicChats;
      }
    },
    chatSetPartialChats(state, action) {
      state.publicChats = action.payload;
      state.allChats = { ...action.payload, ...state.privateChats };
    },
  },
  extraReducers(builder) {
    builder.addCase(chatFetchChat.fulfilled, (state, action) => {
      if (action.payload.chatDATA) {
        state.currentChat = action.payload.chatDATA;
      }
    });
  },
});

export default chatSlice.reducer;
export const {
  chatSetMembers,
  chatSetMessages,
  chatSetUserChats,
  chatSetPartialChats,
} = chatSlice.actions;

export const chatFetchChatsPartial = createAsyncThunk<undefined, undefined, {}>(
  "chat/chatFetchChatsPartial",
  async (_, { dispatch }) => {
    dispatch(pendingUpdateQueueUp());
    try {
      const db = getDatabase();
      const dbRef = ref(db, `chats/chatsPartialInfo`);
      onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          dispatch(chatSetPartialChats(snapshot.val()));
        }
      });
      return undefined;
    } catch (error) {
      dispatch(
        addAlert({
          alertText: "Fetching chats failed!",
          alertTitle: "Fetching Error!",
          alertType: "error",
        })
      );
    } finally {
      dispatch(pendingUpdateQueueDown());
    }
  }
);

export const chatFetchChat = createAsyncThunk<
  { chatDATA: currentChatI | null },
  { chatID: string; chatType: "public" | "private" },
  {}
>(
  "chat/chatFetchChat",
  async ({ chatID, chatType }, { dispatch, getState }) => {
    dispatch(pendingUpdateQueueUp());
    try {
      const db = getDatabase();
      const state = getState() as RootState;
      let chatDATA: currentChatI | null = null;

      if (chatType === "public") {
        const dbRef = ref(db, `chats/chatsFullInfo/${chatID}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          chatDATA = snapshot.val();
        }
      } else if (chatType === "private") {
        const dbRef = ref(db, `users/${state.user.ID}/chats/${chatID}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          chatDATA = snapshot.val();
        }
      }

      return { chatDATA: chatDATA };
    } catch (error) {
      dispatch(
        addAlert({
          alertText: "Fetching chat failed!",
          alertTitle: "Fetching Error!",
          alertType: "error",
        })
      );
      return { chatDATA: null };
    } finally {
      dispatch(pendingUpdateQueueDown());
    }
  }
);

export const chatSendMessage = createAsyncThunk<
  undefined,
  { chatID: string; messageDATA: messageI; chatType: "public" | "private" },
  {}
>(
  "chat/chatSendMessage",
  async ({ chatID, messageDATA, chatType }, { dispatch, getState }) => {
    dispatch(pendingUpdateQueueUp());

    try {
      const db = getDatabase();
      const state = getState() as RootState;
      if (chatType === "public") {
        const dbRef = ref(db, `chats/chatsFullInfo/${chatID}/messages`);
        await push(dbRef, messageDATA).then(async () => {
          const dbRef = ref(
            db,
            `chats/chatsPartialInfo/${chatID}/lastMessageDATA`
          );

          await set(dbRef, messageDATA);
        });
      } else if (chatType === "private") {
        const dbRefUser = ref(
          db,
          `users/${state.user.ID}/chats/${chatID}/messages`
        );
        const dbRefChat = ref(
          db,
          `users/${chatID}/chats/${state.user.ID}/messages`
        );

        const dbRefLastMessage1 = ref(
          db,
          `users/${state.user.ID}/chats/${chatID}/lastMessageDATA`
        );
        const dbRefLastMessage2 = ref(
          db,
          `users/${chatID}/chats/${state.user.ID}/lastMessageDATA`
        );
        await Promise.all([
          push(dbRefUser, messageDATA),
          push(dbRefChat, messageDATA),
          set(dbRefLastMessage1, messageDATA),
          set(dbRefLastMessage2, messageDATA),
        ]);
      }
    } catch (error) {
      dispatch(
        addAlert({
          alertText: "Sending message failed!",
          alertTitle: "Error!",
          alertType: "error",
        })
      );
    } finally {
      dispatch(pendingUpdateQueueDown());
    }

    return undefined;
  }
);

// ! FIX
export const chatJoinGroup = createAsyncThunk<
  undefined,
  { chatID: string; newMemberDATA: any },
  {}
>("chat/chatJoinGroup", async ({ chatID, newMemberDATA }, { dispatch }) => {
  dispatch(pendingUpdateQueueUp());

  try {
    const db = getDatabase();
    const dbRefMembers = ref(db, `chats/chatsFullInfo/${chatID}/members`);
    const dbRefMessages = ref(db, `chats/chatsFullInfo/${chatID}/messages`);
    await Promise.all([
      update(dbRefMembers, { [newMemberDATA.memberID]: newMemberDATA }),
      push(dbRefMessages, {
        messageType: "announcement",
        text: `joined the group`,
        time: "",
        userID: newMemberDATA.memberID,
        userNAME: newMemberDATA.memberNAME,
        userPHOTO: newMemberDATA.memberPHOTO,
      }),
    ]);
  } catch (error) {
    dispatch(
      addAlert({
        alertText: "Joining chat failed!",
        alertTitle: "Error!",
        alertType: "error",
      })
    );
  } finally {
    dispatch(pendingUpdateQueueDown());
  }

  return undefined;
});

export const chatLeave = createAsyncThunk<
  undefined,
  { chatID: string; userID: string; chatTYPE: "private" | "public" },
  {}
>(
  "chat/chatLeave",
  async ({ chatID, userID, chatTYPE }, { dispatch, getState }) => {
    dispatch(pendingUpdateQueueUp());
    try {
      const db = getDatabase();
      const state = getState() as RootState;
      if (chatTYPE === "public") {
        const dbRefMembers = ref(
          db,
          `chats/chatsFullInfo/${chatID}/members/${userID}`
        );
        const dbRefMessages = ref(db, `chats/chatsFullInfo/${chatID}/messages`);
        await Promise.all([
          remove(dbRefMembers),
          push(dbRefMessages, {
            messageType: "announcement",
            text: `left the group`,
            time: "",
            userID: state.user.ID,
            userNAME: state.user.name,
            userPHOTO: state.user.photo,
          }),
        ]);
      } else if (chatTYPE === "private") {
        const dbRef1 = ref(db, `users/${state.user.ID}/chats/${chatID}`);
        const dbRef2 = ref(db, `users/${chatID}/chats/${state.user.ID}`);
        await Promise.all([remove(dbRef1), remove(dbRef2)]);
      }
    } catch (error) {
      dispatch(
        addAlert({
          alertText: "Leaving chats failed!",
          alertTitle: "Error!",
          alertType: "error",
        })
      );
    } finally {
      dispatch(pendingUpdateQueueDown());
    }

    return undefined;
  }
);

export const chatFetchMembers = createAsyncThunk<
  undefined,
  { chatID: string },
  {}
>("chat/chatFetchMembers", async ({ chatID }, { dispatch }) => {
  dispatch(pendingUpdateQueueUp());
  try {
    const db = getDatabase();
    const dbRef = ref(db, `chats/chatsFullInfo/${chatID}/members`);
    onValue(dbRef, (snapshot) => {
      dispatch(chatSetMembers(snapshot.val()));
    });
  } catch (error) {
    dispatch(
      addAlert({
        alertText: "Fetching members failed!",
        alertTitle: "Fetching Error!",
        alertType: "error",
      })
    );
  } finally {
    dispatch(pendingUpdateQueueDown());
  }

  return undefined;
});

export const chatFetchMessages = createAsyncThunk<
  undefined,
  { chatID: string },
  {}
>("chat/chatFetchMessages", async ({ chatID }, { dispatch }) => {
  dispatch(pendingUpdateQueueUp());
  try {
    const db = getDatabase();
    const dbRef = ref(db, `chats/chatsFullInfo/${chatID}/messages`);
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const messages: messageI[] = Object.values(snapshot.val());
        dispatch(chatSetMessages(messages));
      } else {
        dispatch(chatSetMessages([]));
      }
    });
  } catch (error) {
    dispatch(
      addAlert({
        alertText: "Fetching messages failed!",
        alertTitle: "Error!",
        alertType: "error",
      })
    );
  } finally {
    dispatch(pendingUpdateQueueDown());
  }

  return undefined;
});

export const chatClearMessages = createAsyncThunk<
  undefined,
  { chatID: string; message: messageI; chatTYPE: "private" | "public" },
  {}
>(
  "chat/chatClearMessages",
  async ({ chatID, message, chatTYPE }, { dispatch, getState }) => {
    dispatch(pendingUpdateQueueUp());
    try {
      if (chatTYPE === "public") {
        const db = getDatabase();
        const dbRef = ref(db, `chats/chatsFullInfo/${chatID}/messages`);
        await remove(dbRef).then(() => {
          push(dbRef, message);
        });
      } else if (chatTYPE === "private") {
        const state = getState() as RootState;
        const db = getDatabase();
        const dbRef1 = ref(
          db,
          `users/${state.user.ID}/chats/${chatID}/lastMessageDATA`
        );
        const dbRef2 = ref(
          db,
          `users/${state.user.ID}/chats/${chatID}/messages`
        );

        const dbRef3 = ref(
          db,
          `users/${chatID}/chats/${state.user.ID}/lastMessageDATA`
        );
        const dbRef4 = ref(
          db,
          `users/${chatID}/chats/${state.user.ID}/messages`
        );

        await Promise.all([
          remove(dbRef1),
          remove(dbRef2),
          remove(dbRef3),
          remove(dbRef4),
        ]).then(async () => {
          const dbRef1 = ref(
            db,
            `users/${state.user.ID}/chats/${chatID}/messages`
          );
          const dbRef2 = ref(
            db,
            `users/${chatID}/chats/${state.user.ID}/messages`
          );

          await Promise.all([push(dbRef1, message), push(dbRef2, message)]);
        });
      }
    } catch (error) {
      dispatch(
        addAlert({
          alertText: "Clearing messages failed!",
          alertTitle: "Error!",
          alertType: "error",
        })
      );
    } finally {
      dispatch(pendingUpdateQueueDown());
    }

    return undefined;
  }
);

interface currentUserChatI extends Omit<currentChatI, "members"> {
  members: string[];
}

export interface userDATA
  extends Pick<messageI, "userID" | "userPHOTO" | "userNAME"> {}

export const chatAddUserChat = createAsyncThunk<
  undefined,
  { userDATA: userDATA; navigate: NavigateFunction },
  {}
>(
  "chat/chatAddUserChat",
  async ({ userDATA, navigate }, { dispatch, getState }) => {
    dispatch(pendingUpdateQueueUp());
    try {
      const db = getDatabase();
      const state = getState() as RootState;

      const userChatRef = ref(
        db,
        `users/${state.user.ID}/chats/${userDATA.userID}`
      );
      const currentUserChat: currentUserChatI = {
        date: "",
        members: [userDATA.userID, state.user.ID],
        messages: [],
        name: userDATA.userNAME,
        photo: userDATA.userPHOTO,
        type: "private",
      };

      await set(userChatRef, currentUserChat);

      const otherUserChatRef = ref(
        db,
        `users/${userDATA.userID}/chats/${state.user.ID}`
      );
      const otherUserChat: currentUserChatI = {
        date: "",
        members: [userDATA.userID, state.user.ID],
        messages: [],
        name: state.user.name,
        photo: state.user.photo,
        type: "private",
      };

      await set(otherUserChatRef, otherUserChat);

      navigate(`/events/chats/${userDATA.userID}`);
    } catch (error) {
      dispatch(
        addAlert({
          alertText: "Adding user failed!",
          alertTitle: "Error!",
          alertType: "error",
        })
      );
    } finally {
      dispatch(pendingUpdateQueueDown());
    }

    return undefined;
  }
);

export const chatFetchUserChats = createAsyncThunk<undefined, undefined, {}>(
  "chat/chatFetchUserChats",
  async (_, { dispatch, getState }) => {
    dispatch(pendingUpdateQueueUp());
    try {
      const db = getDatabase();
      const state = getState() as RootState;
      console.log("chat");
      if (state.user.ID) {
        const dbRef = ref(db, `users/${state.user.ID}/chats`);
        onValue(dbRef, (snapshot) => {
          dispatch(chatSetUserChats(snapshot.val()));
        });
      }
    } catch (error) {
      dispatch(
        addAlert({
          alertText: "Fetching users failed!",
          alertTitle: "Fetching Error!",
          alertType: "error",
        })
      );
    } finally {
      dispatch(pendingUpdateQueueDown());
    }

    return undefined;
  }
);
