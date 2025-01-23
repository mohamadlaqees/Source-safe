/* eslint-disable react/prop-types */
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GroupList from "../GroupList";
import { reduceTheSize } from "../../store/LeftSide/leftSideSlice";

import LoadingSpinner from "../LoadingSpinner";
import {
  openGroup,
  refetchGroup,
  refetchGroupMembers,
  setGetUserGroupsIsLoading,
  setGroupID,
  setGroupMembers,
  setGroups,
} from "../../store/Group/groupSlice";
import {
  useGetGroupMembersMutation,
  useGetUserGroupsMutation,
} from "../../store/Api/ApiSlice";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const { smallWidth } = useSelector((state) => state.side);
  const { isSmallScreen: isSS } = useSelector((state) => state.mode);
  const {
    groups,
    getUserGroupsIsLoading,
    refetchTheMembers,
    ID,
    refetchGroupList,
  } = useSelector((state) => state.group);
  const { mode } = useSelector((state) => state.mode);
  const [width, setWidth] = useState(480);
  const [
    getGroupMember,
    {
      isError: getGroupMembersIsError,
      error: getGroupMembersError,
      isLoading: getGroupMembersIsLoading,
    },
  ] = useGetGroupMembersMutation();

  const [
    getUserGroups,
    {
      isLoading: GetUserGroupsIsLoading,
      isError: GetUserGroupsIsError,
      error: GetUserGroupsError,
    },
  ] = useGetUserGroupsMutation();

  const clickHandler = async (id) => {
    dispatch(setGroupID({ ID: id }));
    dispatch(openGroup({ openGroup: true }));
    try {
      const groupMembers = await getGroupMember({ groupID: id }).unwrap();
      dispatch(setGroupMembers({ allGroupMembers: groupMembers.data }));
    } catch (error) {
      console.log(error);
    }
  };

  const resize = (e) => {
    let newWidth = Math.max(80, Math.min(e.clientX, 480));
    if (newWidth < 330 && width > 80) {
      newWidth = 80;
    } else if (width < 300 && width >= 80) {
      newWidth = 330;
    }
    setWidth(newWidth);
  };

  const startResizing = () => {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResizing);
  };

  const stopResizing = () => {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResizing);
  };

  const handleRefetch = async () => {
    try {
      const groupMembers = await getGroupMember({ groupID: ID }).unwrap();
      dispatch(setGroupMembers({ allGroupMembers: groupMembers.data }));
    } catch (err) {
      console.error("Error refetching group members:", err);
    }
  };

  if (refetchTheMembers) {
    handleRefetch();
    dispatch(refetchGroupMembers({ refetchTheMembers: false }));
  }

  useEffect(() => {
    return () => {
      stopResizing();
    };
  }, []);

  useEffect(() => {
    if (width === 80) {
      dispatch(reduceTheSize({ smallWidth: true }));
    } else if (width >= 300) {
      dispatch(reduceTheSize({ smallWidth: false }));
    }
  }, [width, dispatch]);

  useEffect(() => {
    try {
      const getGroups = async () => {
        dispatch(refetchGroup({ refetchGroupList: false }));
        const userGroups = await getUserGroups({
          userID: localStorage.getItem("id"),
        }).unwrap();
        dispatch(setGroups({ groups: userGroups }));
      };
      getGroups();
    } catch (error) {
      console.log(error);
    }
  }, [getUserGroups, dispatch, refetchGroupList]);

  useEffect(() => {
    dispatch(
      setGetUserGroupsIsLoading({
        getUserGroupsIsLoading: GetUserGroupsIsLoading,
      })
    );
  }, [dispatch, GetUserGroupsIsLoading]);

  return (
    <div
      style={isSS < 880 ? {} : { width: `${width}px` }}
      className={`relative  h-lvh w-[-webkit-fill-available]  smallLeft:w-[${width}px] smallLeft:max-w-[480px]  ${
        mode === "dark" ? "bg-main" : "bg-light_main"
      } `}
    >
      <Header smallWidth={smallWidth} />
      {getUserGroupsIsLoading ? (
        <LoadingSpinner spinnerColor={"#74b5e0"} />
      ) : (
        <div
          className={`h-[89.6%] aboveMobile:h-[90.5%]${
            groups?.length === 0 ? "  flex justify-center items-center" : ""
          } `}
        >
          {groups?.length === 0 ? (
            <p
              className={`
    ${mode === "dark" ? "text-white" : "text-text_light"}
    font-bold text-center  `}
            >
              Empty
            </p>
          ) : (
            <GroupList
              laftSideWidth={width}
              leftSide={true}
              data={groups || []}
              circle="min-w-12 min-h-12"
              circleBG={`${
                mode === "dark" ? "bg-secondary" : "bg-light_secondary"
              }`}
              faUserGroup={faUserGroup}
              hover={true}
              padding="py-6 px-2"
              pointer={true}
              text="text-xs font-bold"
              lastMessage={true}
              time={true}
              onClick={clickHandler}
              openTheGroup={true}
              smallWidth={smallWidth}
            />
          )}
        </div>
      )}

      <div
        className="absolute right-[-6px] top-0 h-full smallLeft:w-3 cursor-ew-resize "
        onMouseDown={startResizing}
      />
    </div>
  );
};

export default LeftSidebar;
