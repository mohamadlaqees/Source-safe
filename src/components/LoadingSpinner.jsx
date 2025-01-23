/* eslint-disable react/prop-types */
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

function LoadingSpinner({ spinnerColor }) {
  const { mode } = useSelector((state) => state.mode);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90%",
      }}
    >
      <CircularProgress
        sx={{ color: `${mode === "dark" ? "#64748b" : `${spinnerColor}`}` }}
      />
    </Box>
  );
}

export default LoadingSpinner;
