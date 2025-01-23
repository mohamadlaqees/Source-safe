/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { deleteAction, removeGroupMember } from "../../store/Group/groupSlice";
import { useState } from "react";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import Title from "../Title";

const User = ({
  id,
  name,
  icon,
  hover,
  pointer,
  padding,
  text = "",
  circle,
  margin,
  item,
  circleBG,
  firstName,
  remove,
  groupMembers,
  smallWidth,
  clickHandler,
  deletePermissionHandler,
  isActive,
  owner,
  theOwner,
  lastGroupFileName,
  creatorName,
  createdDate,
  updatedDate,
  groupFiles,
  leftSide,
  laftSideWidth,
  alreadyMember,
}) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const { selectedGroupMembers } = useSelector((state) => state.group);
  const { mode } = useSelector((state) => state.mode);
  const deleteHandler = (id) => {
    deletePermissionHandler(name, id);
  };

  const selectedMember = selectedGroupMembers.find(
    (member) => member.id === id
  );

  const formattedDate = dayjs(
    `${
      groupFiles === 0
        ? createdDate
        : createdDate === updatedDate
        ? createdDate
        : updatedDate
    }`
  ).format("MMMM D, YYYY h:mm A");

  return (
    <>
      {leftSide ? (
        <Title
          title={"Open the group to see it's files"}
          placement={"right"}
          enterDelay={2000}
          leaveDelay={100}
        >
          <div
            className={`flex gap-4 w-full items-center   ${
              mode === "dark" ? "text-white" : "text-text_light"
            } ${padding}  ${pointer ? "cursor-pointer" : ""}
                ${
                  isActive
                    ? `${mode === "dark" ? "bg-gray-700 " : "bg-fourth_light"} `
                    : ""
                }
                  ${
                    hover
                      ? `${
                          mode === "dark"
                            ? "hover:bg-gray-700 "
                            : "hover:bg-fourth_light"
                        } `
                      : ""
                  }  
                  ${margin}
                  ${item}
                  `}
            onClick={() => {
              clickHandler(id);
            }}
          >
            {smallWidth ? (
              <div
                className={`${circle} ${circleBG} ml-2 rounded-full flex justify-center items-center relative transition-all duration-300 text-white font-bold`}
                onMouseEnter={() => (remove ? setIsHovered(true) : "")}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative ">
                  <span
                    className={` transition-opacity duration-300 ${
                      isHovered ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {name?.charAt(0)}
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div
                  className={`${circle} ${circleBG} rounded-full  flex  justify-center items-center  font-bold text-white  
                   transition-opacity duration-300 ${
                     isHovered ? "opacity-0" : "opacity-100"
                   }`}
                >
                  {name?.charAt(0)}
                </div>

                <div className="w-full">
                  <div
                    className={`flex  ${
                      laftSideWidth > 370 ? "justify-between " : "gap-2"
                    }  items-center `}
                  >
                    <div>
                      <h1 className={text}>
                        <FontAwesomeIcon icon={icon} className="w-3 h-3" />{" "}
                        {name}
                      </h1>
                    </div>
                    <div
                      className={`   ${
                        groupMembers || remove
                          ? ""
                          : createdDate
                          ? mode === "dark"
                            ? "text-message"
                            : "text-message_light"
                          : "text-slate-500"
                      }`}
                    >
                      {formattedDate}
                    </div>
                  </div>

                  <div className="mt-1">
                    {groupFiles === 0 ? (
                      <span>
                        {creatorName} created the group {name}
                      </span>
                    ) : (
                      <div className="flex flex-wrap ">
                        <span
                          className={`${
                            firstName
                              ? "inline-block overflow-hidden text-ellipsis  w-[80px]"
                              : ""
                          } ${
                            mode === "dark"
                              ? "text-white"
                              : "text-light_secondary"
                          }`}
                        >
                          {creatorName}{" "}
                        </span>
                        <span className="mr-1 ml-1"> : </span>
                        <span
                          className={` inline-block overflow-hidden text-ellipsis w-[190px] aboveMobile:w-[290px] ${
                            mode === "dark"
                              ? "text-message"
                              : "text-message_light"
                          }`}
                        >
                          {lastGroupFileName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </Title>
      ) : (
        <div
          className={`flex  gap-2 items-center ${
            mode === "dark" ? "text-white" : "text-text_light"
          } ${padding} ${
            alreadyMember
              ? "cursor-not-allowed"
              : pointer
              ? "cursor-pointer"
              : ""
          } 
            ${
              hover
                ? `${
                    mode === "dark"
                      ? "hover:bg-gray-700 "
                      : "hover:bg-fourth_light"
                  } `
                : ""
            }  
            ${margin}
            ${item}
      `}
          onClick={() => {
            if (!alreadyMember) {
              clickHandler(id);
            }
          }}
        >
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
                  {name?.charAt(0)}
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

            <div className="flex-1">
              <div className="flex justify-between items-center ">
                <>
                  <h1 className={text}>
                    {firstName ? (
                      <span
                        className="inline-block overflow-hidden text-ellipsis  w-[100px]"
                        title={name}
                      >
                        {name}
                      </span>
                    ) : (
                      name
                    )}
                  </h1>

                  {owner ? (
                    <Title
                      title={"Delete member"}
                      placement={"left"}
                      enterDelay={2000}
                      leaveDelay={100}
                    >
                      <FontAwesomeIcon
                        icon={faBan}
                        className="hover:text-[#ef4444] transition-all cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteHandler(id);
                          dispatch(deleteAction({ deletePrompt: true }));
                        }}
                      />
                    </Title>
                  ) : theOwner ? (
                    "Owner"
                  ) : (
                    ""
                  )}
                </>
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default User;
