/* eslint-disable react/prop-types */

import { openDropDownList, openGroupInfo } from "../../store/Group/groupSlice";
import { useDispatch, useSelector } from "react-redux";
import DropDownList from "./DropDownList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { clearSelections } from "../../store/File/fileSlice";

const GroupHeader = ({ name }) => {
  const dispatch = useDispatch();
  const { dropDownList } = useSelector((state) => state.group);
  const { selectedFiles } = useSelector((state) => state.file);
  const { mode } = useSelector((state) => state.mode);
  const [isLoading, setisLoading] = useState(false);

  return (
    <>
      {selectedFiles.length > 0 ? (
        <div
          className={`${
            mode === "dark" ? "bg-main" : "bg-light_main"
          } py-2 px-4 flex justify-between items-center w-full h-14`}
        >
          <Button
            className="flex gap-4 items-center px-6 py-2 cursor-pointer"
            variant="contained"
            disabled={isLoading}
            style={{
              color: `${mode === "dark" ? "#cbd5e1" : "white"}`,
              backgroundColor: `${mode === "dark" ? "#374151" : " #74b5e0"}`, // Set the background color
            }}
          >
            <>
              {isLoading ? (
                <LoadingButton
                  type="submit"
                  variant="text"
                  loadingPosition="start"
                  loading
                  sx={{
                    "& .MuiCircularProgress-root": {
                      color: `${mode === "dark" ? "#cbd5e1" : "white"}`,
                    },
                  }}
                />
              ) : (
                <FontAwesomeIcon icon={faFloppyDisk} />
              )}
              Reserve and Download
            </>
          </Button>

          <Button
            className="flex gap-4 items-center px-6 py-2 cursor-pointer"
            variant="contained"
            disabled={isLoading}
            style={{
              color: `${mode === "dark" ? "#cbd5e1" : "white"}`,
              backgroundColor: `${mode === "dark" ? "#374151" : " #74b5e0"}`, // Set the background color
            }}
            onClick={() => dispatch(clearSelections())}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div
          className={`${
            mode === "dark" ? "bg-main" : "bg-light_main"
          } py-2 px-4 flex justify-between items-center w-full h-14 cursor-pointer`}
        >
          <div
            className="flex-1"
            onClick={() => {
              dispatch(openGroupInfo({ groupInfo: true }));
            }}
          >
            <h3
              className={`${
                mode === "dark" ? "text-white" : "text-text_light"
              } text-sm `}
            >
              {name}
            </h3>
            <span
              className={`${
                mode === "dark" ? "text-message" : "text-message_light"
              } text-sm`}
            >
              1 member
            </span>
          </div>
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
          <DropDownList dropDownList={dropDownList} />
        </div>
      )}
    </>
  );
};

export default GroupHeader;
