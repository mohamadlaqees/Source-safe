/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { openGroup, removeGroupMember } from "../store/Group/groupSlice";
import { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const User = ({
  id,
  name,
  icon,
  time = "",
  lastMessage = "",
  hover,
  pointer,
  padding,
  member = "",
  text = "",
  circle,
  margin,
  item,
  owner = "",
  circleBG,
  onClick,
  openTheGroup,
  firstName,
  remove,
  groupMembers,
  smallWidth,
}) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const { selectedGroupMembers } = useSelector((state) => state.group);
  const { mode } = useSelector((state) => state.mode);

  const selectedMember = selectedGroupMembers.find(
    (member) => member.id === id
  );

  const clickHandler = () => {
    onClick(id);
  };

  return (
    <div
      className={`flex gap-3 ${
        mode === "dark" ? "text-white" : "text-text_light"
      } ${padding}  ${pointer ? "cursor-pointer" : ""} ${
        hover
          ? `${
              mode === "dark" ? "hover:bg-gray-700 " : "hover:bg-fourth_light"
            } `
          : ""
      }  
      ${margin}
      ${item}
      `}
      onClick={() => {
        clickHandler();
        if (openTheGroup) {
          dispatch(openGroup({ name: "Name" }));
        }
      }}
    >
      {smallWidth ? (
        <div
          className={`${circle} ${circleBG} rounded-full flex justify-center items-center relative transition-all duration-300 text-white font-bold`}
          onMouseEnter={() => (remove ? setIsHovered(true) : "")}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative ">
            <span
              className={` transition-opacity duration-300 ${
                isHovered ? "opacity-0" : "opacity-100"
              }`}
            >
              {name.charAt(0)}
            </span>
            {groupMembers && selectedMember && (
              <FontAwesomeIcon
                icon={faCheck}
                className={`${
                  mode === "dark" ? "text-white" : "text-text_light"
                } absolute bg-slate-400  rounded-full p-2 -bottom-6 right-2 text-xs`}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            className={`${circle} ${circleBG} rounded-full flex  justify-center items-center relative transition-all duration-300 font-bold text-white`}
            onMouseEnter={() => (remove ? setIsHovered(true) : "")}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative ">
              <span
                className={` transition-opacity duration-300 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              >
                {name.charAt(0)}
              </span>
              {groupMembers && selectedMember && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className={`${
                    mode === "dark"
                      ? "text-white bg-slate-600"
                      : "text-white bg-slate-300"
                  } absolute   rounded-full p-2 -bottom-6 right-2 text-xs`}
                />
              )}
            </div>

            {remove && (
              <span
                className={`absolute transition-all duration-300   w-full h-full flex justify-center items-center rounded-full ${
                  mode === "dark"
                    ? "text-white bg-slate-600"
                    : "text-white bg-slate-300"
                } ${
                  isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
                onClick={() => dispatch(removeGroupMember({ id }))}
              >
                X
              </span>
            )}
          </div>
          <div className="w-[90%]">
            <div className="flex justify-between ">
              <h1 className={text}>
                <FontAwesomeIcon icon={icon} className="w-3 h-3" />{" "}
                {firstName ? name.split(" ")[0] : name}
              </h1>
              <div
                className={`${
                  time === ""
                    ? "text-slate-500"
                    : mode === "dark"
                    ? "text-message"
                    : "text-message_light"
                }`}
              >
                {time || owner}
              </div>
            </div>
            <p>
              {lastMessage !== "" ? (
                <>
                  <span
                    className={`${
                      mode === "dark" ? "text-white" : "text-light_secondary"
                    }`}
                  >
                    {" "}
                    You:{" "}
                  </span>
                  <span
                    className={`${
                      mode === "dark" ? "text-message" : "text-message_light"
                    }`}
                  >
                    {lastMessage}
                  </span>
                </>
              ) : member !== "" ? (
                <span
                  className={`${
                    mode === "dark" ? "text-message" : "text-message_light"
                  }`}
                >
                  {member}
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
