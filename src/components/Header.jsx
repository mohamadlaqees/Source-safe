/* eslint-disable react/prop-types */
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "../store/Drawer/drawerSlice";
import { useEffect, useRef, useState } from "react";

const Header = ({ smallWidth }) => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);
  const [bgColor, setBgColor] = useState(false);
  const inputRef = useRef();
  const setBackColor = () => {
    setBgColor(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setBgColor(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex items-center justify-center gap-3 p-4 ">
      <div
        className="cursor-pointer"
        onClick={() => dispatch(openDrawer({ drawerOpen: true }))}
      >
        <FontAwesomeIcon
          icon={faBars}
          className={` ${
            mode === "dark" ? "text-message" : "text-message_light"
          }   w-5 h-5`}
        />
      </div>
      {!smallWidth && (
        <div className="flex-1">
          <input
            ref={inputRef}
            type="Search"
            placeholder="Search"
            className={` ${
              mode === "dark" ? "bg-fourth" : "bg-fourth_light"
            } rounded-3xl py-1.5 pl-4 w-full outline-none   ${
              mode === "dark" ? "text-white" : "text-text_light"
            }  ${
              mode !== "dark"
                ? bgColor
                  ? "bg-transparent border border-text-message "
                  : ""
                : mode === "dark"
                ? bgColor
                  ? "placeholder:text-message"
                  : "placeholder:text-fourth_light"
                : ""
            }  transition-all duration-75`}
            onMouseDown={() => setBackColor()}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
