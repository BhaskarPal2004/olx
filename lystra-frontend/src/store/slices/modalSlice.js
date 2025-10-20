import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: { adCreateModalVisible: false, locationChangeModalVisible: false, toggleForm: false },
    reducers: {
        setAdCreateModalVisible: (state, action) => { state.adCreateModalVisible = action.payload; },
        setLocationChangeModalVisible: (state, action) => { state.locationChangeModalVisible = action.payload; },
        setHandleToggleForm: (state, action) => { state.toggleForm = action.payload }

    }
})

export const { setLocationChangeModalVisible, setAdCreateModalVisible, setHandleToggleForm } = modalSlice.actions;
export default modalSlice.reducer;