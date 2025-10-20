import { createSlice } from "@reduxjs/toolkit";

const blockAndReportSlice = createSlice({
    name: "blockAndReport",
    initialState: { isBlocked: false, isReported:false },
    reducers: {
        setBlock: (state, action) => { state.isBlocked = action.payload },
        setReported:(state,action) => { state.isReported = action.payload }
    }
})

export const { setBlock,setReported } = blockAndReportSlice.actions;
export default blockAndReportSlice.reducer;

