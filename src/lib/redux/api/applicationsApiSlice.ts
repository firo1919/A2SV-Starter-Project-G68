import { RouteHandlerResponse } from "@/types/RouteHandler";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicationsAPi = createApi({
	reducerPath: "applicationsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/applications/" }),
	endpoints: (builder) => ({
		createApplication: builder.mutation<RouteHandlerResponse, FormData>({
			query: (data) => ({
				url: "",
				method: "POST",
				body: data,
			}),
		}),
		updateApplication: builder.mutation<RouteHandlerResponse, { application: FormData; id: string }>({
			query: (data) => ({
				url: data.id,
				method: "PUT",
				body: data.application,
			}),
		}),
		deleteApplication: builder.mutation<RouteHandlerResponse, { id: string }>({
			query: (data) => ({
				url: data.id,
				method: "DELETE",
			}),
		}),
		submitApplication: builder.mutation<RouteHandlerResponse, { id: string }>({
			query: (data) => ({
				url: data.id,
				method: "PATCH",
			}),
		}),
	}),
});

export const {
	useCreateApplicationMutation,
	useDeleteApplicationMutation,
	useSubmitApplicationMutation,
	useUpdateApplicationMutation,
} = applicationsAPi;
