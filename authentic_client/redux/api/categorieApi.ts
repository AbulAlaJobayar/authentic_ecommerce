/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagType } from "../tagType";
import { baseApi } from "./baseApi";

export type TCategoryQuery = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagType.category],
    }),
    allCategory: build.query({
      query: ({ page, limit, searchTerm, sortBy, sortOrder, isDeleted }) => ({
        url: "/category",
        method: "GET",
        params: {
          page,
          limit,
          searchTerm,
          sortBy,
          sortOrder,
          isDeleted,
        },
      }),

      transformResponse: (response: any) => ({
        data: response?.data || [],
        meta: response?.meta || {},
      }),
      providesTags: [tagType.category],
    }),
  
    getSingleCategory: build.query({
      query: (id: string) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: [tagType.category],
    }),
    updateCategory: build.mutation({
      query: ({
        id,
        data,
      }: {
        id: string;
        data: { name?: string; image?: string };
      }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagType.category],
    }),
    deleteCategory: build.mutation({
      query: (id: string) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagType.category],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useAllCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

} = categoryApi;
