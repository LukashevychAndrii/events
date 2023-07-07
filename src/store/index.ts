import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user-slice";
import chatSlice from "./slices/chat-slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
