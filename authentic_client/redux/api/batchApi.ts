import { tagType } from "../tagType";
import { baseApi } from "./baseApi";

const batchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBatch: build.mutation({
      query: (data) => ({
        url: "/batch",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagType.batch],
    }),
  }),
});
export const { useCreateBatchMutation } = batchApi;
