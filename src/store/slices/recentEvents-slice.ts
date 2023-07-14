import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, getDatabase, ref } from "firebase/database";
import { pendingUpdateQueueDown, pendingUpdateQueueUp } from "./pending-slice";
import { addAlert } from "./alert-slice";

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
    dispatch(pendingUpdateQueueUp());

    try {
      const db = getDatabase();
      const dbRef = ref(db, `recentEVENTS/eventsDATA`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        dispatch(setEventsDATA(Object.values(snapshot.val())));
      }
    } catch (error) {
      dispatch(
        addAlert({
          alertText: "Fetching events failed!",
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
