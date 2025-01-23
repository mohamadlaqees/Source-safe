import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("mode") || "dark",
  isSmallScreen: null,
};

const UISlice = createSlice({
  name: "UISlice",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload.mode;
      localStorage.setItem("mode", state.mode);
    },
    setIsSmallScreen: (state, action) => {
      state.isSmallScreen = action.payload.isSmallScreen;
    },
  },
});

export const { changeMode, setIsSmallScreen } = UISlice.actions;

export default UISlice.reducer;
