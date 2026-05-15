/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagType } from "../tagType";
import { baseApi } from "./baseApi";

const warehouseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createWarehouse: build.mutation({
      query: (data) => ({
        url: "/warehouse",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagType.Warehouse],
    }),
    allWarehouse: build.query({
      query: ({
        page = 1,
        limit = 10,
        searchTerm = "",
        sortBy = "createdAt",
        sortOrder = "desc",
        isDeleted = undefined,
      }) => ({
        url: "/warehouse",
        method: "GET",
        params: {
          page,
          limit,
          searchTerm,
          sortBy,
          sortOrder,
          isDeleted,
        },
        transformResponse: (response: any) => ({
          data: response?.data || [],
          meta: response?.meta || {},
        }),
        providesTags: [tagType.Warehouse],
      }),
    }),
    getSingleWarehouse: build.query({
      query: (id: string) => ({
        url: `/warehouse/${id}`,
        method: "GET",
      }),
      providesTags: [tagType.Warehouse],
    }),
    updateWarehouse: build.mutation({
      query: ({
        id,
        data,
      }: {
        id: string;
        data: { name?: string; address?: string };
      }) => ({
        url: `/warehouse/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagType.Warehouse],
    }),
    deleteWarehouse: build.mutation({
      query: (id: string) => ({
        url: `/warehouse/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagType.Warehouse],
    }),
  }),
});
export const {
  useCreateWarehouseMutation,
  useAllWarehouseQuery,
  useGetSingleWarehouseQuery,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
} = warehouseApi;
