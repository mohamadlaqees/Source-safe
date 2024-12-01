import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFiles: [],
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    selectFile: (state, action) => {
      const fileId = action.payload;
      if (state.selectedFiles.includes(fileId)) {
        state.selectedFiles = state.selectedFiles.filter((id) => id !== fileId);
      } else {
        state.selectedFiles.push(fileId);
      }
    },
    clearSelections: (state) => {
      state.selectedFiles = [];
    },
  },
});

export const { selectFile, clearSelections } = fileSlice.actions;
export default fileSlice.reducer;
