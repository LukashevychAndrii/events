import { createSlice } from "@reduxjs/toolkit";

interface initialStateI {
  pendingQueue: 0;
}

const initialState: initialStateI = {
  pendingQueue: 0,
};

const pendingSlice = createSlice({
  name: "pending",
  initialState,
  reducers: {
    pendingUpdateQueueUp(state) {
      state.pendingQueue += 1;
    },
    pendingUpdateQueueDown(state) {
      state.pendingQueue -= 1;
    },
  },
});

export const { pendingUpdateQueueUp, pendingUpdateQueueDown } =
  pendingSlice.actions;
export default pendingSlice.reducer;
