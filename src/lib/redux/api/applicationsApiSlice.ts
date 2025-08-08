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
	}),
});

export const { useCreateApplicationMutation } = applicationsAPi;
