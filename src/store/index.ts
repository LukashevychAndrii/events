import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user-slice";
import chatSlice from "./slices/chat-slice";
import calendarSlice from "./slices/calendar-slice";
import recentEventsSlice from "./slices/recentEvents-slice";
import pendingSlice from "./slices/pending-slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
    calendar: calendarSlice,
    recentEvents: recentEventsSlice,
    pending: pendingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
