import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  smallWidth: null,
  closeLeftSide: false,
};

const leftSideSlice = createSlice({
  name: "leftSideSlice",
  initialState,
  reducers: {
    reduceTheSize: (state, action) => {
      state.smallWidth = action.payload.smallWidth;
    },
  },
});

export const { reduceTheSize } = leftSideSlice.actions;

export default leftSideSlice.reducer;
