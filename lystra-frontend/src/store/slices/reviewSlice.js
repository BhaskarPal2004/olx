import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
    name: "review",
    initialState: { adReviews: [] },
    reducers: {
        setAdReviews: (state, action) => { state.adReviews = action.payload; },
    }
})

export const { setAdReviews } = reviewSlice.actions;
export default reviewSlice.reducer;