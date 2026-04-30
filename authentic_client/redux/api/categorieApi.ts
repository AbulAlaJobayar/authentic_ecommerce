
import { tagType } from "../tagtype";
import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        data
      }),
      invalidatesTags:[tagType.category]
    }),
    allCategory: build.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
     providesTags:[tagType.category]
    }),
    // approvedAgent: build.mutation({
    //   query: (data) => ({
    //     url: "/agent/approved_agent",
    //     method: "PUT",
    //     data
    //   }),
    //  invalidatesTags:[tagType.agent]
    // }),
  }),
});

export const {useCreateCategoryMutation,useAllCategoryQuery} =categoryApi;