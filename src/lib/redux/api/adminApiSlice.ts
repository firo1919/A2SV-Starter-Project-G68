import { RouteHandlerResponse } from "@/types/RouteHandler";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateCycle, CreateUser } from "../types/admin";
export const adminApi = createApi({
	reducerPath: "adminApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/admin/" }),
	endpoints: (builder) => ({
		createCycle: builder.mutation<RouteHandlerResponse, CreateCycle>({
			query: (data) => ({
				url: "application_cycle",
				method: "POST",
				body: data,
			}),
		}),
		updateCycle: builder.mutation<RouteHandlerResponse, { cycle: CreateCycle; id: string }>({
			query: (data) => ({
				url: `application_cycle/${data.id}`,
				method: "PUT",
				body: data.cycle,
			}),
		}),
		activateCycle: builder.mutation<RouteHandlerResponse, { id: string }>({
			query: (data) => ({
				url: `application_cycle/${data.id}/activate`,
				method: "PATCH",
			}),
		}),
		deActivateCycle: builder.mutation<RouteHandlerResponse, { id: string }>({
			query: (data) => ({
				url: `application_cycle/${data.id}/deactivate`,
				method: "PATCH",
			}),
		}),
		deleteCycle: builder.mutation<RouteHandlerResponse, { id: string }>({
			query: (data) => ({
				url: `application_cycle/${data.id}`,
				method: "DELETE",
			}),
		}),
		createUser: builder.mutation<RouteHandlerResponse, CreateUser>({
			query: (data) => ({
				url: "users",
				method: "POST",
				body: data,
			}),
		}),
		updateUser: builder.mutation<RouteHandlerResponse, { user: CreateUser; id: string }>({
			query: (data) => ({
				url: `users/${data.id}`,
				method: "PUT",
				body: data.user,
			}),
		}),
		deleteUser: builder.mutation<RouteHandlerResponse, { id: string }>({
			query: (data) => ({
				url: `users/${data.id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useActivateCycleMutation,
	useDeActivateCycleMutation,
	useCreateCycleMutation,
	useCreateUserMutation,
	useDeleteCycleMutation,
	useDeleteUserMutation,
	useUpdateCycleMutation,
	useUpdateUserMutation,
} = adminApi;
