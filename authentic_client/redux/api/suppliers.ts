import { tagType } from "../tagType";
import { baseApi } from "./baseApi";

const suppliersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSuppliers: build.mutation({
      query: (data) => ({
        url: "/suppliers",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagType.suppliers],
    }),
    getAllSuppliers: build.query({
      query: ({
        page = 1,
        limit = 10,
        searchTerm = "",
        sortBy = "createdAt",
        sortOrder = "desc",
        isDeleted = undefined,
      }) => ({
        url: "/suppliers",
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
    }),
    getSingleSuppliers: build.query({
      query: (id: string) => ({
        url: `/suppliers/${id}`,
        method: "GET",
      }),
      providesTags: [tagType.suppliers],
    }),
    updateSuppliers: build.mutation({
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
        };
      }) => ({
        url: `/suppliers/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagType.suppliers],
    }),
    deleteSuppliers: build.mutation({
      query: (id: string) => ({
        url: `/suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagType.suppliers],
    }),
  }),
});
export const {
  useCreateSuppliersMutation,
  useGetAllSuppliersQuery,
  useGetSingleSuppliersQuery,
  useUpdateSuppliersMutation,
  useDeleteSuppliersMutation,
} = suppliersApi;
