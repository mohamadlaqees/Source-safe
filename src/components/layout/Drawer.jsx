import {
  faArrowRightFromBracket,
  faBell,
  faFile,
  faMoon,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import { openBackdrop, openDrawer } from "../../store/Drawer/drawerSlice";
import { openGroup, openNewGroup } from "../../store/Group/groupSlice";
import { changeMode } from "../../store/UI/UISlice";
import { useLogoutMutation } from "../../store/Api/ApiSlice";
import {
  openNotifications,
  setunreadNotificationsIDs,
} from "../../store/Notification/notificationSlice";
import Title from "../Title";
import { setOpenSystemUserReport } from "../../store/User/userSlice";
const Drawer = () => {
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const { mode } = useSelector((state) => state.mode);
  const { drawerOpen, backdrop } = useSelector((state) => state.drawer);
  const { unreadNotificationsIDs } = useSelector((state) => state.notification);

  const [checked, setChecked] = useState(mode === "dark" ? true : false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    dispatch(changeMode({ mode: `${mode === "dark" ? "light" : "dark"}` }));
  };

  return (
    <div>
      <div
        className={`absolute top-0 left-0 z-20 w-screen h-screen bg-black transition-opacity duration-300 ${
          backdrop
            ? "opacity-30 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          dispatch(openDrawer({ drawerOpen: false }));
          dispatch(openBackdrop({ backdrop: false }));
        }}
      />
      <div
        className={`absolute top-0 left-0 z-30 h-full transition-transform duration-300 transform ${
          mode === "dark" ? "bg-main" : "bg-light_main"
        }  ${drawerOpen ? "translate-x-0 " : "-translate-x-full "} w-72`}
      >
        <div className="p-4 ">
          <div
            className={`w-14 h-14 ${
              mode === "dark" ? "bg-secondary" : "bg-light_secondary"
            } rounded-full flex justify-center items-center text-white font-bold`}
          >
            {localStorage.getItem("userName")?.charAt(0)}
          </div>
          <h1
            className={`${
              mode === "dark" ? "text-white" : "text-text_light"
            } font-normal mt-4`}
          >
            {localStorage.getItem("userName")}{" "}
          </h1>
        </div>
        <span className="border border-fourth_light flex my-4"></span>

        <section>
          <Title
            title={"Show your notifications"}
            placement={"right"}
            enterDelay={2000}
            leaveDelay={100}
          >
            <div
              className={`relative flex gap-4 items-center cursor-pointer ${
                mode === "dark" ? "hover:bg-gray-700 " : "hover:bg-fourth_light"
              }   p-4`}
              onClick={() => {
                dispatch(openDrawer({ drawerOpen: false }));
                dispatch(openBackdrop({ backdrop: false }));
                dispatch(openNotifications({ notifications: true }));
              }}
            >
              <FontAwesomeIcon
                icon={faBell}
                className={`${
                  mode === "dark" ? "text-white" : "text-text_light"
                }`}
              />
              <span
                className={`${
                  unreadNotificationsIDs?.length > 0 ? "block" : "hidden"
                } absolute top-2 left-2 w-2 h-2 rounded-full ${
                  mode === "dark" ? "bg-[white]" : "bg-[#74b5e0]"
                }`}
              />

              <p
                className={`${
                  mode === "dark" ? "text-white" : "text-text_light"
                } `}
              >
                Notifications
              </p>
            </div>
          </Title>
          <Title
            title={"Create new group"}
            placement={"right"}
            enterDelay={2000}
            leaveDelay={100}
          >
            <div
              className={`flex gap-4 items-center cursor-pointer ${
                mode === "dark" ? "hover:bg-gray-700 " : "hover:bg-fourth_light"
              }   p-4`}
              onClick={() => {
                dispatch(openDrawer({ drawerOpen: false }));
                dispatch(openNewGroup({ newGroup: true }));
              }}
            >
              <FontAwesomeIcon
                icon={faUserGroup}
                className={`${
                  mode === "dark" ? "text-white" : "text-text_light"
                }`}
              />
              <p
                className={`${
                  mode === "dark" ? "text-white" : "text-text_light"
                } `}
              >
                New Group
              </p>
            </div>
          </Title>

          <Title
            title={"Create new group"}
            placement={"right"}
            enterDelay={2000}
            leaveDelay={100}
          >
            <div
              className={`flex gap-4 items-center cursor-pointer ${
                mode === "dark" ? "hover:bg-gray-700 " : "hover:bg-fourth_light"
              }   p-4`}
              onClick={() => {
                dispatch(openDrawer({ drawerOpen: false }));
                dispatch(
                  setOpenSystemUserReport({ openSystemUserReport: true })
                );
              }}
            >
              <FontAwesomeIcon
                icon={faFile}
                className={`${
                  mode === "dark" ? "text-white" : "text-text_light"
                }`}
              />
              <p
                className={`${
                  mode === "dark" ? "text-white" : "text-text_light"
                } `}
              >
                Users reports
              </p>
            </div>
          </Title>

          <Title
            title={"Change the app mode"}
            placement={"right"}
            enterDelay={2000}
            leaveDelay={100}
          >
            <div
              onClick={() => {
                setChecked(!checked);
                dispatch(
                  changeMode({ mode: `${mode === "dark" ? "light" : "dark"}` })
                );
              }}
              className={`flex gap-4 items-center cursor-pointer ${
                mode === "dark" ? "hover:bg-gray-700 " : "hover:bg-fourth_light"
              }   p-4`}
            >
              <FontAwesomeIcon
                icon={faMoon}
                className={`${
                  mode === "dark" ? "text-white" : "text-text_light"
                }`}
              />
              <p
                className={`${
                  mode === "dark" ? "text-white" : "text-text_light"
                }  w-full flex items-center justify-between `}
              >
                Night mode{" "}
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  color="primary"
                />
              </p>
            </div>
          </Title>
        </section>

        {isLoading ? (
          <div
            className="flex gap-4 items-center cursor-pointer w-full p-4"
            style={{
              color: `${mode === "dark" ? "white" : "black"}`,
              pointerEvents: "none",
            }}
          >
            <LoadingButton
              type="submit"
              variant="text"
              sx={{
                color: `${mode === "dark" ? "white" : "black"} !important`,
                "& .MuiCircularProgress-root": {
                  color: "#ef4444",
                },
              }}
              loadingPosition="start"
              loading
              startIcon={<span style={{ width: "24px", height: "24px" }} />}
            >
              Log out
            </LoadingButton>
          </div>
        ) : (
          <button
            className={`flex gap-4 items-center cursor-pointer w-full ${
              mode === "dark" ? "hover:bg-gray-700 " : "hover:bg-fourth_light"
            } p-4`}
            onClick={async () => {
              try {
                await logout();
                localStorage.removeItem("token");
                localStorage.removeItem("mode");
                localStorage.removeItem("userName");
                localStorage.removeItem("id");
                dispatch(openDrawer({ drawerOpen: false }));
                dispatch(openBackdrop({ backdrop: false }));
                dispatch(openGroup({ openGroup: false }));
                dispatch(
                  setunreadNotificationsIDs({
                    unreadNotificationsIDs: null,
                  })
                );
                navigate("login");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="text-red-500"
            />
            <span
              className={`${
                mode === "dark" ? "text-white" : "text-text_light"
              } flex gap-4 items-center`}
            >
              Logout
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Drawer;
