import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("mode") || "dark",
};

const UISlice = createSlice({
  name: "UISlice",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload.mode;
      localStorage.setItem("mode", state.mode);
    },
  },
});

export const { changeMode } = UISlice.actions;

export default UISlice.reducer;
