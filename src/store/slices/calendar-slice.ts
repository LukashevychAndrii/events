import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, getDatabase, ref, set } from "firebase/database";

export interface eventI {
  name: string;
  photo: string;
  time: string;
}

interface initialStateI {
  events: eventI[];
}

const initialState: initialStateI = {
  events: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setEvents(state, action: { payload: eventI[] }) {
      state.events = action.payload;
    },
  },
});

export const { setEvents } = calendarSlice.actions;

export const calendarFetchEvents = createAsyncThunk<
  undefined,
  { month: string; day: string },
  {}
>("calendar/calendarFetchWeek", async ({ month, day }, { dispatch }) => {
  const db = getDatabase();
  const dbRef = ref(db, `calendar/${month}/${day}`);

  await get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      dispatch(setEvents(Object.values(snapshot.val())));
    } else {
      dispatch(setEvents([]));
    }
  });

  return undefined;
});

export default calendarSlice.reducer;
