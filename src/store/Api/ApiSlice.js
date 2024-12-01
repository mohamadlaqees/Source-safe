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

    //GET_USERS
    getUsers: build.query({
      query: () => "folder/unallowed-users",
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useCreateNewGroupMutation,
  useGetUsersQuery,
} = apiSlice;
