import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accountingApi = createApi({
  reducerPath: "accountingApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3032" }),
  endpoints: (builder) => ({
    getAccounting: builder.query({
      query: () => "accounting",
      providesTags: ["Accounting"],
    }),
    addAccounting: builder.mutation({
      query: (newUser) => ({
        url: "accounting",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Accounting"],
    }),
    deleteAccounting: builder.mutation({
      query: (id) => ({
        url: `accounting/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Accounting"],
    }),
  }),
});

export const {
  useGetAccountingQuery,
  useAddAccountingMutation,
  useDeleteAccountingMutation,
} = accountingApi;
