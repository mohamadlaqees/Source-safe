import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFiles: [],
  fileHistory: [],
  fileHistoryLoading: false,
  fileBackups: [],
  fileBackupsLoading: false,
  openFileReport: false,
  openFileBackups: false,
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    selectFile: (state, action) => {
      const id = action.payload.id;
      const existingFileIndex = state.selectedFiles.findIndex(
        (file) => file.id === id
      );

      if (existingFileIndex !== -1) {
        // File is already selected, remove it
        state.selectedFiles.splice(existingFileIndex, 1);
      } else {
        // File is not selected, add it
        state.selectedFiles.push({
          id,
          name: action.payload.name,
        });
      }
    },
    setOpenFileReport: (state, action) => {
      state.openFileReport = action.payload.openFileReport;
    },
    setFileHistory: (state, action) => {
      state.fileHistory = action.payload.fileHistory;
    },
    setFileHistoryLoading: (state, action) => {
      state.fileHistoryLoading = action.payload.fileHistoryLoading;
    },
    setOpenFileBackups: (state, action) => {
      state.openFileBackups = action.payload.openFileBackups;
    },
    setFileBackups: (state, action) => {
      state.fileBackups = action.payload.fileBackups;
    },
    setFileBackupsLoading: (state, action) => {
      state.fileBackupsLoading = action.payload.fileBackupsLoading;
    },

    clearSelections: (state) => {
      state.selectedFiles = [];
    },
  },
});

export const {
  selectFile,
  clearSelections,
  setOpenFileReport,
  setFileHistory,
  setFileHistoryLoading,
  setOpenFileBackups,
  setFileBackups,
  setFileBackupsLoading,
} = fileSlice.actions;
export default fileSlice.reducer;
