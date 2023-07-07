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

export interface memberI {
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
  members: memberI[];
  messages: messageI[];
  image: string;
}

export type chatsListPartialT = Pick<
  currentChatI,
  "name" | "lastMessage" | "photo" | "image"
>;

export interface initialStateI {
  chatsList: chatsListPartialT[];
  currentChat: currentChatI | null;
}

const initialState: initialStateI = {
  chatsList: [],
  currentChat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatSetMembers(state, action: { payload: memberI[] }) {
      if (state.currentChat) {
        state.currentChat.members = action.payload;
      }
    },
    chatSetMessages(state, action: { payload: messageI[] }) {
      if (state.currentChat) {
        state.currentChat.messages = action.payload;
      }
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
export const { chatSetMembers, chatSetMessages } = chatSlice.actions;

export const chatFetchChatsPartial = createAsyncThunk<
  { chats: chatsListPartialT[] },
  undefined,
  {}
>("chat/chatFetchChatsPartial", async (_, { dispatch }) => {
  const db = getDatabase();
  const dbRef = ref(db, `chats/chatsPartialInfo`);
  let chats: chatsListPartialT[] = [];
  await get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      chats = snapshot.val();
    }
  });

  return { chats };
});

export const chatFetchChat = createAsyncThunk<
  { chatDATA: currentChatI | null },
  { chatID: string },
  {}
>("chat/chatFetchChat", async ({ chatID }, { dispatch }) => {
  const db = getDatabase();
  const dbRef = ref(db, `chats/chatsFullInfo/${chatID}`);
  let chatDATA: currentChatI | null = null;
  await get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      chatDATA = snapshot.val();
    }
  });

  return { chatDATA: chatDATA };
});

export const chatSendMessage = createAsyncThunk<
  undefined,
  { chatID: string; messageDATA: messageI },
  {}
>("chat/chatSendMessage", async ({ chatID, messageDATA }, { dispatch }) => {
  const db = getDatabase();
  const dbRef = ref(db, `chats/chatsFullInfo/${chatID}/messages`);
  await push(dbRef, messageDATA);

  return undefined;
});

export const chatJoinGroup = createAsyncThunk<
  undefined,
  { chatID: string; newMemberDATA: memberI },
  {}
>("chat/chatJoinGroup", async ({ chatID, newMemberDATA }, { dispatch }) => {
  const db = getDatabase();
  const dbRef = ref(db, `chats/chatsFullInfo/${chatID}/members`);
  await update(dbRef, { [newMemberDATA.memberID]: newMemberDATA }).then(
    async () => {
      const dbRef = ref(db, `chats/chatsFullInfo/${chatID}/messages`);
      const announcement: messageI = {
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
    console.log(snapshot.val());
    if (snapshot.exists()) {
      console.log(snapshot.val());
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
