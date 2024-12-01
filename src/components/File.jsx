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
import { openFilesBackups } from "../store/Group/groupSlice";
import { selectFile } from "../store/File/fileSlice";

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

const File = ({ name, sender, status, id }) => {
  const { mode } = useSelector((state) => state.mode);
  const { selectedFiles } = useSelector((state) => state.file);
  const dispatch = useDispatch();
  const [rightList, setRightList] = useState(false);
  const [bgEllip, setBgEllip] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const listRef = useRef();
  const isSelected = selectedFiles.includes(id);
  const isAnyFileSelected = selectedFiles.length > 0;

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

  const selectHandler = (id) => {
    dispatch(selectFile(id));
  };

  const baseClass = `w-full ${
    mode === "dark" ? "bg-main" : "bg-light_main"
  } px-4 py-4 rounded-lg mb-6 transition-all`;
  const selectedClass = isSelected
    ? mode === "dark"
      ? "!bg-[#546076] cursor-pointer"
      : "!bg-[#bbe2fc] cursor-pointer"
    : "";
  const hoverClass = isAnyFileSelected ? "cursor-pointer" : "";

  return (
    <div
      className={`${baseClass} ${selectedClass} ${hoverClass}`}
      onClick={(event) => {
        if (
          (isSelected || isAnyFileSelected) &&
          !listRef.current.contains(event.target)
        ) {
          selectHandler(id);
        }
      }}
    >
      <div className="  w-full flex justify-between  ">
        <div className={` items-center ml-4 w-64  transition-all   `}>
          {isAnyFileSelected ? (
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
          ) : null}
        </div>
        <div className="items-center  mr-4 relative " ref={listRef}>
          <FontAwesomeIcon
            icon={faEllipsisH}
            className={`  text-xl 
       cursor-pointer  ${
         mode === "dark" ? "hover:text-white" : "hover:text-message"
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
          <div
            className={` w-60 shadow-md ${
              rightList ? "opacity-1 scale-100" : "opacity-0 scale-75 hidden"
            } ${
              mode === "dark" ? "bg-main" : "bg-light_main"
            } py-3 absolute z-20 right-0 top-8 rounded-md transition-all transform origin-top-right `}
          >
            <button
              className={`flex gap-4  items-center ${
                mode === "dark" ? "text-white" : "text-text_light"
              } px-6 py-2 ${
                mode === "dark" ? "hover:bg-gray-700" : "hover:bg-fourth_light"
              }  cursor-pointer 
            ${
              mode === "dark"
                ? isLoading === true
                  ? "bg-gray-700"
                  : ""
                : isLoading === true
                ? "bg-fourth_light"
                : ""
            } `}
              disabled={isLoading}
            >
              <>
                {isLoading ? (
                  <LoadingButton
                    type="submit"
                    variant="text"
                    sx={{
                      color: `${
                        mode === "dark" ? "white" : "black"
                      } !important`,
                      "& .MuiCircularProgress-root": {
                        color: `${mode === "dark" ? "white" : " #374151"}`,
                      },
                    }}
                    loadingPosition="start"
                    loading
                  />
                ) : (
                  <FontAwesomeIcon icon={faFloppyDisk} />
                )}
                Reserve and Download
              </>
            </button>
            <button
              className={`flex gap-4 items-center ${
                mode === "dark" ? "text-white" : "text-text_light"
              } px-6 py-2 ${
                mode === "dark" ? "hover:bg-gray-700" : "hover:bg-fourth_light"
              }  cursor-pointer 
           w-full`}
            >
              <FontAwesomeIcon icon={faFile} /> File reports
            </button>
            <button
              className={`flex gap-4 items-center ${
                mode === "dark" ? "text-white" : "text-text_light"
              } px-6 py-2 ${
                mode === "dark" ? "hover:bg-gray-700" : "hover:bg-fourth_light"
              }  cursor-pointer w-full`}
              onClick={() => {
                dispatch(openFilesBackups({ filesBackups: true }));
                setRightList(false);
                setBgEllip(false);
              }}
            >
              <FontAwesomeIcon icon={faDatabase} /> View file backups
            </button>
            <button
              className={`flex gap-4 items-center text-[#ef4444]  px-6 py-2 ${
                mode === "dark" ? "hover:bg-gray-700" : "hover:bg-fourth_light"
              }  cursor-pointer 
           w-full`}
            >
              <FontAwesomeIcon icon={faTrash} className="text-[#ef4444]" />
              Remove File
            </button>
            <button
              className={`flex gap-4 items-center ${
                mode === "dark" ? "text-white" : "text-text_light"
              }  px-6 py-2 ${
                mode === "dark" ? "hover:bg-gray-700" : "hover:bg-fourth_light"
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
          </div>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table" sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell mode={mode}>Name</StyledTableCell>
              <StyledTableCell mode={mode} align="right">
                Sender
              </StyledTableCell>
              <StyledTableCell mode={mode} align="right">
                Status
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
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default File;
