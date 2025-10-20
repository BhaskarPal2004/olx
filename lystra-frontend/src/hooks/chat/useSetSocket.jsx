import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';


const useSetSocket = () => {
    const socketRef = useRef(null);
    const senderId = useSelector(store => store.auth.user._id)

    useEffect(() => {
        socketRef.current = io("http://localhost:3000", {
            query: { userId: senderId },
        });

        return () => {
            socketRef.current.disconnect();
        };

    }, [senderId]);

    return socketRef;
};

export default useSetSocket;