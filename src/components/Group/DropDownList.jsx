/* eslint-disable react/prop-types */
import {
  faCircleExclamation,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { openDropDownList, openGroupInfo } from "../../store/Group/groupSlice";
import ReactDOM from "react-dom";

const DropDownList = ({ dropDownList }) => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);

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
        className={` py-3 absolute z-50 right-0 top-14 rounded-md transition-all transform origin-top-right${
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
            dispatch(openGroupInfo({ groupInfo: true }));
            dispatch(openDropDownList({ dropDownList: false }));
          }}
        >
          <FontAwesomeIcon icon={faCircleExclamation} /> View group info
        </div>
        <div
          className={`flex gap-4 items-center text-red-500 px-5 py-2 ${
            mode === "dark" ? "hover:bg-gray-700" : "hover:bg-fourth_light"
          }  cursor-pointer`}
        >
          <FontAwesomeIcon icon={faTrash} />
          Leave and delete
        </div>
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
