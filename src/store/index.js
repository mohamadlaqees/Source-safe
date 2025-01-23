import { configureStore } from "@reduxjs/toolkit";
import drawerSlice from "./Drawer/drawerSlice";
import groupSlice from "./Group/groupSlice";
import leftSideSlice from "./LeftSide/leftSideSlice";
import UISlice from "./UI/UISlice";
import fileSlice from "./File/fileSlice";
import userSlice from "./User/userSlice";
import notificationSlice from "./Notification/notificationSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./Api/ApiSlice";

const store = configureStore({
  reducer: {
    drawer: drawerSlice,
    group: groupSlice,
    side: leftSideSlice,
    mode: UISlice,
    file: fileSlice,
    user: userSlice,
    notification: notificationSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
setupListeners(store.dispatch);

export default store;
