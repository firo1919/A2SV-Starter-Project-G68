import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./api/adminApiSlice";
import { applicationsAPi } from "./api/applicationsApiSlice";
import { managerAPi } from "./api/managerApiSlice";
import { profilesApi } from "./api/profileApiSlice";
import { reviewsApi } from "./api/reviewsApiSlice";
import { usersApi } from "./api/usersApiSlice";

export const store = configureStore({
	reducer: {
		[usersApi.reducerPath]: usersApi.reducer,
		[applicationsAPi.reducerPath]: applicationsAPi.reducer,
		[profilesApi.reducerPath]: profilesApi.reducer,
		[reviewsApi.reducerPath]: reviewsApi.reducer,
		[managerAPi.reducerPath]: managerAPi.reducer,
		[adminApi.reducerPath]: adminApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			usersApi.middleware,
			applicationsAPi.middleware,
			profilesApi.middleware,
			reviewsApi.middleware,
			managerAPi.middleware,
			adminApi.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
