import { axiosBaseQuery } from "@/helper/axios/axiosBaseQuery";

import { tagTypeList } from "../tagtype";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DATABASE_URL}`,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypeList,
});
