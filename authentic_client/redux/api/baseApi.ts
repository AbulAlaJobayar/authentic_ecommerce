import { axiosBaseQuery } from "@/helper/axios/axiosBaseQuery";


import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypeList } from "../tagType";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DATABASE_URL}`,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypeList,
});
