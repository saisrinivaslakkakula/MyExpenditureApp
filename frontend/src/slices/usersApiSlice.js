import { USERS_URL } from "../constants";
import { apislice } from "./apiSlice";

export const usersApiSlice = apislice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation(
            {
                query: (data) => ({
                    url: `${USERS_URL}/signup`,
                    method: 'POST',
                    body: data,

                }),
            }),
        login: builder.mutation(
            {
                query: (data) => ({
                    url: `${USERS_URL}/login`,
                    method: 'POST',
                    body: data,

                }),
            }),
        logout: builder.mutation(
            {
                query: (data) => ({
                    url: `${USERS_URL}/logout`,
                    method: 'POST',
                }),
            }),
    }),
})

export const {useLoginMutation, useLogoutMutation, useRegisterMutation} = usersApiSlice