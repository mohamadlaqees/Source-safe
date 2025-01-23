/* eslint-disable react/prop-types */

import {
  openDropDownList,
  openGroup,
  openGroupInfo,
  refetchGroupFiles,
} from "../../store/Group/groupSlice";
import { useDispatch, useSelector } from "react-redux";
import DropDownList from "./DropDownList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEllipsisVertical,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { Button, CircularProgress } from "@mui/material";

import { clearSelections } from "../../store/File/fileSlice";
import {
  useCheckInFileMutation,
  useDownlaodFileMutation,
} from "../../store/Api/ApiSlice";
import { refetchUnreadNotifications } from "../../store/Notification/notificationSlice";
import { setSelectedUserID } from "../../store/LeftSide/leftSideSlice";
import Title from "../Title";

const GroupHeader = ({ groupName, numOfMember, users }) => {
  const dispatch = useDispatch();
  const { dropDownList, groupInfo } = useSelector((state) => state.group);
  const { selectedFiles } = useSelector((state) => state.file);
  const { isSmallScreen: isSS } = useSelector((state) => state.mode);
  const { mode } = useSelector((state) => state.mode);
  const owner = users.find((user) => user.id === groupInfo.created_by)?.[
    "user_name"
  ];
  const [
    checkInFile,
    {
      error: checkInFileError,
      isError: checkInFileIsError,
      isLoading: checkInFileLoading,
    },
  ] = useCheckInFileMutation();
  const [
    downlaodFile,
    {
      error: downloadFileError,
      isError: downloadFileIsError,
      isLoading: downloadFileLoading,
    },
  ] = useDownlaodFileMutation();

  const filesID = selectedFiles.map((file) => file.id);

  const reserveAndDownload = async () => {
    try {
      await checkInFile({
        filesIDs: filesID,
      });

      if (selectedFiles.length > 0) {
        selectedFiles.map(async (file) => {
          const response = await downlaodFile({ fileID: file.id }).unwrap();

          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(response); // Should be a valid blob here
          link.setAttribute("download", file.name); // Set the file name for the download

          // Append the link to the document and trigger the download
          document.body.appendChild(link);
          link.click();

          // Cleanup
          link.remove();
          window.URL.revokeObjectURL(link.href);
        });
      }
    } catch (error) {
      console.error("Download error:", error);
    }
    dispatch(clearSelections());
    dispatch(refetchGroupFiles({ refetchTheFiles: true }));
    dispatch(refetchUnreadNotifications({ refetchunreadNotifications: true }));
  };

  return (
    <>
      {selectedFiles.length > 0 ? (
        <div
          className={` ${
            mode === "dark" ? "bg-main" : "bg-light_main"
          } py-2  px-4 flex justify-between items-center w-full h-14`}
        >
          <Title
            title={
              "Choose a new file / Or check out the old file with it's same name"
            }
            placement={"top"}
            enterDelay={2000}
            leaveDelay={100}
          >
            <Button
              className="flex  gap-4 items-center px-6 py-2 cursor-pointer"
              variant="contained"
              disabled={checkInFileLoading}
              style={{
                color: `${mode === "dark" ? "#cbd5e1" : "white"}`,
                backgroundColor: `${mode === "dark" ? "#374151" : " #74b5e0"}`, // Set the background color
                fontSize: isSS < 400 ? "11px" : "",
              }}
              onClick={reserveAndDownload}
              startIcon={
                checkInFileLoading && (
                  <CircularProgress
                    size={20}
                    color={`${mode === "dark" ? "#cbd5e1" : "white"}`}
                  />
                )
              }
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
              Reserve and Download
            </Button>
          </Title>

          <Button
            className="flex gap-4 items-center px-6 py-2 cursor-pointer"
            variant="contained"
            disabled={checkInFileLoading}
            style={{
              color: `${mode === "dark" ? "#cbd5e1" : "white"}`,
              backgroundColor: `${mode === "dark" ? "#374151" : " #74b5e0"}`, // Set the background color
              fontSize: isSS < 400 ? "11px" : "",
            }}
            onClick={() => dispatch(clearSelections())}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div
          className={` cursor-pointer ${
            mode === "dark" ? "bg-main" : "bg-light_main"
          } py-2 px-4 flex justify-between items-center w-full h-14 `}
        >
          {isSS < 880 && (
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={`transition ${
                mode === "dark" ? "hover:text-white" : "hover:text-message"
              }  ${
                mode === "dark" ? "text-message" : "text-message_light"
              } mr-6 text-xl`}
              onClick={() => {
                dispatch(openGroup({ openGroup: false }));
                dispatch(setSelectedUserID({ selectedUserID: null }));
              }}
            />
          )}
          <div
            className={` flex-1`}
            onClick={() => {
              dispatch(openGroupInfo({ groupInfoTab: true }));
            }}
          >
            <h3
              className={`${
                mode === "dark" ? "text-white" : "text-text_light"
              } text-sm `}
            >
              {groupName}
            </h3>
            <span
              className={`${
                mode === "dark" ? "text-message" : "text-message_light"
              } text-sm`}
            >
              {numOfMember ? <>{numOfMember} member </> : " Members"}
            </span>
          </div>
          <Title
            title={"Show group info list"}
            placement={"right"}
            enterDelay={2000}
            leaveDelay={100}
          >
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className={` cursor-pointer text-xl ${
                mode === "dark" ? "hover:text-white" : "hover:text-message"
              }  transition-all py-2 px-4 ${
                dropDownList
                  ? `${
                      mode === "dark"
                        ? "bg-slate-600 text-white"
                        : "bg-fourth_light text-message"
                    }  rounded-full  `
                  : `
          ${mode === "dark" ? "text-message" : "text-message_light"}`
              }`}
              onClick={() => {
                dispatch(openDropDownList({ dropDownList: true }));
              }}
            />
          </Title>

          <DropDownList
            dropDownList={dropDownList}
            owner={owner}
            users={users}
          />
        </div>
      )}
    </>
  );
};

export default GroupHeader;
