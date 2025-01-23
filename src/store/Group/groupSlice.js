import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  ID: "",
  groups: [],
  openGroup: false,
  groupInfoTab: false,
  groupMembers: false,
  newGroup: false,
  dropDownList: false,
  refetchGroupList: false,
  selectedGroupMembers: [],
  allGroupMembers: [],
  addMembersFromGroup: false,
  refetchTheMembers: false,
  deletePrompt: false,
  removedUserName: "",
  removedUserID: "",
  refetchTheFiles: false,
  refetchTheBrows: false,
  groupFiles: [],
  groupInfo: {},
  browsGroupLoading: false,
  getUserGroupsIsLoading: false,
};

const groupSlice = createSlice({
  name: "groupSlice",
  initialState,
  reducers: {
    setGroupName: (state, action) => {
      state.name = action.payload.name;
    },
    setGroupID: (state, action) => {
      state.ID = action.payload.ID;
    },
    setGroups: (state, action) => {
      state.groups = action.payload.groups;
    },
    openGroup: (state, action) => {
      state.openGroup = action.payload.openGroup;
    },
    openDropDownList: (state, action) => {
      state.dropDownList = action.payload.dropDownList;
    },
    openGroupInfo: (state, action) => {
      state.groupInfoTab = action.payload.groupInfoTab;
    },
    openGroupMembers: (state, action) => {
      state.groupMembers = action.payload.groupMembers;
    },

    openNewGroup: (state, action) => {
      state.newGroup = action.payload.newGroup;
    },
    selectGroupMembers: (state, action) => {
      const checkIfExist = state.selectedGroupMembers.find(
        (member) => member.id === action.payload.id
      );
      !checkIfExist
        ? state.selectedGroupMembers.push(action.payload.selectedGroupMembers)
        : (state.selectedGroupMembers = state.selectedGroupMembers.filter(
            (member) => member.id != action.payload.id
          ));
    },
    clearGroupMembers: (state) => {
      state.selectedGroupMembers.length = 0;
    },
    removeGroupMember: (state, action) => {
      state.selectedGroupMembers = state.selectedGroupMembers.filter(
        (member) => member.id != action.payload.id
      );
    },
    refetchGroup: (state, action) => {
      state.refetchGroupList = action.payload.refetchGroupList;
    },
    setGroupMembers: (state, action) => {
      state.allGroupMembers = action.payload.allGroupMembers;
    },
    addMembersFromGroup: (state, action) => {
      state.addMembersFromGroup = action.payload.addMembersFromGroup;
    },
    refetchGroupMembers: (state, action) => {
      state.refetchTheMembers = action.payload.refetchTheMembers;
    },
    deleteAction: (state, action) => {
      state.deletePrompt = action.payload.deletePrompt;
    },
    setRemovedUserInfo: (state, action) => {
      state.removedUserID = action.payload.removedUserID;
      state.removedUserName = action.payload.removedUserName;
    },
    refetchGroupFiles: (state, action) => {
      state.refetchTheFiles = action.payload.refetchTheFiles;
    },
    setGroupFiles: (state, action) => {
      state.groupFiles = action.payload.groupFiles;
    },
    setBrowsGroupLoading: (state, action) => {
      state.browsGroupLoading = action.payload.browsGroupLoading;
    },
    setGetUserGroupsIsLoading: (state, action) => {
      state.getUserGroupsIsLoading = action.payload.getUserGroupsIsLoading;
    },
    setGroupInfo: (state, action) => {
      state.groupInfo = action.payload.groupInfo;
    },
    refetchBrowsGroup: (state, action) => {
      state.refetchTheBrows = action.payload.refetchTheBrows;
    },
  },
});

export default groupSlice.reducer;

export const {
  setGroupName,
  setGroupID,
  setGroups,
  openGroup,
  openDropDownList,
  openGroupInfo,
  openGroupMembers,
  openNewGroup,
  selectGroupMembers,
  clearGroupMembers,
  removeGroupMember,
  refetchGroup,
  setGroupMembers,
  addMembersFromGroup,
  refetchGroupMembers,
  deleteAction,
  setRemovedUserInfo,
  refetchGroupFiles,
  refetchBrowsGroup,
  setGroupFiles,
  setBrowsGroupLoading,
  setGetUserGroupsIsLoading,
  setGroupInfo,
} = groupSlice.actions;
