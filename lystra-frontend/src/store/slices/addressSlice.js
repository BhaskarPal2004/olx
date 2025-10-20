import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
    name: "address",
    initialState: { address: {} ,changeAddress: {}},
    reducers: {
        setAddress: (state, action) => { state.address = action.payload },
        setChangeAddress: (state, action) => { state.changeAddress =action.payload}
    }
})

export const { setAddress, setChangeAddress } = addressSlice.actions;
export default addressSlice.reducer;