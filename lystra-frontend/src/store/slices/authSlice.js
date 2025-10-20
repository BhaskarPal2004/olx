import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { registerRole: null, loading: false, user: null, role: null, accessToken: null, refreshToken: null },
    reducers: {
        setRegisterRole: (state, action) => { state.registerRole = action.payload; },
        setLoading: (state, action) => { state.loading = action.payload; },
        setUser: (state, action) => { state.user = action.payload; },
        setName: (state, action) => { state.user.name = action.payload },
        setPhoneNumber: (state, action) => { state.user.phoneNumber = action.payload },
        setRole: (state, action) => { state.role = action.payload; },
        setAccessToken: (state, action) => { state.accessToken = action.payload; },
        setRefreshToken: (state, action) => { state.refreshToken = action.payload; },
    }
})

export const { setRegisterRole, setLoading, setUser, setRole, setAccessToken, setRefreshToken, setName, setPhoneNumber } = authSlice.actions;
export default authSlice.reducer;