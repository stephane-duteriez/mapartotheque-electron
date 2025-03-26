import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storageApi = createApi({
	reducerPath: "storageApi",
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
	tagTypes: ["Storage"],
	endpoints: (builder) => ({
		uploadFile: builder.mutation<{ url: string }, { file: FormData }>({
			query: ({ file }) => ({
				url: "/storage/upload",
				method: "POST",
				body: file,
				formData: true,
			}),
		}),
	}),
});

export const { useUploadFileMutation } = storageApi;

export type UploadFileMutation = ReturnType<typeof storageApi.useUploadFileMutation>[0];

