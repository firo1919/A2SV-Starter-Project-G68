import { User } from "@/types/auth";
import { RouteHandlerResponse } from "@/types/RouteHandler";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const profilesApi = createApi({
	reducerPath: "profilesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/profile/me/" }),
	endpoints: (builder) => ({
		registerUser: builder.mutation<RouteHandlerResponse, User>({
			query: (data) => ({
				url: "register",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useRegisterUserMutation } = profilesApi;
