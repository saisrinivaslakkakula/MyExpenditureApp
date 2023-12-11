import { BUDGET_URL } from "../constants";
import { apislice } from "./apiSlice";

export const usersApiSlice = apislice.injectEndpoints({
    endpoints: (builder) => ({
        addBudget: builder.mutation(
            {
                query: (args) => ({
                    url: `${BUDGET_URL}/category`,
                    method: 'POST',
                    body:args.body,
                    headers: {
                        Authorization:`${args.token}`,
                    },

                }),
            }),
            addExpense: builder.mutation(
                {
                    query: (args) => ({
                        url: `${BUDGET_URL}/expense`,
                        method: 'POST',
                        body:args.body,
                        headers: {
                            Authorization:`${args.token}`,
                        },
    
                    }),
                }),
    }),
})

export const {useAddBudgetMutation, useAddExpenseMutation} = usersApiSlice