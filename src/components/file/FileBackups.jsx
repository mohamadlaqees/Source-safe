import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faFolderOpen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { setOpenFileBackups } from "../../store/File/fileSlice";
import LoadingSpinner from "../LoadingSpinner";
import Title from "../Title";

const FileBackups = () => {
  const { openFileBackups, fileBackupsLoading, fileBackups } = useSelector(
    (state) => state.file
  );
  const { mode } = useSelector((state) => state.mode);

  const dispatch = useDispatch();

  const viewHandler = (path) => {
    try {
      window.open(path, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error during file download:", error);
    }
  };

  const columns = [
    { field: "num", headerName: "NUM", width: 70, flex: 1 },
    { field: "backUp_name", headerName: "Backup name", width: 70, flex: 2 },
    { field: "type", headerName: "Type", width: 130, flex: 2 },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 90,
      flex: 2,
      valueGetter: (params) => new Date(params),
      valueFormatter: (params) => dayjs(params).format("M/D/YYYY h:mm A"),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Title
          title={"Explore the backup"}
          placement={"left"}
          enterDelay={2000}
          leaveDelay={100}
        >
          <FontAwesomeIcon
            className={`cursor-pointer transition
          ${mode === "dark" ? "hover:text-white" : "hover:text-message"}  ${
              mode === "dark" ? "text-message" : "text-message_light"
            }`}
            icon={faFolderOpen}
            onClick={() => viewHandler(params.row.path)}
          />
        </Title>
      ),
    },
  ];

  const rows = fileBackups.map(
    ({ id, name, type, created_at, path }, index) => {
      return {
        id,
        num: index + 1,
        backUp_name: name,
        type,
        date: new Date(created_at),
        path,
      };
    }
  );

  const paginationModel = { page: 0, pageSize: 5 };

  const Backdrop = () => {
    return (
      <div
        className="absolute w-full h-full bg-black opacity-30 z-20"
        onClick={() => {
          dispatch(setOpenFileBackups({ openFileBackups: false }));
        }}
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
        } absolute w-[90%] h-[90%] rounded-lg  z-30`}
      >
        <header className="flex justify-between  p-6">
          <h1 className="text-2xl">File Backups</h1>
          <FontAwesomeIcon
            icon={faXmark}
            className={`${
              mode === "dark" ? "text-message" : "text-message_light"
            } cursor-pointer ${
              mode === "dark" ? "hover:text-white" : "hover:text-text_light"
            } text-2xl`}
            onClick={() => {
              dispatch(setOpenFileBackups({ openFileBackups: false }));
            }}
          />
        </header>

        {fileBackupsLoading ? (
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
      {openFileBackups && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("backups-backdrop-root")
          )}
          {ReactDOM.createPortal(
            <Overlay />,
            document.getElementById("backups-overlay-root")
          )}
        </>
      )}
    </>
  );
};

export default FileBackups;
