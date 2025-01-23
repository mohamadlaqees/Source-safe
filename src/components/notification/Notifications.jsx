import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import Notification from "./Notification";
import {
  openNotifications,
  setAllNotifications,
  setunreadNotificationsIDs,
} from "../../store/Notification/notificationSlice";
import { openBackdrop } from "../../store/Drawer/drawerSlice";
import { useGetNotificationsQuery } from "../../store/Api/ApiSlice";
import LoadingSpinner from "../LoadingSpinner";

const Notifications = () => {
  const { notifications, allNotifications, unreadNotificationsIDs } =
    useSelector((state) => state.notification);
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  const {
    data: allNotificationsData,
    error: GetNotificationsError,
    isError: GetNotificationsIsError,
    isLoading: GetNotificationsIsLoading,
    refetch,
  } = useGetNotificationsQuery();

  const readedIDs = allNotifications?.map((readed) => readed.id);
  const unreadNotificationID = readedIDs?.filter((readed) =>
    unreadNotificationsIDs?.some((unreaded) => readed === unreaded)
  );

  useEffect(() => {
    refetch();

    const notificationsInfo = allNotificationsData?.data.map(
      ({ created_at, id, read_at, data }) => {
        return {
          id,
          fileName: data.file_name,
          userName: data.name,
          action: data.message,
          created_at,
          read_at,
        };
      }
    );
    dispatch(setAllNotifications({ allNotifications: notificationsInfo }));
  }, [dispatch, allNotificationsData, refetch]);

  const Backdrop = () => {
    return (
      <div
        className="absolute w-full h-full  bg-black opacity-30 z-30"
        onClick={() => {
          dispatch(openNotifications({ notifications: false }));
          dispatch(openBackdrop({ backdrop: false }));
          dispatch(
            setunreadNotificationsIDs({
              unreadNotificationsIDs: null,
            })
          );
        }}
      />
    );
  };

  const Overlay = () => {
    return (
      <div
        className={`absolute w-[349px] aboveMobile:w-[400px] h-[400px]  top-1/3 left-1/2 -translate-x-1/2 -translate-y-[60px]  aboveMobile:-translate-y-1/2  rounded-lg  group overflow-hidden ${
          mode === "dark" ? "text-white" : "text-text_light"
        } z-40 
            ${mode === "dark" ? "bg-main" : "bg-light_main"} `}
      >
        <header className="flex justify-between  p-6">
          <h1 className="text-xl aboveMobile:text-2xl">Notifications</h1>
          <FontAwesomeIcon
            icon={faXmark}
            className={`${
              mode === "dark" ? "text-message" : "text-message_light"
            } cursor-pointer ${
              mode === "dark" ? "hover:text-white" : "hover:text-text_light"
            } text-2xl`}
            onClick={() => {
              dispatch(openNotifications({ notifications: false }));
              dispatch(openBackdrop({ backdrop: false }));
              dispatch(
                setunreadNotificationsIDs({
                  unreadNotificationsIDs: null,
                })
              );
            }}
          />
        </header>

        {GetNotificationsIsLoading ? (
          <LoadingSpinner spinnerColor={"#74b5e0"} />
        ) : allNotifications?.length === 0 ? (
          <p
            className={`${
              mode === "dark" ? "text-white" : "text-text_light"
            } h-[80%] font-bold flex flex-1 justify-center items-center`}
          >
            Empty
          </p>
        ) : (
          <div
            className={` overflow-hidden h-[80%]
          group-hover:overflow-y-scroll scrollbar-thin ${
            mode === "dark"
              ? "scrollbar-thumb-gray-700 scrollbar-track-gray-500"
              : "scrollbar-thumb-slate-300 scrollbar-track-slate-100"
          }  `}
          >
            {allNotifications?.map(
              ({ id, fileName, userName, action, created_at, read_at }) => {
                return (
                  <>
                    <Notification
                      key={id}
                      action={action}
                      fileName={fileName}
                      userName={userName}
                      created_at={created_at}
                      read_at={read_at}
                      unread={unreadNotificationID[0] === id ? true : false}
                    />
                    <div
                      className={`border-2 ${
                        mode === "dark"
                          ? " border-slate-700"
                          : "border-slate-100"
                      } `}
                    />
                  </>
                );
              }
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {notifications && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("notifications-backdrop-root")
          )}
          {ReactDOM.createPortal(
            <Overlay />,
            document.getElementById("notifications-overlay-root")
          )}
        </>
      )}
    </>
  );
};

export default Notifications;
