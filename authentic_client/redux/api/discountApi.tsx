/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagType } from "../tagType";
import { baseApi } from "./baseApi";

const discountApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDiscount: build.mutation({
            query: (data) => ({
                url: "/discount",
                method: "POST",
                data,
            }),
            invalidatesTags: [tagType.discount],
        }),
        allDiscount: build.query({
            query: () => ({
                url: "/discount",
                method: "GET",
                providesTags: [tagType.discount],
            }),
        }),
        getSingleDiscount: build.query({
            query: (id: string) => ({
                url: `/discount/${id}`,
                method: "GET",
            }),
            providesTags: [tagType.discount],
        }),
        updateDiscount: build.mutation({
            query: ({
                id,
                data,
            }: {
                id: string;
                data:any
            }) => ({
                url: `/warehouse/${id}`,
                method: "PUT",
                data,
            }),
            invalidatesTags: [tagType.discount],
        }),
        deleteDiscount: build.mutation({
            query: (id: string) => ({
                url: `/discount/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagType.discount],
        }),
    }),
});
export const {
 useAllDiscountQuery,
 useCreateDiscountMutation,
 useDeleteDiscountMutation,
 useGetSingleDiscountQuery,
 useUpdateDiscountMutation
} = discountApi;
