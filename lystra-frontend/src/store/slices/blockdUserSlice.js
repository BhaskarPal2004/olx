import { createSlice } from "@reduxjs/toolkit";

const blockUserSlice = createSlice({
    name: "blockedUser",
    initialState: { blockUser: [] },
    reducers: {
        setBlockUser: (state, action) => { state.blockUser = action.payload; },
    }
})

export const { setBlockUser } = blockUserSlice.actions;
export default blockUserSlice.reducer;
