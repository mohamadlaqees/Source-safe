import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faXmark } from "@fortawesome/free-solid-svg-icons";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import LoadingSpinner from "../LoadingSpinner";
import {
  setOpenSystemUserReport,
  setSystemUsersReports,
} from "../../store/User/userSlice";
import Title from "../Title";
import { useGetSystemUsersReportsQuery } from "../../store/Api/ApiSlice";
import { useEffect } from "react";

const SystemUsersReports = () => {
  const { mode } = useSelector((state) => state.mode);
  const { openSystemUserReport } = useSelector((state) => state.user);
  const { allUsers } = useSelector((state) => state.side);

  const dispatch = useDispatch();

  const {
    data: systemUsersReports,
    error: GetSystemUsersReportsError,
    isError: GetSystemUsersReportsIsError,
    isFetching: GetSystemUsersReportsIsFetching,
    refetch: refetchAllSystemUsersReports,
  } = useGetSystemUsersReportsQuery();

  const columns = [
    { field: "num", headerName: "NUM", width: 70, flex: 1 },
    { field: "user_name", headerName: "User name", width: 70, flex: 2 },
    { field: "requestName", headerName: "RequestName", width: 130, flex: 2 },
    { field: "methodType", headerName: "MethodType", width: 130, flex: 2 },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 90,
      flex: 2,
      valueGetter: (params) => new Date(params),
      valueFormatter: (params) => dayjs(params).format("M/D/YYYY h:mm A"),
    },
  ];

  const rows = systemUsersReports?.data.map(
    ({ id, userID, methodType, requestName, created_at }, index) => {
      const name = allUsers.find((user) => user.id === userID).user_name;
      return {
        id,
        num: index + 1,
        user_name: name,
        requestName,
        methodType,
        date: new Date(created_at),
      };
    }
  );

  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    dispatch(
      setSystemUsersReports({
        systemUsersReports: systemUsersReports?.data.map(
          ({ id, userID, methodType, requestName, created_at }) => ({
            id,
            userID,
            methodType,
            requestName,
            created_at,
          })
        ),
      })
    );
  }, [dispatch, systemUsersReports]);

  const Backdrop = () => {
    return (
      <div
        className="absolute w-full h-full bg-black opacity-30 z-20"
        onClick={() => {
          dispatch(setOpenSystemUserReport({ openSystemUserReport: false }));
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
          <div className="flex gap-4 items-center">
            <h1 className="text-2xl">System users report</h1>
            <Title
              title={"Refresh the list"}
              placement={"right"}
              enterDelay={2000}
              leaveDelay={100}
            >
              <FontAwesomeIcon
                icon={faRefresh}
                className={`${
                  mode === "dark" ? "text-message" : "text-message_light"
                } cursor-pointer ${
                  mode === "dark" ? "hover:text-white" : "hover:text-text_light"
                } text-2xl`}
                onClick={() => {
                  refetchAllSystemUsersReports();
                }}
              />
            </Title>
          </div>
          <FontAwesomeIcon
            icon={faXmark}
            className={`${
              mode === "dark" ? "text-message" : "text-message_light"
            } cursor-pointer ${
              mode === "dark" ? "hover:text-white" : "hover:text-text_light"
            } text-2xl`}
            onClick={() => {
              dispatch(
                setOpenSystemUserReport({ openSystemUserReport: false })
              );
            }}
          />
        </header>

        {GetSystemUsersReportsIsFetching ? (
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
      {openSystemUserReport && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("systemUsersReports-backdrop-root")
          )}
          {ReactDOM.createPortal(
            <Overlay />,
            document.getElementById("systemUsersReports-overlay-root")
          )}
        </>
      )}
    </>
  );
};

export default SystemUsersReports;
