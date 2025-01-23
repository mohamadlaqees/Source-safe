import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: false,
  allNotifications: [],
  unreadNotificationsIDs: null,
  refetchunreadNotifications: false,
};

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    openNotifications: (state, action) => {
      state.notifications = action.payload.notifications;
    },
    setAllNotifications: (state, action) => {
      state.allNotifications = action.payload.allNotifications;
    },
    setunreadNotificationsIDs: (state, action) => {
      state.unreadNotificationsIDs = action.payload.unreadNotificationsIDs;
    },
    refetchUnreadNotifications: (state, action) => {
      state.refetchunreadNotifications =
        action.payload.refetchunreadNotifications;
    },
  },
});

export const {
  openNotifications,
  setAllNotifications,
  setunreadNotificationsIDs,
  refetchUnreadNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
