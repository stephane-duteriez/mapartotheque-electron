import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tune } from "../../../types/tune";

export const tuneApi = createApi({
	reducerPath: "tuneApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000/api",
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("token")
			if (token) {
				headers.set("Authorization", token)
			}
			return headers
		}
	}),
	tagTypes: ["Tune"],
	endpoints: (builder) => ({
		getTunes: builder.query<Tune[], void>({
			query: () => "/tunes",
			providesTags: (result) => {
				const tags: { type: "Tune", id?: string }[] = result ? result.map(({ id }) => ({ type: "Tune", id })) : []
				tags.push({ type: "Tune" })
				return tags
			},
			transformResponse: (response: Tune[]) => response.sort((a, b) => a.name.localeCompare(b.name))
		}),
		putTune: builder.mutation<Tune, Partial<Tune>>({
			query: (tune) => ({
				url: `/tunes/${tune.id}`,
				method: "PUT",
				body: tune,
			}),
			async onQueryStarted(tune, { queryFulfilled, dispatch }) {
				await queryFulfilled
				if (tune.id) {
					dispatch(
						tuneApi.util.updateQueryData("getTunes", undefined, (tunes) => {
							return tunes.map((t) => t.id === tune.id ? tune : t).sort((a, b) => a.name?.localeCompare(b.name || "") || 0) as Tune[]
						})
					)
				}
			},
		}),
		postTune: builder.mutation<Tune, Partial<Tune>>({
			query: (tune) => ({
				url: "/tunes",
				method: "POST",
				body: tune,
			}),
			async onQueryStarted(tune, { queryFulfilled, dispatch }) {
				const { data: newTune } = await queryFulfilled
				dispatch(tuneApi.util.updateQueryData("getTunes", undefined, (tunes) => {
					return [...tunes, newTune].sort((a, b) => a.name.localeCompare(b.name)) as Tune[]
				}))
			},
		}),
		deleteTune: builder.mutation<Tune, string>({
			query: (id) => ({
				url: `/tunes/${id}`,
				method: "DELETE",
			}),
			async onQueryStarted(id, { queryFulfilled, dispatch }) {
				await queryFulfilled
				dispatch(tuneApi.util.updateQueryData("getTunes", undefined, (tunes) => {
					return tunes.filter((t) => t.id !== id) as Tune[]
				}))
			},
		}),
	}),

});

export const { useGetTunesQuery, usePutTuneMutation, usePostTuneMutation, useDeleteTuneMutation } = tuneApi;
