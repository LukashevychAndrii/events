import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface errorI {
  alertType: "error" | "success";
  alertText: string;
  alertTitle: string;
}

interface initialStateI {
  alertQueue: errorI[];
}

const initialState: initialStateI = {
  alertQueue: [],
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<errorI>) => {
      state.alertQueue.push(action.payload);
    },
    removeAlert: (state) => {
      state.alertQueue.shift();
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
