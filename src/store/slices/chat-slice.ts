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
  lastMessage: string;
  photo: string;
  date: string;
  members: memberI;
  messages: messageI[];
  type: "public" | "private";
}

// export type chatsListPartialT = Pick<
//   currentChatI,
//   "name" | "lastMessage" | "photo"
// >;

export interface chatsListPartialT
  extends Pick<currentChatI, "name" | "lastMessage" | "photo" | "type"> {}
// export type chatsListPartialT = {
//   [chatID: string]: Pick<
//     currentChatI,
//     "name" | "lastMessage" | "photo" | "image"
//   >;
// };

export interface initialStateI {
  chatsList: { [chatID: string]: chatsListPartialT };
  currentChat: currentChatI | null;
}

const initialState: initialStateI = {
  chatsList: {},
  currentChat: null,
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
    chatSetUserChat(state, action) {
      console.log(action.payload);
      state.chatsList = { ...state.chatsList, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(chatFetchChatsPartial.fulfilled, (state, action) => {
      state.chatsList = action.payload.chats;
    });
    builder.addCase(chatFetchChat.fulfilled, (state, action) => {
      if (action.payload.chatDATA) {
        state.currentChat = action.payload.chatDATA;
      }
    });
  },
});

export default chatSlice.reducer;
export const { chatSetMembers, chatSetMessages, chatSetUserChat } =
  chatSlice.actions;

export const chatFetchChatsPartial = createAsyncThunk<any, undefined, {}>(
  "chat/chatFetchChatsPartial",
  async (_, { dispatch }) => {
    const db = getDatabase();
    const dbRef = ref(db, `chats/chatsPartialInfo`);
    let chats: chatsListPartialT[] = [];
    await get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        chats = snapshot.val();
      }
    });

    return { chats };
  }
);

export const chatFetchChat = createAsyncThunk<
  { chatDATA: currentChatI | null },
  { chatID: string; chatType: "public" | "private" },
  {}
>(
  "chat/chatFetchChat",
  async ({ chatID, chatType }, { dispatch, getState }) => {
    const db = getDatabase();
    const state = getState() as RootState;
    let chatDATA: currentChatI | null = null;

    if (chatType === "public") {
      const dbRef = ref(db, `chats/chatsFullInfo/${chatID}`);
      await get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
          chatDATA = snapshot.val();
        }
      });
    } else if (chatType === "private") {
      const dbRef = ref(db, `users/${state.user.ID}/chats/${chatID}`);
      await get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
          chatDATA = snapshot.val();
        }
      });
    }

    return { chatDATA: chatDATA };
  }
);

export const chatSendMessage = createAsyncThunk<
  undefined,
  { chatID: string; messageDATA: messageI; chatType: "public" | "private" },
  {}
>(
  "chat/chatSendMessage",
  async ({ chatID, messageDATA, chatType }, { dispatch, getState }) => {
    const db = getDatabase();
    const state = getState() as RootState;
    if (chatType === "public") {
      const dbRef = ref(db, `chats/chatsFullInfo/${chatID}/messages`);
      await push(dbRef, messageDATA);
    } else if (chatType === "private") {
      const dbRef = ref(db, `users/${state.user.ID}/chats/${chatID}/messages`);
      await push(dbRef, messageDATA).then(async () => {
        const dbRef = ref(
          db,
          `users/${chatID}/chats/${state.user.ID}/messages`
        );
        await push(dbRef, messageDATA);
      });
    }

    return undefined;
  }
);
//FIX
export const chatJoinGroup = createAsyncThunk<
  undefined,
  { chatID: string; newMemberDATA: any },
  {}
>("chat/chatJoinGroup", async ({ chatID, newMemberDATA }, { dispatch }) => {
  const db = getDatabase();
  const dbRef = ref(db, `chats/chatsFullInfo/${chatID}/members`);
  await update(dbRef, { [newMemberDATA.memberID]: newMemberDATA }).then(
    async () => {
      const dbRef = ref(db, `chats/chatsFullInfo/${chatID}/messages`);
      const announcement: any = {
        messageType: "announcement",
        text: `joined the group`,
        time: "",
        userID: newMemberDATA.memberID,
        userNAME: newMemberDATA.memberNAME,
        userPHOTO: newMemberDATA.memberPHOTO,
      };
      await push(dbRef, announcement);
    }
  );

  return undefined;
});

export const chatLeaveGroup = createAsyncThunk<
  undefined,
  { chatID: string; userID: string },
  {}
>("chat/chatLeaveGroup", async ({ chatID, userID }, { dispatch, getState }) => {
  const db = getDatabase();
  const dbRef = ref(db, `chats/chatsFullInfo/${chatID}/members/${userID}`);
  const state = getState() as RootState;
  await remove(dbRef).then(async () => {
    const dbRef = ref(db, `chats/chatsFullInfo/${chatID}/messages`);
    const announcement: messageI = {
      messageType: "announcement",
      text: `left the group`,
      time: "",
      userID: state.user.ID,
      userNAME: state.user.name,
      userPHOTO: state.user.photo,
    };
    await push(dbRef, announcement);
  });

  return undefined;
});

