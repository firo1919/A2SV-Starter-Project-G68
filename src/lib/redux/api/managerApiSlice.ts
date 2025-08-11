import { RouteHandlerResponse } from "@/types/RouteHandler";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApplicationDesicion, AssignedReviewer } from "../types/manager";
export const managerAPi = createApi({
	reducerPath: "managerAPi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/manager/applications/" }),
	endpoints: (builder) => ({
		assignReviewer: builder.mutation<RouteHandlerResponse, { reviewer: AssignedReviewer; id: string }>({
			query: (data) => ({
				url: `${data.id}/assign`,
				method: "PATCH",
				body: data.reviewer,
			}),
		}),
		decideApplication: builder.mutation<RouteHandlerResponse, { decision: ApplicationDesicion; id: string }>({
			query: (data) => ({
				url: `${data.id}/decide`,
				method: "PATCH",
				body: data.decision,
			}),
		}),
	}),
});

export const { useAssignReviewerMutation, useDecideApplicationMutation } = managerAPi;
