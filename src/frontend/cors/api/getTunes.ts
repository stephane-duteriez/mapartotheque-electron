import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tune } from "../../types";

export const tuneApi = createApi({
	reducerPath: "tuneApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
	tagTypes: ["Tune"],
	endpoints: (builder) => ({
		getTunes: builder.query<Tune[], void>({
			query: () => "/tunes",
		}),
	}),
});

export const { useGetTunesQuery } = tuneApi;
