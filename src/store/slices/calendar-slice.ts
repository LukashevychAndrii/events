import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, getDatabase, ref, set } from "firebase/database";
import { pendingUpdateQueueDown, pendingUpdateQueueUp } from "./pending-slice";

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
  dispatch(pendingUpdateQueueUp());
  try {
    const db = getDatabase();
    const dbRef = ref(db, `calendar/${month}/${day}`);

    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      dispatch(setEvents(Object.values(snapshot.val())));
    } else {
      dispatch(setEvents([]));
    }
  } catch (error) {
    // ! Handle the error here if needed
    console.log(error);
  } finally {
    dispatch(pendingUpdateQueueDown());
  }

  return undefined;
});

export default calendarSlice.reducer;
