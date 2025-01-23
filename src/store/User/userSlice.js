import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openUserReport: false,
  openSystemUserReport: false,
  systemUsersReports: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setOpenUserReport: (state, action) => {
      state.openUserReport = action.payload.openUserReport;
    },
    setOpenSystemUserReport: (state, action) => {
      state.openSystemUserReport = action.payload.openSystemUserReport;
    },
    setSystemUsersReports: (state, action) => {
      state.systemUsersReports = action.payload.systemUsersReports;
    },
  },
});

export const {
  setOpenUserReport,
  setOpenSystemUserReport,
  setSystemUsersReports,
} = userSlice.actions;
export default userSlice.reducer;
