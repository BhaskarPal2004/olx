import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messageList: [],
        chatUserList: [],
        receiverId: null,
        currentReceiver: null,
        currentMessage: "",
        imagePreview: null
    },
    reducers: {
        setMessageList: (state, action) => { state.messageList = action.payload; },
        setChatUserList: (state, action) => { state.chatUserList = action.payload; },
        setReceiverId: (state, action) => { state.receiverId = action.payload; },
        setCurrentReceiver: (state, action) => { state.currentReceiver = action.payload; },
        setCurrentMessage: (state, action) => { state.currentMessage = action.payload; },
        setImagePreview: (state, action) => { state.imagePreview = action.payload; },
    }
})

export const { setMessageList, setChatUserList, setReceiverId, setCurrentReceiver, setCurrentMessage, setImagePreview } = chatSlice.actions;
export default chatSlice.reducer;