import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "../../types";

export const categoryApi = createApi({
	reducerPath: "categoryApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
	tagTypes: ["Category"],
	endpoints: (builder) => ({
		getCategories: builder.query<Category[], void>({
			query: () => "/categories",
		}),
	}),

});

export const { useGetCategoriesQuery } = categoryApi;
