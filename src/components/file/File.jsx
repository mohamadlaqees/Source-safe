/* eslint-disable react/prop-types */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleCheck,
  faDatabase,
  faEllipsisH,
  faFile,
  faFloppyDisk,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";

import dayjs from "dayjs";
import { refetchGroup, refetchGroupFiles } from "../../store/Group/groupSlice";
import {
  selectFile,
  setFileBackups,
  setFileBackupsLoading,
  setFileHistory,
  setFileHistoryLoading,
  setOpenFileBackups,
  setOpenFileReport,
} from "../../store/File/fileSlice";
import {
  useCheckInFileMutation,
  useDeleteFileMutation,
  useDownlaodFileMutation,
  useGetFileBackupsMutation,
  useGetFileHistoryMutation,
} from "../../store/Api/ApiSlice";
import { refetchUnreadNotifications } from "../../store/Notification/notificationSlice";
import Title from "../Title";

const StyledTableCell = styled(TableCell)(({ theme, mode }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: mode === "dark" ? theme.palette.common.black : "#cbd5e1",
    color:
      mode === "dark" ? theme.palette.common.white : theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const File = ({
  name,
  sender,
  status,
  id,
  reservedColor,
  createdAt,
  updatedAt,
  canRemove,
}) => {
  const { mode } = useSelector((state) => state.mode);
  const { selectedFiles } = useSelector((state) => state.file);
  const dispatch = useDispatch();
  const [rightList, setRightList] = useState(false);
  const [bgEllip, setBgEllip] = useState(false);
  const listRef = useRef();
  const isSelected = selectedFiles.find((file) => file.id === id);
  const isAnyFileSelected = selectedFiles.length > 0;

  const [
    deleteFile,
    {
      error: deleteFileError,
      isError: deleteFileISError,
      isLoading: deleteFileLoading,
    },
  ] = useDeleteFileMutation();
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
  const [
    getFileHistory,
    {
      error: getFileHistoryError,
      isError: getFileHistoryIsError,
      isLoading: getFileHistoryLoading,
    },
  ] = useGetFileHistoryMutation();
  const [
    getFileBackups,
    {
      error: getFileBackupsError,
      isError: getFileBackupsIsError,
      isLoading: getFileBackupsLoading,
    },
  ] = useGetFileBackupsMutation();

  const selectHandler = (id) => {
    dispatch(selectFile({ id, name }));
  };

  const removeHandler = async () => {
    try {
      await deleteFile({ file: id });
    } catch (error) {
      console.log(error);
    }
    dispatch(refetchGroupFiles({ refetchTheFiles: true }));
    dispatch(refetchGroup({ refetchGroupList: true }));
  };

  const reserveAndDownload = async () => {
    try {
      await checkInFile({
        filesIDs: [id],
      });
      const response = await downlaodFile({ fileID: id }).unwrap();

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(response); // Should be a valid blob here
      link.setAttribute("download", name); // Set the file name for the download

      // Append the link to the document and trigger the download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download error:", error);
    }

    setRightList(false);
    setBgEllip(false);
    dispatch(refetchGroupFiles({ refetchTheFiles: true }));
    dispatch(refetchGroup({ refetchGroupList: true }));
    dispatch(refetchUnreadNotifications({ refetchunreadNotifications: true }));
  };
  const clickReportHandler = async () => {
    dispatch(setOpenFileReport({ openFileReport: true }));
    setRightList(!rightList);
    setBgEllip(!bgEllip);
    try {
      const fileHistory = await getFileHistory({ fileID: id }).unwrap();
      dispatch(
        setFileHistory({
          fileHistory: fileHistory.data.map(
            ({ id, user, action, created_at }) => ({
              id,
              action,
              name: user.user_name,
              created_at,
            })
          ),
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const clickBackupHandler = async () => {
    dispatch(setOpenFileBackups({ openFileBackups: true }));
    setRightList(false);
    setBgEllip(false);
    try {
      const filebackups = await getFileBackups({ fileID: id }).unwrap();
      dispatch(
        setFileBackups({
          fileBackups: filebackups
            .filter(
              ({ operation_type }) =>
                operation_type === "before-in-check" ||
                operation_type === "after-out-check"
            )
            .map(
              ({
                id,
                backup_name,
                operation_type,
                created_at,
                backup_path,
              }) => ({
                id,
                name: backup_name,
                type: operation_type,
                created_at,
                path: backup_path,
              })
            ),
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setRightList(false);
        setBgEllip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(
      setFileHistoryLoading({ fileHistoryLoading: getFileHistoryLoading })
    );
  }, [dispatch, getFileHistoryLoading]);

  useEffect(() => {
    dispatch(
      setFileBackupsLoading({ fileBackupsLoading: getFileBackupsLoading })
    );
  }, [dispatch, getFileBackupsLoading]);

  const baseClass = `${reservedColor} w-full ${
    mode === "dark" ? "bg-main" : "bg-light_main"
  } px-4 py-4 rounded-lg mb-6 transition-all`;

  const selectedClass = isSelected
    ? mode === "dark"
      ? `!bg-[#546076] ${!reservedColor ? "cursor-pointer" : ""}`
      : `!bg-[#bbe2fc] ${!reservedColor ? "cursor-pointer" : ""}`
    : "";

  const hoverClass = isAnyFileSelected
    ? !reservedColor
      ? "cursor-pointer"
      : ""
    : "";

  const created_at = dayjs(createdAt).format("MMMM D, YYYY h:mm A");
  const updated_at = dayjs(updatedAt).format("MMMM D, YYYY h:mm A");

  return (
    <div
      className={`${baseClass} ${selectedClass} ${hoverClass}`}
      onClick={(event) => {
        if (!reservedColor) {
          if (
            (isSelected || isAnyFileSelected) &&
            !listRef.current.contains(event.target)
          ) {
            selectHandler(id);
          }
        }
      }}
    >
      <div className="  w-full flex justify-between  ">
        <div className={` items-center ml-4 w-64  transition-all   `}>
          {!reservedColor ? (
            isAnyFileSelected ? (
              isSelected ? (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={`${
                    mode === "dark" ? "text-[#56dbce]" : "text-[#4ab44a]"
                  } text-xl`}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCircle}
                  className={`${
                    mode === "dark" ? "text-[#2f343b]" : "text-[#4c92bf]"
                  } text-xl`}
                />
              )
            ) : null
          ) : (
            ""
          )}
        </div>
        <div className="items-center  mr-4 relative " ref={listRef}>
          <Title
            title={"Show the file actions"}
            placement={"left"}
            enterDelay={2000}
            leaveDelay={100}
          >
            <FontAwesomeIcon
              icon={faEllipsisH}
              className={` cursor-pointer text-xl 
         ${
           mode === "dark"
             ? !reservedColor
               ? "hover:text-white"
               : ""
             : !reservedColor
             ? "hover:text-message"
             : ""
         }  transition-all py-1.5 px-2  ${
                bgEllip
                  ? `${
                      mode === "dark"
                        ? "bg-slate-600 text-white"
                        : "bg-fourth_light text-message"
                    }  rounded-full  `
                  : `
              ${mode === "dark" ? "text-message" : "text-message_light"}`
              }`}
              onClick={() => {
                setRightList(!rightList);
                setBgEllip(!bgEllip);
              }}
            />
          </Title>

          <div
            className={` w-60 shadow-md ${
              rightList ? "opacity-1 scale-100" : "opacity-0 scale-75 hidden"
            } ${
              mode === "dark" ? "bg-main" : "bg-light_main"
            } py-3 absolute z-20 right-0 top-8 rounded-md transition-all transform origin-top-right `}
          >
            {!reservedColor && (
              <Title
                title={"Check in the file and download it to your device"}
                placement={"left"}
                enterDelay={2000}
                leaveDelay={100}
              >
                <button
                  className={`flex gap-4  items-center ${
                    mode === "dark" ? "text-white" : "text-text_light"
                  } px-6 py-2 ${
                    mode === "dark"
                      ? "hover:bg-gray-700"
                      : "hover:bg-fourth_light"
                  }  cursor-pointer 
            ${
              mode === "dark"
                ? checkInFileLoading || downloadFileLoading === true
                  ? "bg-gray-700"
                  : ""
                : checkInFileLoading || downloadFileLoading === true
                ? "bg-fourth_light"
                : ""
            } `}
                  disabled={checkInFileLoading || downloadFileLoading}
                  onClick={reserveAndDownload}
                >
                  <>
                    {checkInFileLoading || downloadFileLoading ? (
                      <LoadingButton
                        type="submit"
                        variant="text"
                        sx={{
                          color: `${
                            mode === "dark" ? "white" : "black"
                          } !important`,
                          "& .MuiCircularProgress-root": {
                            color: `${mode === "dark" ? "#64748b" : "#74b5e0"}`,
                          },
                        }}
                        loadingPosition="start"
                        loading
                      >
                        Reserve and Download
                      </LoadingButton>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faFloppyDisk} />
                        Reserve and Download
                      </>
                    )}
                  </>
                </button>
              </Title>
            )}
            <button
              className={`flex gap-4 items-center ${
                mode === "dark" ? "text-white" : "text-text_light"
              } px-6 py-2 ${
                mode === "dark" ? "hover:bg-gray-700" : "hover:bg-fourth_light"
              }  cursor-pointer 
           w-full`}
              onClick={clickReportHandler}
            >
              <FontAwesomeIcon icon={faFile} /> File report
            </button>
            {!reservedColor && (
              <button
                className={`flex gap-4 items-center ${
                  mode === "dark" ? "text-white" : "text-text_light"
                } px-6 py-2 ${
                  mode === "dark"
                    ? "hover:bg-gray-700"
                    : "hover:bg-fourth_light"
                }  cursor-pointer w-full`}
                onClick={clickBackupHandler}
              >
                <FontAwesomeIcon icon={faDatabase} /> View file backups
              </button>
            )}
            {!reservedColor && (
              <button
                className={`flex gap-4 items-center ${
                  mode === "dark" ? "text-white" : "text-text_light"
                }  px-6 py-2 ${
                  mode === "dark"
                    ? "hover:bg-gray-700"
                    : "hover:bg-fourth_light"
                }  cursor-pointer 
           w-full`}
                onClick={() => {
                  selectHandler(id);
                  setRightList(false);
                  setBgEllip(false);
                }}
              >
                <FontAwesomeIcon icon={faCircleCheck} />
                {!isSelected ? " Select" : "Clear selection"}
              </button>
            )}
            {!reservedColor && canRemove && (
              <button
                className={`flex gap-4 items-center text-[#ef4444]  px-6 py-2 ${
                  mode === "dark"
                    ? !deleteFileLoading
                      ? "hover:bg-gray-700"
                      : ""
                    : !deleteFileLoading
                    ? "hover:bg-fourth_light"
                    : ""
                }  cursor-pointer 
         w-full`}
                onClick={removeHandler}
                disabled={deleteFileLoading}
              >
                {deleteFileLoading ? (
                  <LoadingButton
                    type="submit"
                    variant="text"
                    sx={{
                      color: `${
                        mode === "dark" ? "white" : "black"
                      } !important`,
                      "& .MuiCircularProgress-root": {
                        color: "#ef4444",
                      },
                    }}
                    loadingPosition="start"
                    loading
                    startIcon={
                      <span style={{ width: "24px", height: "24px" }} />
                    }
                  >
                    Remove file
                  </LoadingButton>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-[#ef4444]"
                    />
                    Remove file
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      <TableContainer
        component={Paper}
        sx={{
          overflow: "auto",
          minWidth: "300px",
        }}
      >
        <Table aria-label="customized table" sx={{ tableLayout: "auto" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell mode={mode}>Name</StyledTableCell>
              <StyledTableCell mode={mode} align="right">
                Sender
              </StyledTableCell>
              <StyledTableCell mode={mode} align="right">
                Status
              </StyledTableCell>
              <StyledTableCell mode={mode} align="right">
                Created at
              </StyledTableCell>
              <StyledTableCell mode={mode} align="right">
                Updated at{" "}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow key={name}>
              <StyledTableCell component="th" scope="row">
                {name}
              </StyledTableCell>
              <StyledTableCell align="right">{sender}</StyledTableCell>
              <StyledTableCell align="right">{status}</StyledTableCell>
              <StyledTableCell align="right">{created_at}</StyledTableCell>
              <StyledTableCell align="right">{updated_at}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default File;