export const chatFetchMembers = createAsyncThunk<
  undefined,
  { chatID: string },
  {}
>("chat/chatFetchMembers", async ({ chatID }, { dispatch }) => {
  const db = getDatabase();
  const dbRef = ref(db, `chats/chatsFullInfo/${chatID}/members`);
  onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      const members: memberI[] = Object.values(snapshot.val());
      dispatch(chatSetMembers(members));
    } else {
      dispatch(chatSetMembers([]));
    }
  });

  return undefined;
});

export const chatFetchMessages = createAsyncThunk<
  undefined,
  { chatID: string },
  {}
>("chat/chatFetchMessages", async ({ chatID }, { dispatch }) => {
  const db = getDatabase();
  const dbRef = ref(db, `chats/chatsFullInfo/${chatID}/messages`);
  onValue(dbRef, (snapshot) => {
    // console.log(snapshot.val());
    if (snapshot.exists()) {
      // console.log(snapshot.val());
      const messages: messageI[] = Object.values(snapshot.val());
      dispatch(chatSetMessages(messages));
    } else {
      dispatch(chatSetMessages([]));
    }
  });

  return undefined;
});

export const chatClearMessages = createAsyncThunk<
  undefined,
  { chatID: string; message: messageI },
  {}
>("chat/chatClearMessages", async ({ chatID, message }, { dispatch }) => {
  const db = getDatabase();
  const dbRef = ref(db, `chats/chatsFullInfo/${chatID}/messages`);
  await remove(dbRef).then(() => {
    push(dbRef, message);
  });

  return undefined;
});

interface currentUserChatI extends Omit<currentChatI, "members"> {
  members: string[];
}

export interface userDATA
  extends Pick<messageI, "userID" | "userPHOTO" | "userNAME"> {}

export const chatAddUserChat = createAsyncThunk<
  undefined,
  { userDATA: userDATA },
  {}
>("chat/chatAddUserChat", async ({ userDATA }, { dispatch, getState }) => {
  const db = getDatabase();
  const state = getState() as RootState;
  const dbRef = ref(db, `users/${state.user.ID}/chats/${userDATA.userID}`);

  const chatDATA: currentUserChatI = {
    date: "",
    lastMessage: "",
    members: [userDATA.userID, state.user.ID],
    messages: [],
    name: userDATA.userNAME,
    photo: userDATA.userPHOTO,
    type: "private",
  };

  await set(dbRef, chatDATA).then(async () => {
    const dbRef = ref(db, `users/${userDATA.userID}/chats/${state.user.ID}`);
    const chatDATA: currentUserChatI = {
      date: "",
      lastMessage: "",
      members: [userDATA.userID, state.user.ID],
      messages: [],
      name: state.user.name,
      photo: state.user.photo,
      type: "private",
    };
    await set(dbRef, chatDATA);
  });
  return undefined;
});

export const chatFetchUserChats = createAsyncThunk<undefined, undefined, {}>(
  "chat/chatFetchUserChats",
  async (_, { dispatch, getState }) => {
    const db = getDatabase();
    const state = getState() as RootState;
    console.log("chat");
    if (state.user.ID) {
      const dbRef = ref(db, `users/${state.user.ID}/chats`);
      onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          // console.log(Object.values(state.chat.chatsList));
          // const allChats = [
          //   ...Object.values(state.chat.chatsList),
          //   ...Object.values(snapshot.val()),
          // ];
          console.log("qe");
          dispatch(chatSetUserChat(snapshot.val()));
        } else {
          console.log("no data");
        }
      });
    }

    return undefined;
  }
);

// const events = [
//   {
//     name: "Summer Picnic",
//     date: "20/06/2023",
//     lastMessage: "",
//     image:
//       "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
//   },
//   {
//     name: "Music Festival",
//     date: "05/07/2023",
//     lastMessage: "",
//     image:
//       "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
//   },
//   {
//     name: "Beach Party",
//     date: "15/07/2023",
//     lastMessage: "",
//     image:
//       "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1412&q=80",
//   },
//   {
//     name: "Hiking Expedition",
//     date: "01/08/2023",
//     lastMessage: "",
//     image:
//       "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
//   },
//   {
//     name: "Cooking Class",
//     date: "12/07/2023",
//     lastMessage: "",
//     image:
//       "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
//   },
//   {
//     name: "Movie Night",
//     date: "10/06/2023",
//     lastMessage: "",
//     image:
//       "https://images.unsplash.com/photo-1674574124792-3be232f1957f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//   },
//   {
//     name: "Art Exhibition",
//     date: "28/06/2023",
//     lastMessage: "",
//     image:
//       "https://images.unsplash.com/photo-1508997449629-303059a039c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
//   },
// ];

// export const qwe = createAsyncThunk<undefined, undefined, {}>(
//   "chat/qwe",
//   async (_, { dispatch }) => {
//     const db = getDatabase();
//     const dbRef = ref(db, `chats/general/partialInfo`);
//     console.log(events.length);
//     events.map((el) => {
//       push(dbRef, el);
//     });

//     return undefined;
//   }
// );
