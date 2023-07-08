import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user-slice";
import chatSlice from "./slices/chat-slice";
import calendarSlice from "./slices/calendar-slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
    calendar: calendarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
