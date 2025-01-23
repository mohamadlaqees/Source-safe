import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  smallWidth: null,
  closeLeftSide: false,
  allUsers: [],
  selectedUserID: null,
};

const leftSideSlice = createSlice({
  name: "leftSideSlice",
  initialState,
  reducers: {
    reduceTheSize: (state, action) => {
      state.smallWidth = action.payload.smallWidth;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload.allUsers;
    },
    setSelectedUserID: (state, action) => {
      state.selectedUserID = action.payload.selectedUserID;
    },
  },
});

export const { reduceTheSize, setAllUsers, setSelectedUserID } =
  leftSideSlice.actions;

export default leftSideSlice.reducer;
