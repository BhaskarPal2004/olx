import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import useSetSocket from "@/hooks/chat/useSetSocket";
import { setMessageList } from "@/store/slices/chatSlice";

const useGetMessages = () => {
    const dispatch = useDispatch();
    const socket = useSetSocket();
    const { receiverId, messageList } = useSelector(store => store.chat);
    const { chatApi } = useAxiosInstance();

    const getMessages = useCallback(async () => {
        if (!receiverId) return;

        try {
            const res = await chatApi.get(`/get/messages/${receiverId}`);
            if (res?.success) {
                dispatch(setMessageList(res.data));
            }
        } catch (error) {
            console.log("Error fetching messages:", error);
        }
    }, [chatApi, dispatch, receiverId]);

    const subscribeToMessages = useCallback(() => {
        if (!socket?.current) return;

        const handleNewMessage = (newMessage) => {
            if (newMessage.senderId === receiverId) {
                dispatch(setMessageList([...messageList, newMessage]));
            }
        };

        socket.current.on("newMessage", handleNewMessage);

        return () => {
            socket.current.off("newMessage", handleNewMessage);
        };
    }, [socket, receiverId, dispatch, messageList]);

    useEffect(() => {
        getMessages();
    }, [getMessages]);

    useEffect(() => {
        const unsubscribe = subscribeToMessages();
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [subscribeToMessages]);

};

export default useGetMessages;
