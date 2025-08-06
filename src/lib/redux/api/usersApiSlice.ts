import { AuthResponse, User } from "@/types/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/users/" }),
	endpoints: (builder) => ({
		registerUser: builder.mutation<AuthResponse, User>({
			query: (data) => ({
				url: "register",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useRegisterUserMutation } = usersApi;
