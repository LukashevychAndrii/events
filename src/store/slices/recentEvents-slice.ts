import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, getDatabase, ref } from "firebase/database";

export interface eventDATAI {
  date: string;
  name: string;
  photo: string;
}

interface initialStateI {
  eventsDATA: eventDATAI[];
}
const initialState: initialStateI = {
  eventsDATA: [],
};

const recentEventsSlice = createSlice({
  name: "recentEvents",
  initialState,
  reducers: {
    setEventsDATA(state, action: { payload: eventDATAI[] }) {
      state.eventsDATA = action.payload;
    },
  },
});
export default recentEventsSlice.reducer;
export const { setEventsDATA } = recentEventsSlice.actions;

export const recentEventsFetch = createAsyncThunk<undefined, undefined, {}>(
  "recentEvents/recentEventsFetch",
  async (_, { dispatch }) => {
    const db = getDatabase();
    const dbRef = ref(db, `recentEVENTS/eventsDATA`);
    await get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        dispatch(setEventsDATA(Object.values(snapshot.val())));
      }
    });
    return undefined;
  }
);
