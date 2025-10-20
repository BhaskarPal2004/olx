import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: "transaction",
    initialState: { startDate: null,endDate: null},
    reducers: {
        setStartDate: (state, action) => { state.startDate = action.payload; },
        setEndDate: (state, action) => { state.endDate = action.payload; },
    }
})

export const { setStartDate,setEndDate } = transactionSlice.actions;
export default transactionSlice.reducer;