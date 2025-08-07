import { configureStore } from "@reduxjs/toolkit";
import { applicationsAPi } from "./api/applicationsApiSlice";
import { usersApi } from "./api/usersApiSlice";

export const store = configureStore({
	reducer: {
		[usersApi.reducerPath]: usersApi.reducer,
		[applicationsAPi.reducerPath]: applicationsAPi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(usersApi.middleware, applicationsAPi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
