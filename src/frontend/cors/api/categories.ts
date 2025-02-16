import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "../../types";

export const categoryApi = createApi({
	reducerPath: "categoryApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
	tagTypes: ["Category"],
	endpoints: (builder) => ({
		getCategories: builder.query<Category[], void>({
			query: () => "/categories",
			providesTags: (result) => {
				const tags: { type: "Category", id?: string }[] = result ? result.map(({ id }) => ({ type: "Category", id })) : []
				tags.push({ type: "Category" })
				return tags
			},
			transformResponse: (response: Category[]) => response.sort((a, b) => a.name.localeCompare(b.name))
		}),
		putCategory: builder.mutation<Category, Partial<Category>>({
			query: (category) => ({
				url: `/categories/${category.id}`,
				method: "PUT",
				body: category,
			}),
			async onQueryStarted(category, { queryFulfilled, dispatch }) {
				await queryFulfilled
				if (category.id) {
					dispatch(
						categoryApi.util.updateQueryData("getCategories", undefined, (categories) => {
							return categories.map((c) => c.id === category.id ? category : c).sort((a, b) => a.name?.localeCompare(b.name || "") || 0) as Category[]
						})
					)
				}
			},
		}),
		postCategory: builder.mutation<Category, Partial<Category>>({
			query: (category) => ({
				url: "/categories",
				method: "POST",
				body: category,
			}),
			async onQueryStarted(category, { queryFulfilled, dispatch }) {
				const { data: newCategory } = await queryFulfilled
				console.log(newCategory)
				dispatch(categoryApi.util.updateQueryData("getCategories", undefined, (categories) => {
					return [...categories, newCategory].sort((a, b) => a.name.localeCompare(b.name)) as Category[]
				}))
			},
		}),
		deleteCategory: builder.mutation<Category, string>({
			query: (id) => ({
				url: `/categories/${id}`,
				method: "DELETE",
			}),
			async onQueryStarted(id, { queryFulfilled, dispatch }) {
				await queryFulfilled
				dispatch(categoryApi.util.updateQueryData("getCategories", undefined, (categories) => {
					return categories.filter((c) => c.id !== id) as Category[]
				}))
			},
		}),
	}),

});

export const { useGetCategoriesQuery, usePutCategoryMutation, usePostCategoryMutation, useDeleteCategoryMutation } = categoryApi;
