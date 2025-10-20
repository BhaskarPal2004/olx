import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { userLocation: { lat: null, lng: null, city: null, locality: null },follower:[],following:[] },
    reducers: {
        setUserLocation: (state, action) => { state.userLocation = action.payload },
        setFollower: (state,action) => {state.follower = action.payload},
        setFollowing: (state,action) => {state.following = action.payload}
    }
})

export const { setUserLocation, setFollower, setFollowing } = userSlice.actions;
export default userSlice.reducer;