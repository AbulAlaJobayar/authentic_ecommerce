/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagType } from "../tagType";
import { baseApi } from "./baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProducts: build.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagType.Product],
    }),
    getAllProducts: build.query({
      query: ({
        page = 1,
        limit = 10,
        searchTerm = "",
        sortBy = "createdAt",
        sortOrder = "desc",
        isDeleted = undefined,
        status,
        categoryId,
      }) => ({
        url: "/product",
        method: "GET",
        params: {
          page,
          limit,
          searchTerm,
          status,
          sortBy,
          sortOrder,
          isDeleted,
          // only send if exists
          ...(status && { status }),
          ...(categoryId && { categoryId }),
        },
      }),
      transformResponse: (response: any) => ({
        data: response?.data || [],
        meta: response?.meta || {},
      }),
    }),
    getSingleProducts: build.query({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: [tagType.Product],
    }),
    updateProducts: build.mutation({
      query: ({
        id,
        data,
      }: {
        id: string;
        data: {
          name?: string;
          email?: string;
          phone?: string;
          address?: string;
          isDeleted?: boolean;
        };
      }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagType.Product],
    }),
    deleteProducts: build.mutation({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagType.Product],
    }),
  }),
});
export const {
  useCreateProductsMutation,
  useGetAllProductsQuery,
  useGetSingleProductsQuery,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
} = productsApi;
