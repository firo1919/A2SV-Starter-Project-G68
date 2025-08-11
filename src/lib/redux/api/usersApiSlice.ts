import { User } from "@/types/auth";
import { RouteHandlerResponse } from "@/types/RouteHandler";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ForgotUserPass, ResetUserPass } from "../types/users";
export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/users/" }),
	endpoints: (builder) => ({
		registerUser: builder.mutation<RouteHandlerResponse, User>({
			query: (data) => ({
				url: "register",
				method: "POST",
				body: data,
			}),
		}),
		forgotPassword: builder.mutation<RouteHandlerResponse, ForgotUserPass>({
			query: (data) => ({
				url: "forgot-password",
				method: "POST",
				body: data,
			}),
		}),
		resetPassword: builder.mutation<RouteHandlerResponse, ResetUserPass>({
			query: (data) => ({
				url: "reset-password",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useRegisterUserMutation, useForgotPasswordMutation, useResetPasswordMutation } = usersApi;
