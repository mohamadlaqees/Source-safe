/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { setOpenFileReport } from "../../store/File/fileSlice";
import LoadingSpinner from "../LoadingSpinner";

const FileReport = () => {
  const { openFileReport, fileHistory, fileHistoryLoading } = useSelector(
    (state) => state.file
  );
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const columns = [
    { field: "num", headerName: "NUM", width: 70, flex: 1 },
    { field: "action", headerName: "Action", width: 130, flex: 2 },
    { field: "userName", headerName: "UserName", width: 130, flex: 2 },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 90,
      flex: 2,
      valueGetter: (params) => new Date(params),
    },
  ];

  const rows = fileHistory.map(({ id, action, created_at, name }, index) => {
    const date = dayjs(created_at).format("MMMM D, YYYY h:mm A");

    return {
      id,
      num: index + 1,
      action,
      userName: name,
      date,
    };
  });

  const paginationModel = { page: 0, pageSize: 5 };

  const Backdrop = () => {
    return (
      <div
        className="absolute w-full h-full bg-black opacity-30 z-10"
        onClick={() => dispatch(setOpenFileReport({ openFileReport: false }))}
      />
    );
  };

  const Overlay = () => {
    return (
      <div
        className={` top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${
          mode === "dark" ? "bg-main" : "bg-light_main"
        } ${
          mode === "dark" ? "text-white" : "text-text_light"
        } absolute w-[90%] h-[90%] rounded-lg  z-20`}
      >
        <header className="flex justify-between  p-6">
          <h1 className="text-2xl">File Report</h1>
          <FontAwesomeIcon
            icon={faXmark}
            className={`${
              mode === "dark" ? "text-message" : "text-message_light"
            } cursor-pointer ${
              mode === "dark" ? "hover:text-white" : "hover:text-text_light"
            } text-2xl`}
            onClick={() => {
              dispatch(setOpenFileReport({ openFileReport: false }));
            }}
          />
        </header>

        {fileHistoryLoading ? (
          <LoadingSpinner spinnerColor={"#74b5e0"} />
        ) : (
          <Box
            mt="40px"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "none",
                height: "auto",
                minHeight: "50px",
              },

              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: mode === "dark" ? "#cccccc" : "#cbd5e1", // Background for grid content
                color: "black", // Text color for rows only
              },
              "& .MuiDataGrid-footerContainer": {
                color: "white !important", // Footer text color
                borderTop: "none",
              },
            }}
          >
            <Paper sx={{ height: "90%", width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
              />
            </Paper>
          </Box>
        )}
      </div>
    );
  };
  return (
    <>
      {openFileReport && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("backdrop-report-root")
          )}
          {ReactDOM.createPortal(
            <Overlay />,
            document.getElementById("overlay-report-root")
          )}
        </>
      )}
    </>
  );
};

export default FileReport;
