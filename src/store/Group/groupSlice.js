import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  groupInfo: false,
  groupMembers: false,
  newGroup: false,
  filesBackups: false,
  resetGroupName: false,
  dropDownList: false,
  selectedGroupMembers: [],
  content: [{}],
};

const groupSlice = createSlice({
  name: "groupSlice",
  initialState,
  reducers: {
    openGroup: (state, action) => {
      state.name = action.payload.name;
    },
    openDropDownList: (state, action) => {
      state.dropDownList = action.payload.dropDownList;
    },
    openGroupInfo: (state, action) => {
      state.groupInfo = action.payload.groupInfo;
    },
    openGroupMembers: (state, action) => {
      state.groupMembers = action.payload.groupMembers;
    },
    openFilesBackups: (state, action) => {
      state.filesBackups = action.payload.filesBackups;
    },
    createGroup: (state, action) => {
      state.newGroup = action.payload.newGroup;
    },
    triggerGroupNameReset: (state) => {
      state.resetGroupName = !state.resetGroupName;
    },
    selectGroupMembers: (state, action) => {
      const checkIfExist = state.selectedGroupMembers.find(
        (member) => member.id === action.payload.id
      );
      !checkIfExist
        ? state.selectedGroupMembers.push(action.payload.selectGroupMembers)
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
  },
});

export default groupSlice.reducer;

export const {
  openGroup,
  openDropDownList,
  openGroupInfo,
  openGroupMembers,
  createGroup,
  triggerGroupNameReset,
  selectGroupMembers,
  clearGroupMembers,
  removeGroupMember,
  openFilesBackups,
} = groupSlice.actions;
