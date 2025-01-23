/* eslint-disable react/prop-types */
import { faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  useCheckOutFileMutation,
  useUploadFileMutation,
} from "../../store/Api/ApiSlice";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { refetchGroup, refetchGroupFiles } from "../../store/Group/groupSlice";
import { refetchUnreadNotifications } from "../../store/Notification/notificationSlice";
import Title from "../Title";

const GroupInput = () => {
  const { mode } = useSelector((state) => state.mode);
  const { ID, groupFiles } = useSelector((state) => state.group);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [
    uploadFile,
    {
      isError: uploadFileisError,
      error: uploadFileError,
      isLoading: uploadFileIsLoading,
    },
  ] = useUploadFileMutation();
  const [
    checkOutFile,
    {
      isError: checkOutFileisError,
      error: checkOutFileError,
      isLoading: checkOutFileIsLoading,
    },
  ] = useCheckOutFileMutation();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["application/pdf", "text/plain"];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Only PDF and TXT files are allowed.");
        setFile(null);
        return;
      }
      setError("");
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("No file selected.");
      return;
    }

    const isFileExistsAlready = groupFiles.find(
      (existedFile) => existedFile.name === file.name
    );
    if (isFileExistsAlready) {
      const fileID = isFileExistsAlready.id;
      const reserved = isFileExistsAlready.reserved_by;
      if (reserved) {
        try {
          await checkOutFile({ fileID, newFile: file });
        } catch (err) {
          console.log(err);
        }
        setFile(null);
        setError("");
        dispatch(refetchGroupFiles({ refetchTheFiles: true }));
        dispatch(refetchGroup({ refetchGroupList: true }));

        dispatch(
          refetchUnreadNotifications({ refetchunreadNotifications: true })
        );
      } else if (reserved === null) {
        setError("File is not reserved ");
      }
    } else {
      try {
        await uploadFile({ groupID: ID, file });
      } catch (err) {
        console.log(err);
        setError("An error occurred during the upload.");
      }
      setFile(null);
      setError("");
      dispatch(refetchGroupFiles({ refetchTheFiles: true }));
      dispatch(refetchGroup({ refetchGroupList: true }));
    }
  };

  return (
    <div
      className={`w-full h-14 absolute bottom-0 flex items-center ${
        mode === "dark" ? "bg-main" : "bg-light_main"
      }`}
    >
      <Title
        title={
          "Choose a new file / Or check out the old file with it's same name"
        }
        placement={"top"}
        enterDelay={2000}
        leaveDelay={100}
      >
        <label className={`ml-4 `}>
          <FontAwesomeIcon
            icon={faPaperclip}
            className={`cursor-pointer ${
              mode === "dark" ? "text-message" : "text-message_light"
            } text-xl ${
              mode === "dark" ? "hover:text-white" : "hover:text-message"
            }`}
          />
          <input
            type="file"
            accept=".pdf,.txt"
            className="hidden"
            value={""}
            onChange={handleFileChange}
          />
        </label>
      </Title>

      <input
        type="text"
        className={`flex-grow h-full px-4 ${
          mode === "dark" ? "bg-main" : "bg-light_main"
        } ${
          error
            ? "text-red-500"
            : mode === "dark"
            ? "text-message"
            : "text-message_light"
        }`}
        value={`${error ? error : file ? file.name : "Upload file"}`}
        disabled
      />

      {uploadFileIsLoading || checkOutFileIsLoading ? (
        <LoadingButton
          variant="text"
          sx={{
            color: `inherit`,
            "& .MuiCircularProgress-root": {
              color: mode === "dark" ? "#cbd5e1" : "#74b5e0",
            },
          }}
          loadingPosition="center"
          loading
        />
      ) : (
        <Title
          title={"Send the file"}
          placement={"top"}
          enterDelay={2000}
          leaveDelay={100}
        >
          <FontAwesomeIcon
            icon={faPaperPlane}
            className={`mr-4  ${
              mode === "dark" ? "text-message" : "text-light_secondary"
            } text-xl `}
            onClick={handleUpload}
          />
        </Title>
      )}
    </div>
  );
};

export default GroupInput;
