/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagType } from "../tagType";
import { baseApi } from "./baseApi";

const inventoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllInventory: build.query({
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
        url: "/inventory",
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
    }),
    getSingleInventory: build.query({
      query: (id: string) => ({
        url: `/inventory/${id}`,
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
          sku?: string;
          description?: string;
          image?: any;
          status?: string;
          sellingPrice?: number;
        };
      }) => ({
        url: `/inventory/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagType.Inventory],
    }),
    deleteInventory: build.mutation({
      query: (id: string) => ({
        url: `/inventory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagType.Inventory],
    }),
  }),
});
export const {
  useGetAllInventoryQuery,
  useGetSingleInventoryQuery,
  useDeleteInventoryMutation,
} = inventoryApi;
