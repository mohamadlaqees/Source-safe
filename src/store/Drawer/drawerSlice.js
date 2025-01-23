import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerOpen: false,
  backdrop: false,
};

const drawerSlice = createSlice({
  name: "drawerSlice",
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.drawerOpen = action.payload.drawerOpen;
    },
    openBackdrop: (state, action) => {
      state.backdrop = action.payload.backdrop;
    },
  },
});

export default drawerSlice.reducer;
export const { openDrawer, openBackdrop } = drawerSlice.actions;
