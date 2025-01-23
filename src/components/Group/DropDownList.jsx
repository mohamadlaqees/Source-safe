/* eslint-disable react/prop-types */
import {
  faCircleExclamation,
  faDownload,
  faFile,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  openDropDownList,
  openGroup,
  openGroupInfo,
  refetchGroup,
} from "../../store/Group/groupSlice";
import ReactDOM from "react-dom";
import {
  useDeleteGroupMutation,
  useDownlaodFilesReportsMutation,
} from "../../store/Api/ApiSlice";
import { LoadingButton } from "@mui/lab";
import { setOpenUserReport } from "../../store/User/userSlice";

const DropDownList = ({ dropDownList, owner, users }) => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);
  const { ID } = useSelector((state) => state.group);
  const [deleteGroup, { isError, error, isLoading }] = useDeleteGroupMutation();
  const [
    downloadFilesReports,
    {
      isError: downlaodFilesReportsIsError,
      error: downlaodFilesReportsError,
      isLoading: downlaodFilesReportsIsLoading,
    },
  ] = useDownlaodFilesReportsMutation();

  const deleteHandler = async () => {
    try {
      await deleteGroup({ id: ID });
    } catch (error) {
      console.log(error);
    }
    dispatch(refetchGroup({ refetchGroupList: true }));
    dispatch(openGroup({ openGroup: false }));
    dispatch(openDropDownList({ dropDownList: false }));
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
        className="absolute w-full h-full  z-40 "
        onClick={() => {
          dispatch(openDropDownList({ dropDownList: false }));
        }}
      />
    );
  };

  const Overlay = () => {
    return (
      <div
        className={` py-3 absolute z-50 right-0 top-14 rounded-md transition-all transform origin-top-right shadow-md ${
          dropDownList ? "opacity-1 scale-100" : "opacity-0 scale-75 hidden  "
        } ${mode === "dark" ? "bg-main" : "bg-light_main"}  `}
      >
        <div
          className={`flex gap-4 items-center ${
            mode === "dark" ? "text-white" : "text-text_light"
          } px-6 py-2 ${
            mode === "dark" ? "hover:bg-gray-700" : "hover:bg-fourth_light"
          }  cursor-pointer`}
          onClick={() => {
            dispatch(openGroupInfo({ groupInfoTab: true }));
            dispatch(openDropDownList({ dropDownList: false }));
          }}
        >
          <FontAwesomeIcon icon={faCircleExclamation} /> View group info
        </div>
        <div
          className={`flex gap-4 items-center ${
            mode === "dark" ? "text-white" : "text-text_light"
          } px-6 py-2 ${
            mode === "dark" ? "hover:bg-gray-700" : "hover:bg-fourth_light"
          }  cursor-pointer`}
          onClick={() => {
            downloadFilesReportsHandler();
          }}
        >
          {downlaodFilesReportsIsLoading ? (
            <LoadingButton
              type="submit"
              variant="text"
              sx={{
                color: `${mode === "dark" ? "white" : "black"} !important`,
                "& .MuiCircularProgress-root": {
                  color: `${mode === "dark" ? "#64748b" : "#74b5e0"} `,
                },
              }}
              loadingPosition="start"
              loading
              startIcon={<span style={{ width: "24px", height: "24px" }} />}
            >
              Export files reports
            </LoadingButton>
          ) : (
            <>
              <FontAwesomeIcon icon={faDownload} /> Export files reports
            </>
          )}
        </div>
        {/* <div
          className={`flex gap-4 items-center ${
            mode === "dark" ? "text-white" : "text-text_light"
          } px-6 py-2 ${
            mode === "dark" ? "hover:bg-gray-700" : "hover:bg-fourth_light"
          }  cursor-pointer`}
          onClick={() => {
            dispatch(setOpenUserReport({ openUserReport: true }));
            dispatch(openDropDownList({ dropDownList: false }));
          }}
        >
          <FontAwesomeIcon icon={faFile} /> View group users reports
        </div> */}
        {localStorage.getItem("userName") === owner && (
          <div
            className={`flex gap-4 items-center text-red-500 px-5 py-2 ${
              mode === "dark" ? "hover:bg-gray-700" : "hover:bg-fourth_light"
            }  cursor-pointer`}
            onClick={deleteHandler}
          >
            {isLoading ? (
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
                Leave and delete
              </LoadingButton>
            ) : (
              <>
                <FontAwesomeIcon icon={faTrash} />
                Leave and delete
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {dropDownList && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("list-backdrop-root")
          )}
          {ReactDOM.createPortal(
            <Overlay />,
            document.getElementById("list-overlay-root")
          )}
        </>
      )}
    </>
  );
};

export default DropDownList;
