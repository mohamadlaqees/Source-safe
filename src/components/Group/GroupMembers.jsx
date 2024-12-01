import { useDispatch, useSelector } from "react-redux";
import {
  clearGroupMembers,
  openGroupMembers,
  selectGroupMembers,
} from "../../store/Group/groupSlice";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOM from "react-dom";
import GroupList from "../GroupList";
import { users } from "../../utils/constant";
import { useGetUsersQuery } from "../../store/Api/ApiSlice";

const GroupMembers = () => {
  const { groupMembers, selectedGroupMembers } = useSelector(
    (state) => state.group
  );
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const { data: allUsers, isError, error } = useGetUsersQuery();
  console.log(allUsers);

  const clickHandler = (id) => {
    const member = users.find((user) => user.id === id);
    dispatch(selectGroupMembers({ selectGroupMembers: member, id }));
  };

  const Backdrop = () => {
    return (
      <div
        className="absolute w-full h-full  z-30"
        onClick={() => {
          dispatch(openGroupMembers({ groupMembers: false }));
          dispatch(clearGroupMembers());
        }}
      />
    );
  };

  const Overlay = () => {
    return (
      <div
        className={`absolute w-80 h-80  top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-xl  ${
          mode === "dark" ? "text-white" : "text-text_light"
        } z-40 
        ${mode === "dark" ? "bg-main" : "bg-light_main"} `}
      >
        <div className="p-4">
          <div className={`${mode === "dark" ? "bg-main" : "bg-light_main"} `}>
            <h1
              className={`${
                mode === "dark" ? "text-white" : "text-text_light"
              } mb-6`}
            >
              Add Members
            </h1>
            <div className="relative">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={`${
                  mode === "dark" ? "text-message" : "text-message_light"
                } absolute bottom-3`}
              />
              {selectedGroupMembers.length > 0 && (
                <GroupList
                  data={selectedGroupMembers}
                  circle={"w-12 h-8"}
                  circleBG={`${
                    mode === "dark" ? "bg-secondary" : "bg-light_secondary"
                  }`}
                  pointer={true}
                  padding={"px-2 py-3"}
                  firstName={true}
                  item={"items-center w-32 "}
                  memberStyle={` flex justify-between  flex-wrap   scrollbar-thin  ${
                    mode === "dark"
                      ? "scrollbar-thumb-gray-700 scrollbar-track-gray-500"
                      : "scrollbar-thumb-slate-300 scrollbar-track-slate-100"
                  } overflow-y-scroll max-h-28 `}
                  remove={true}
                />
              )}
              <input
                type="text"
                placeholder="Search"
                autoFocus
                className={`${
                  mode === "dark"
                    ? "placeholder-message caret-white"
                    : "placeholder-message_light caret-black"
                } py-2 pl-8 outline-none  bg-transparent  ${
                  mode === "dark" ? "text-white" : "text-text_light"
                }`}
              />
            </div>
          </div>
        </div>

        <div
          className={`${
            mode === "dark" ? "bg-secondary" : "bg-white"
          }  scrollbar-thin   ${
            mode === "dark"
              ? "scrollbar-thumb-gray-700 scrollbar-track-gray-500"
              : "scrollbar-thumb-slate-300 scrollbar-track-slate-100"
          } overflow-y-scroll h-72 `}
        >
          <GroupList
            data={users}
            circle={"w-14 h-12"}
            circleBG={`${mode === "dark" ? "bg-main" : "bg-light_secondary"}`}
            hover={true}
            padding={"p-4"}
            pointer={true}
            item={"items-center"}
            onClick={clickHandler}
            openTheGroup={false}
            groupMembers={true}
          />
        </div>
        <div
          className={`flex justify-end gap-4 ${
            mode === "dark" ? "bg-main" : "bg-light_main"
          } p-4`}
        >
          <button
            className={`bg-transparent py-1.5 px-4 ${
              mode === "dark" ? "hover:bg-gray-700" : "hover:bg-[#D3EDF8]"
            }  ${
              mode === "dark" ? "text-slate-300" : "text-light_secondary"
            }  rounded-lg`}
            onClick={() => {
              dispatch(openGroupMembers({ groupmembers: false }));
              dispatch(clearGroupMembers());
            }}
          >
            Cancel
          </button>
          <button
            className={`bg-transparent py-1.5 px-4 ${
              mode === "dark" ? "hover:bg-gray-700" : "hover:bg-[#D3EDF8]"
            }  ${
              mode === "dark" ? "text-slate-300" : "text-light_secondary"
            }  rounded-lg`}
          >
            Add
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {groupMembers && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("members-backdrop-root")
          )}
          {ReactDOM.createPortal(
            <Overlay />,
            document.getElementById("members-overlay-root")
          )}
        </>
      )}
    </>
  );
};

export default GroupMembers;
