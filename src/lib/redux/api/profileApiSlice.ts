import { RouteHandlerResponse } from "@/types/RouteHandler";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChangePassword, UpdateProfile } from "../types/profiles";
export const profilesApi = createApi({
	reducerPath: "profilesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/profile/me/" }),
	endpoints: (builder) => ({
		getProfile: builder.query<RouteHandlerResponse, void>({
			query: () => ({
				url: "",
				method: "GET",
			}),
		}),
		updatePassword: builder.mutation<RouteHandlerResponse, ChangePassword>({
			query: (data) => ({
				url: "",
				method: "PATCH",
				body: data,
			}),
		}),
		updateProfile: builder.mutation<RouteHandlerResponse, UpdateProfile>({
			query: (data) => ({
				url: "change-password",
				method: "PUT",
				body: data,
			}),
		}),
	}),
});

export const { useGetProfileQuery, useUpdatePasswordMutation, useUpdateProfileMutation } = profilesApi;
