import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerOpen: false,
  overlay: false,
};

const drawerSlice = createSlice({
  name: "drawerSlice",
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.drawerOpen = action.payload.drawerOpen;
    },
    openOverLay: (state, action) => {
      state.overlay = action.payload.overlay;
    },
  },
});

export default drawerSlice.reducer;
export const { openDrawer, openOverLay} = drawerSlice.actions;
