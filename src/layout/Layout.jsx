import { useDispatch, useSelector } from "react-redux";
import Drawer from "../components/layout/Drawer";
import NewGroup from "../components/Group/NewGroup";
import LeftSidebar from "../components/layout/LeftSidebar";
import Notifications from "../components/notification/Notifications";
import RightSidebar from "../components/layout/RightSidebar";
import {
  useGetUnreadNotificationsQuery,
  useGetUsersQuery,
} from "../store/Api/ApiSlice";
import { useEffect } from "react";
import {
  refetchUnreadNotifications,
  setunreadNotificationsIDs,
} from "../store/Notification/notificationSlice";
import { setIsSmallScreen } from "../store/UI/UISlice";
import { setAllUsers } from "../store/LeftSide/leftSideSlice";
import SystemUsersReports from "../components/user/SystemUsersReports";

const Layout = () => {
  const { notifications, refetchunreadNotifications: refetchAll } = useSelector(
    (state) => state.notification
  );
  const { openGroup } = useSelector((state) => state.group);
  const { isSmallScreen: isSS } = useSelector((state) => state.mode);

  const { drawerOpen, backdrop } = useSelector((state) => state.drawer);
  const { openSystemUserReport } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    data: unreadNotifications,
    error: GetUnreadNotificationsError,
    isError: GetUnreadNotificationsIsError,
    isLoading: GetUnreadNotificationsIsLoading,
    refetch,
  } = useGetUnreadNotificationsQuery();

  const { data: users } = useGetUsersQuery();

  useEffect(() => {
    if (refetchAll) {
      refetch();
      dispatch(
        refetchUnreadNotifications({ refetchunreadNotifications: false })
      );
    }

    const unreadIDs = unreadNotifications?.data.map((unread) => unread.id);

    dispatch(
      setunreadNotificationsIDs({
        unreadNotificationsIDs: unreadIDs,
      })
    );
  }, [dispatch, refetch, refetchAll, unreadNotifications]);

  useEffect(() => {
    dispatch(setAllUsers({ allUsers: users?.["the users"] }));
  }, [dispatch, users]);

  useEffect(() => {
    const updateScreenSize = () => {
      dispatch(setIsSmallScreen({ isSmallScreen: window.innerWidth }));
    };

    window.addEventListener("resize", updateScreenSize);
    updateScreenSize(); // Initial check

    return () => window.removeEventListener("resize", updateScreenSize);
  }, [dispatch]);

  useEffect(() => {
    dispatch(setAllUsers({ allUsers: users?.["the users"] }));
  }, [dispatch, users]);

  return (
    <div className="flex justify-between ">
      {openSystemUserReport && <SystemUsersReports />}
      {notifications && <Notifications />}
      <NewGroup />
      {drawerOpen && backdrop && <Drawer />}
      {isSS < 880 ? (
        openGroup ? (
          <RightSidebar />
        ) : (
          <LeftSidebar />
        )
      ) : (
        <>
          <LeftSidebar />
          <RightSidebar />
        </>
      )}
    </div>
  );
};

export default Layout;
