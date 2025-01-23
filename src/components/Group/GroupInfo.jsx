/* eslint-disable react/prop-types */
import {
  faDownload,
  faUserGroup,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addMembersFromGroup,
  deleteAction,
  openGroupInfo,
  openGroupMembers,
  setRemovedUserInfo,
} from "../../store/Group/groupSlice";
import User from "../user/User";
import GroupList from "../GroupList";
import Title from "../Title";
import { LoadingButton } from "@mui/lab";
import { useDownlaodFilesReportsMutation } from "../../store/Api/ApiSlice";

const GroupInfo = ({ users }) => {
  const { groupInfoTab, groupMembers, allGroupMembers, groupInfo } =
    useSelector((state) => state.group);
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);
  const [
    downloadFilesReports,
    {
      isError: downlaodFilesReportsIsError,
      error: downlaodFilesReportsError,
      isLoading: downlaodFilesReportsIsLoading,
    },
  ] = useDownlaodFilesReportsMutation();

  const destGroupMembers = allGroupMembers.map((data) => data.user);
  const owner = users.find((user) => user.id === groupInfo.created_by)?.[
    "user_name"
  ];

  const deletePermissionHandler = (removedUserName, removedUserID) => {
    dispatch(deleteAction({ deletePrompt: true }));
    dispatch(setRemovedUserInfo({ removedUserName, removedUserID }));
  };

  const downloadFilesReportsHandler = async () => {
    try {
      // Call the API to download the file
      const response = await downloadFilesReports();

      // Access the Blob correctly from the `data` property
      const fileBlob = response?.data;

      // Check if the extracted data is a valid Blob
      if (!(fileBlob instanceof Blob)) {
        throw new Error("Received data is not a valid Blob.");
      }

      // Proceed to download
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(fileBlob);
      link.href = url;
      link.setAttribute("download", "file-history-report.pdf"); // Set the file name

      // Append link, trigger download, and clean up
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error during file download:", error);
    }
  };

  const Backdrop = () => {
    return (
      <div
        className="absolute w-full h-full bg-black opacity-30 z-10"
        onClick={() => {
          dispatch(openGroupInfo({ groupInfoTab: false }));
        }}
      />
    );
  };

  const Overlay = () => {
    return (
      <>
        {groupMembers && (
          <div
            className={`absolute  w-[349px] aboveMobile:w-96 ${
              destGroupMembers.length > 0 ? "h-96" : "h-72"
            } top-[5%] left-1/2 -translate-x-1/2  rounded-lg bg-black opacity-30 z-30`}
          />
        )}
        <div
          className={` absolute  w-[349px] aboveMobile:w-96 ${
            destGroupMembers.length > 0 ? "h-96" : "h-[350px]"
          } top-[5%] left-1/2 -translate-x-1/2  rounded-lg ${
            mode === "dark" ? "text-white" : "text-text_light"
          } z-20 ${mode === "dark" ? "bg-main" : "bg-light_main"}  ${
            destGroupMembers.length > 0
              ? "scrollbar-thin overflow-y-scroll "
              : ""
          } ${
            destGroupMembers.length > 0
              ? mode === "dark"
                ? "scrollbar-thumb-gray-700 scrollbar-track-gray-500"
                : "scrollbar-thumb-slate-300 scrollbar-track-slate-100   "
              : ""
          }  `}
        >
          <header className="flex justify-between  p-6">
            <h1>Group Info</h1>
            <FontAwesomeIcon
              icon={faXmark}
              className={`${
                mode === "dark" ? "text-message" : "text-message_light"
              } cursor-pointer hover:${
                mode === "dark" ? "text-white" : "text-text_light"
              } text-2xl`}
              onClick={() => {
                dispatch(openGroupInfo({ groupInfoTab: false }));
              }}
            />
          </header>
          <User
            name={`${groupInfo.name_folder}`}
            member={`${groupInfo.numOfMember + 1} member`}
            padding={"px-6"}
            circle={"w-16 h-16"}
            margin={"my-6"}
            circleBG={`${
              mode === "dark" ? "bg-secondary" : "bg-light_secondary"
            }`}
          />
          <div
            className={`border-4 ${
              mode === "dark" ? " border-slate-700" : "border-slate-100"
            } `}
          />
          <div className="flex justify-between items-center p-6">
            <div
              className={`${
                mode === "dark" ? "text-white" : "text-text_light"
              } flex items-center gap-8 `}
            >
              <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4 " />
              {groupInfo.numOfMember + 1} MEMBER
            </div>

            <div className="flex gap-2">
              <Title
                title={"Export files reports"}
                placement={"top"}
                enterDelay={2000}
                leaveDelay={100}
              >
                {downlaodFilesReportsIsLoading ? (
                  <LoadingButton
                    type="submit"
                    variant="text"
                    sx={{
                      color: `${
                        mode === "dark" ? "white" : "black"
                      } !important`,
                      "& .MuiCircularProgress-root": {
                        color: `${mode === "dark" ? "#64748b" : "#74b5e0"} `,
                      },
                    }}
                    loadingPosition="end"
                    loading
                  />
                ) : (
                  <FontAwesomeIcon
                    className={`${
                      mode === "dark" ? "text-white" : "text-text_light"
                    } cursor-pointer w-4 h-4`}
                    icon={faDownload}
                    onClick={() => {
                      downloadFilesReportsHandler();
                    }}
                  />
                )}
              </Title>
              {localStorage.getItem("userName") === owner && (
                <Title
                  title={"Add another members"}
                  placement={"top"}
                  enterDelay={2000}
                  leaveDelay={100}
                >
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className={`${
                      mode === "dark" ? "text-white" : "text-text_light"
                    } cursor-pointer w-4 h-4`}
                    onClick={() => {
                      dispatch(openGroupMembers({ groupMembers: true }));
                      dispatch(
                        addMembersFromGroup({ addMembersFromGroup: true })
                      );
                    }}
                  />
                </Title>
              )}
            </div>
          </div>
          <User
            name={owner}
            padding={"p-4"}
            item={"items-center"}
            circle={"w-12 h-12"}
            circleBG={`${
              mode === "dark" ? "bg-secondary" : "bg-light_secondary"
            }`}
            theOwner={owner}
          />
          <GroupList
            data={destGroupMembers}
            circle={"w-12 h-12"}
            circleBG={`${
              mode === "dark" ? "bg-secondary" : "bg-light_secondary"
            }`}
            padding={"p-4"}
            item={"items-center"}
            owner={owner}
            openTheGroup={false}
            groupMembers={true}
            deletePermissionHandler={deletePermissionHandler}
            hiddenEmpty={true}
            isActive={false}
          />{" "}
        </div>
      </>
    );
  };
  return (
    <>
      {groupInfoTab && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("backdrop-root")
          )}
          {ReactDOM.createPortal(
            <Overlay />,
            document.getElementById("overlay-root")
          )}
        </>
      )}
    </>
  );
};

export default GroupInfo;
