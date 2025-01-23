/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  clearGroupMembers,
  openGroupMembers,
  openNewGroup,
  refetchBrowsGroup,
  refetchGroup,
  refetchGroupMembers,
  selectGroupMembers,
} from "../../store/Group/groupSlice";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOM from "react-dom";
import GroupList from "../GroupList";
import {
  useAddUsersMutation,
  useDeleteGroupMutation,
  useGetNotMembersMutation,
  useSearchUsersMutation,
} from "../../store/Api/ApiSlice";
import LoadingSpinner from "../LoadingSpinner";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { openBackdrop } from "../../store/Drawer/drawerSlice";
import debounce from "lodash.debounce";
import { retry } from "@reduxjs/toolkit/query";

const GroupMembers = ({ users }) => {
  const {
    ID,
    groupMembers,
    selectedGroupMembers,
    addMembersFromGroup,
    groups,
    allGroupMembers,
    groupInfo,
  } = useSelector((state) => state.group);
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const [notAllowedMembers, setNotAllowedMembers] = useState([]);
  const [query, setQuery] = useState("");

  const [getNotMembers, { error, isError, isLoading }] =
    useGetNotMembersMutation();
  const [
    deleteGroup,
    {
      isError: deleteGroupIsError,
      error: deleteGroupError,
      isLoading: deleteGroupLoading,
    },
  ] = useDeleteGroupMutation();
  const [
    addUsers,
    {
      isError: addUsersIsError,
      error: addUsersError,
      isLoading: addUsersLoading,
    },
  ] = useAddUsersMutation();
  const [
    searchUsers,
    {
      error: searchUsersError,
      isError: searchUsersIsError,
      isLoading: searchUsersIsLoading,
    },
  ] = useSearchUsersMutation();

  const selectedUsersID = selectedGroupMembers.map((userID) => userID.id);

  const lastGroupIDAdded = groups[groups.length - 1].id;

  const clickHandler = (id) => {
    const member = notAllowedMembers.find((user) => user.id === id);
    dispatch(selectGroupMembers({ selectedGroupMembers: member, id }));
  };

  const searchUsersHandler = debounce(async (value) => {
    setNotAllowedMembers([]);
    try {
      const user = await searchUsers({ userName: value }).unwrap();
      setNotAllowedMembers([]);
      setNotAllowedMembers([user]);
    } catch (error) {
      console.log(error);
    }
  }, 1000);

  const addMemberHandler = async () => {
    try {
      await addUsers({
        group: !addMembersFromGroup ? lastGroupIDAdded : ID,
        users: selectedUsersID,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
    dispatch(openGroupMembers({ groupmembers: false }));
    dispatch(clearGroupMembers());
    dispatch(openNewGroup({ newGroup: false }));
    dispatch(openBackdrop({ backdrop: false }));
    if (addMembersFromGroup) {
      dispatch(refetchGroupMembers({ refetchTheMembers: true }));
      dispatch(refetchBrowsGroup({ refetchTheBrows: true }));
    }
  };

  const deleteGroupHandler = async () => {
    if (!addMembersFromGroup) {
      try {
        await deleteGroup({ id: !addMembersFromGroup ? lastGroupIDAdded : ID });
      } catch (error) {
        console.log(error);
      }
      dispatch(refetchGroup({ refetchGroupList: true }));
    }
    dispatch(openGroupMembers({ groupmembers: false }));
    dispatch(clearGroupMembers());
  };

  const owner = users?.find((user) => user.id === groupInfo.created_by)?.[
    "user_name"
  ];

  useEffect(() => {
    const fetchMembers = async () => {
      const groupID = !addMembersFromGroup ? lastGroupIDAdded : ID;

      try {
        const members = await getNotMembers({ groupID }).unwrap();
        setNotAllowedMembers(members.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    if (query.length === 0) {
      fetchMembers();
    }
  }, [addMembersFromGroup, ID, lastGroupIDAdded, query]);

  useEffect(() => {
    if (query.length > 0) {
      searchUsersHandler(query);
    }
    return () => {
      searchUsersHandler.cancel();
    };
  }, [query]);

  useEffect(() => {
    return () => setNotAllowedMembers([]);
  }, []);

  const Backdrop = () => {
    return (
      <div
        className="absolute w-full h-full  z-[35]"
        onClick={() => {
          deleteGroupHandler();
          dispatch(openGroupMembers({ groupMembers: false }));
          dispatch(clearGroupMembers());
        }}
      />
    );
  };

  const Overlay = () => {
    return (
      <div
        className={`absolute  w-[349px] aboveMobile:w-96 h-80  top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-lg  ${
          mode === "dark" ? "text-white" : "text-text_light"
        } z-40 
        ${mode === "dark" ? "bg-main" : "bg-light_main"} `}
      >
        <div className="p-4 pb-0">
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
                  mode === "dark" ? "text-message " : "text-message_light"
                } absolute bottom-3`}
              />
              {selectedGroupMembers.length > 0 && (
                <GroupList
                  data={selectedGroupMembers}
                  circle={"w-10 h-10"}
                  circleBG={`${
                    mode === "dark" ? "bg-secondary" : "bg-light_secondary"
                  }`}
                  pointer={true}
                  padding={"px-2 py-3"}
                  firstName={true}
                  item={"items-center w-fit "}
                  memberStyle={` flex justify-between  flex-wrap  
                     ${
                       selectedGroupMembers.length > 0
                         ? "scrollbar-thin overflow-y-scroll "
                         : ""
                     }    ${
                    selectedGroupMembers.length > 0
                      ? mode === "dark"
                        ? "scrollbar-thumb-gray-700 scrollbar-track-gray-500"
                        : "scrollbar-thumb-slate-300 scrollbar-track-slate-100   "
                      : ""
                  } max-h-28 `}
                  remove={true}
                  leftSide={false}
                />
              )}
              <input
                type="text"
                placeholder="Search"
                value={query}
                autoFocus
                className={`${
                  mode === "dark"
                    ? "placeholder-message caret-white"
                    : "placeholder-message_light caret-black"
                } py-2 pl-8 outline-none  bg-transparent  ${
                  mode === "dark" ? "text-white" : "text-text_light"
                }`}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        {mode !== "dark" && (
          <span className="border border-fourth_light flex "></span>
        )}
        <div
          className={` ${mode === "dark" ? "bg-secondary" : "bg-white"}  ${
            notAllowedMembers.length > 0
              ? "scrollbar-thin overflow-y-scroll "
              : ""
          }    ${
            notAllowedMembers.length > 0
              ? mode === "dark"
                ? "scrollbar-thumb-gray-700 scrollbar-track-gray-500"
                : "scrollbar-thumb-slate-300 scrollbar-track-slate-100   "
              : ""
          } h-72 `}
        >
          {isLoading || searchUsersIsLoading ? (
            <LoadingSpinner spinnerColor={"#74b5e0"} />
          ) : searchUsersError &&
            searchUsersError.data.message &&
            notAllowedMembers.length === 0 ? (
            <p
              className={`${
                mode === "dark" ? "text-white" : "text-text_light"
              } h-full font-bold flex flex-1 justify-center items-center`}
            >
              {searchUsersError.data.message}
            </p>
          ) : notAllowedMembers.length === 0 ? (
            <p
              className={`${
                mode === "dark" ? "text-white" : "text-text_light"
              } h-full font-bold flex flex-1 justify-center items-center`}
            >
              Empty
            </p>
          ) : (
            <GroupList
              data={notAllowedMembers || []}
              circle={"w-12 h-12"}
              circleBG={`${mode === "dark" ? "bg-main" : "bg-light_secondary"}`}
              hover={true}
              padding={"p-4"}
              pointer={true}
              item={"items-center"}
              onClick={clickHandler}
              openTheGroup={false}
              groupMembers={true}
              leftSide={false}
              allGroupMembers={allGroupMembers}
              ownerName={owner}
            />
          )}
        </div>
        {mode !== "dark" && (
          <span className="border border-fourth_light flex  "></span>
        )}
        <div
          className={`flex justify-end gap-4 ${
            mode === "dark" ? "bg-main" : "bg-light_main"
          } p-4`}
        >
          <button
            className={` 
              ${
                deleteGroupLoading
                  ? mode === "dark"
                    ? "bg-gray-700 "
                    : "bg-[#D3EDF8]"
                  : "bg-transparent "
              }
               py-1.5 px-4 ${
                 mode === "dark" ? "hover:bg-gray-700" : "hover:bg-[#D3EDF8]"
               }  ${
              mode === "dark" ? "text-slate-300" : "text-light_secondary"
            }  rounded-lg`}
            onClick={() => {
              deleteGroupHandler();
            }}
            disabled={deleteGroupLoading}
          >
            <>
              {deleteGroupLoading ? (
                <LoadingButton
                  type="submit"
                  variant="text"
                  loadingPosition="center"
                  loading
                  sx={{
                    "& .MuiCircularProgress-root": {
                      color: `${mode === "dark" ? "#cbd5e1" : "white"}`,
                    },
                  }}
                />
              ) : (
                "Cancel"
              )}
            </>{" "}
          </button>
          <button
            className={`${
              addUsersLoading
                ? mode === "dark"
                  ? "bg-gray-700 "
                  : "bg-[#D3EDF8]"
                : "bg-transparent "
            } py-1.5 px-4 ${
              mode === "dark" ? "hover:bg-gray-700" : "hover:bg-[#D3EDF8]"
            }  ${
              mode === "dark" ? "text-slate-300" : "text-light_secondary"
            }  rounded-lg`}
            onClick={addMemberHandler}
            disabled={addUsersLoading}
          >
            <>
              {addUsersLoading ? (
                <LoadingButton
                  type="submit"
                  variant="text"
                  loadingPosition="center"
                  loading
                  sx={{
                    "& .MuiCircularProgress-root": {
                      color: `${mode === "dark" ? "#cbd5e1" : "white"}`,
                    },
                  }}
                />
              ) : (
                "Add"
              )}
            </>{" "}
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
