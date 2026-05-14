/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagType } from "../tagtype";
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
      query: ({
        page = 1,
        limit = 10,
        searchTerm = "",
        sortBy = "createdAt",
        sortOrder = "desc",
        isDeleted=undefined
      }) => ({
        url: "/category",
        method: "GET",
         params: {
          page,
          limit,
          searchTerm,
          sortBy,
          sortOrder,
          isDeleted
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
  // approvedAgent: build.mutation({
  //   query: (data) => ({
  //     url: "/agent/approved_agent",
  //     method: "PUT",
  //     data
  //   }),
  //  invalidatesTags:[tagType.agent]
  // }),
});

export const {
  useCreateCategoryMutation,
  useAllCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
