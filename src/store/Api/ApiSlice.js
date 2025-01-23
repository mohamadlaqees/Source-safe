import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    //Register
    register: build.mutation({
      query: (userInfo) => ({
        url: "auth/register",
        method: "POST",
        body: {
          user_name: userInfo.username,
          password: userInfo.password,
          email: userInfo.email,
        },
      }),
    }),

    //Login
    login: build.mutation({
      query: (userInfo) => ({
        url: "auth/login",
        method: "POST",
        body: {
          user_name: userInfo.username,
          password: userInfo.password,
          email: userInfo.email,
        },
      }),
    }),

    //Logout
    logout: build.mutation({
      query: () => ({
        url: "auth/logout",
        method: "GET",
      }),
    }),

    //GET_USERS
    getUsers: build.query({
      query: () => "auth/user",
    }),

    //CREATE_GROUP
    createNewGroup: build.mutation({
      query: (groupInfo) => ({
        url: "folder/create",
        method: "POST",
        body: {
          title: groupInfo.title,
          security: "public",
        },
      }),
    }),

    //BROWS_GROUP
    browsGroup: build.mutation({
      query: ({ groupID }) => ({
        url: `folder/brows/${groupID}`,
        method: "GET",
      }),
    }),

    //GET_USER'S_GROUPS
    getUserGroups: build.mutation({
      query: ({ userID }) => ({
        url: `file/user/${userID}/folders-with-files`,
        method: "GET",
      }),
    }),

    //GET_GROUPS
    getGroups: build.query({
      query: () => "folder/list",
    }),

    //DELETE_GROUP
    deleteGroup: build.mutation({
      query: (groupId) => ({
        url: "folder/delete",
        method: "POST",
        body: {
          folder: groupId.id,
        },
      }),
    }),

    //GET_GROUPMEMBERS
    getGroupMembers: build.mutation({
      query: ({ groupID }) => ({
        url: `folder/allowed-users/${groupID}`,
        method: "GET",
      }),
    }),

    //SEARCH_USERS
    searchUsers: build.mutation({
      query: ({ userName }) => ({
        url: `file/usersearch/${userName}`,
        method: "GET",
      }),
    }),

    //GET_GROUPNOTMEMBERS
    getNotMembers: build.mutation({
      query: ({ groupID }) => {
        return {
          url: `folder/unallowed-users/${groupID}`,
          method: "GET",
        };
      },
    }),

    //ADD_USERS
    addUsers: build.mutation({
      query: (users) => ({
        url: "folder/add-permission",
        method: "POST",
        body: {
          folder: users.group,
          users: users.users,
        },
      }),
    }),

    //DELETE_PERMISSION
    deletePermission: build.mutation({
      query: ({ groupID, memberID }) => ({
        url: "folder/delete-permission",
        method: "POST",
        body: {
          folder: groupID,
          user: memberID,
        },
      }),
    }),

    //FILE

    //UPLOAD_FILE
    uploadFile: build.mutation({
      query: ({ groupID, file }) => {
        const formData = new FormData();
        formData.append("folder", groupID);
        formData.append("file", file);
        return {
          url: "file/upload",
          method: "POST",
          body: formData,
        };
      },
    }),

    //DELETE_FILE
    deleteFile: build.mutation({
      query: ({ file }) => ({
        url: "file/delete",
        method: "POST",
        body: {
          file,
        },
      }),
    }),

    //DOWNLOAD_FILE
    downlaodFile: build.mutation({
      query: ({ fileID }) => ({
        url: `file/download/${fileID}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),

    //CHECK-IN_FILE
    checkInFile: build.mutation({
      query: ({ filesIDs }) => {
        const formData = new FormData();
        filesIDs.forEach((fileID, index) => {
          formData.append(`ids[${index}]`, fileID);
        });
        return {
          url: "file/check-in",
          method: "POST",
          body: formData,
        };
      },
    }),

    //CHECK-OUT_FILE
    checkOutFile: build.mutation({
      query: ({ fileID, newFile }) => {
        const File = new FormData();
        File.append("file", fileID);
        File.append("newFile", newFile);
        return {
          url: "file/check-out",
          method: "POST",
          body: File,
        };
      },
    }),

    //FILE_HISTORY
    getFileHistory: build.mutation({
      query: ({ fileID }) => ({
        url: `file/history/${fileID}`,
        method: "GET",
      }),
    }),

    //FILE_BACKUPS
    getFileBackups: build.mutation({
      query: ({ fileID }) => ({
        url: `file/files/backups/${fileID}`,
        method: "GET",
      }),
    }),

    //NOTIFICATIONS
    getNotifications: build.query({
      query: () => "file/show/allnotification",
    }),

    //UNREAD_NOTIFICATIONS
    getUnreadNotifications: build.query({
      query: () => "file/show/unread",
    }),

    //SYSTEM_USERS_REPORTS
    getSystemUsersReports: build.query({
      query: () => "logging",
    }),

    //EXPORT_FILES_REPORTS
    downlaodFilesReports: build.mutation({
      query: () => ({
        url: "file/downloadPDF",
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUsersQuery,
  useCreateNewGroupMutation,
  useAddUsersMutation,
  useGetGroupsQuery,
  useGetUserGroupsMutation,
  useDeleteGroupMutation,
  useBrowsGroupMutation,
  useGetGroupMembersMutation,
  useSearchUsersMutation,
  useGetNotMembersMutation,
  useDeletePermissionMutation,
  useUploadFileMutation,
  useCheckInFileMutation,
  useCheckOutFileMutation,
  useDownlaodFileMutation,
  useDeleteFileMutation,
  useGetFileHistoryMutation,
  useGetFileBackupsMutation,
  useGetNotificationsQuery,
  useGetUnreadNotificationsQuery,
  useGetSystemUsersReportsQuery,
  useDownlaodFilesReportsMutation,
} = apiSlice;
