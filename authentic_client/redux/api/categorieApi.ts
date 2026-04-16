
const agentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAgent: build.mutation({
      query: (data) => ({
        url: "/agent/create_agent",
        method: "POST",
        data
      }),
      invalidatesTags:[tagType.agent]
    }),
    allAgent: build.query({
      query: () => ({
        url: "/agent/all_agent",
        method: "GET",
      }),
     providesTags:[tagType.agent]
    }),
    approvedAgent: build.mutation({
      query: (data) => ({
        url: "/agent/approved_agent",
        method: "PUT",
        data
      }),
     invalidatesTags:[tagType.agent]
    }),
  }),
});
export const {useCreateAgentMutation,useAllAgentQuery,useApprovedAgentMutation} =agentApi;