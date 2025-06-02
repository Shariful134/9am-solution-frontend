import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    Login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/auth/get-user/${id}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useRegisterUserMutation, useLoginMutation, useGetUserQuery } =
  authApi;
