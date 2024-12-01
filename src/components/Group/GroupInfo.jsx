import {
  faUserGroup,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { openGroupInfo, openGroupMembers } from "../../store/Group/groupSlice";
import User from "../User";
import GroupList from "../GroupList";
import { users } from "../../utils/constant";

const GroupInfo = () => {
  const { groupInfo, groupMembers } = useSelector((state) => state.group);
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);

  const Backdrop = () => {
    return (
      <div
        className="absolute w-full h-full bg-black opacity-30 z-10"
        onClick={() => dispatch(openGroupInfo({ groupInfo: false }))}
      />
    );
  };
  const Overlay = () => {
    return (
      <>
        {groupMembers && (
          <div className="absolute w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-black opacity-30 z-30" />
        )}
        <div
          className={`absolute w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl ${
            mode === "dark" ? "text-white" : "text-text_light"
          } z-20 ${
            mode === "dark" ? "bg-main" : "bg-light_main"
          } scrollbar-thin  ${
            mode === "dark"
              ? "scrollbar-thumb-gray-700 scrollbar-track-gray-500"
              : "scrollbar-thumb-slate-300 scrollbar-track-slate-100"
          } overflow-y-scroll`}
        >
          <header className="flex justify-between  p-6">
            <h1>Group Info</h1>
            <FontAwesomeIcon
              icon={faXmark}
              className={`${
                mode === "dark" ? "text-message" : "text-message_light"
              } cursor-pointer hover:${
                mode === "dark" ? "text-white" : "text-text_light"
              } text-2xl`}
              onClick={() => dispatch(openGroupInfo({ groupInfo: false }))}
            />
          </header>
          <User
            name={"Name"}
            member={"1 member"}
            padding={"px-6"}
            circle={"w-20 h-16"}
            margin={"my-6"}
            circleBG={`${
              mode === "dark" ? "bg-secondary" : "bg-light_secondary"
            }`}
          />
          <div
            className={`border-4 ${
              mode === "dark" ? " border-slate-700" : "border-slate-100"
            } `}
          />
          <div className="flex justify-between items-center p-6">
            <div
              className={`${
                mode === "dark" ? "text-white" : "text-text_light"
              } flex items-center gap-8 `}
            >
              <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4 " />1
              MEMBER
            </div>
            <FontAwesomeIcon
              icon={faUserPlus}
              className={`${
                mode === "dark" ? "text-white" : "text-text_light"
              } cursor-pointer w-4 h-4`}
              onClick={() => dispatch(openGroupMembers({ groupMembers: true }))}
            />
          </div>
          <GroupList
            data={users}
            circle={"w-14 h-12"}
            circleBG={`${
              mode === "dark" ? "bg-secondary" : "bg-light_secondary"
            }`}
            padding={"p-4"}
            item={"items-center"}
            owner={"owner"}
            openTheGroup={false}
          />{" "}
        </div>
      </>
    );
  };
  return (
    <>
      {groupInfo && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("backdrop-root")
          )}
          {ReactDOM.createPortal(
            <Overlay />,
            document.getElementById("overlay-root")
          )}
        </>
      )}
    </>
  );
};

export default GroupInfo;
