import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateApplicationResponse } from "../types/applications";

export const applicationsAPi = createApi({
	reducerPath: "applicationsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/applications/" }),
	endpoints: (builder) => ({
		createApplication: builder.mutation<CreateApplicationResponse, FormData>({
			query: (data) => ({
				url: "",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useCreateApplicationMutation } = applicationsAPi;
