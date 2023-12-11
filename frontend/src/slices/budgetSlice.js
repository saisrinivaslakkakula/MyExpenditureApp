import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    budgetInfo:null,
    expenseInfo:null,
}

const bedgetSlice = createSlice({
    name : 'budget',
    initialState,
    reducers : {
        budget: (state,action) => {
            state.budgetInfo = action.payload;
        },
        expense: (state,action) => {
            state.expenseInfo = action.payload;
        },
    },
})

export const {budget,expense} = bedgetSlice.actions;
export default bedgetSlice.reducer;