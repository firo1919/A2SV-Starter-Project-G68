import { RouteHandlerResponse } from "@/types/RouteHandler";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddReview } from "../types/reviews";
export const reviewsApi = createApi({
	reducerPath: "reviewsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/reviewer/" }),
	endpoints: (builder) => ({
		addReview: builder.mutation<RouteHandlerResponse, { review: AddReview; id: string }>({
			query: (data) => ({
				url: data.id,
				method: "PUT",
				body: data.review,
			}),
		}),
	}),
});

export const { useAddReviewMutation } = reviewsApi;
