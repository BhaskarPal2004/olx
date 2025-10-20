import { Paperclip } from "lucide-react";
import sendBtn from '@/assets/chat/sendBtn.svg';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMessage, setImagePreview, setMessageList } from "@/store/slices/chatSlice";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import toast from "react-hot-toast";

const ChatInput = ({ chatInputRef }) => {
    const receiverId = useSelector(store => store.chat.receiverId);
    const { chatApi } = useAxiosInstance();
    const fileInputRef = useRef(null);
    const submitButtonRef = useRef(null);
    const currentMessage = useSelector((store) => store.chat.currentMessage);
    const messageList = useSelector(store => store.chat.messageList);
    const senderId = useSelector(store => store.auth.user._id);
    const dispatch = useDispatch();

    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        return () => {
            if (currentImage) URL.revokeObjectURL(currentImage.preview);
        };
    }, [currentImage]);

    const handleSendMessage = async (e) => {
        try {
            e.preventDefault();

            let payload = null;
            let headers = null;

            if (currentImage) {
                payload = new FormData();
                payload.append('senderId', senderId);
                payload.append('receiverId', receiverId);
                payload.append('text', currentMessage);
                payload.append('image', currentImage.file);
                headers = {};

            } else {
                payload = {
                    senderId,
                    receiverId,
                    text: currentMessage,
                    image: null,
                };
                headers = { "Content-Type": "application/json" };
            }

            const res = await chatApi.post(`/send/message/${receiverId}`, payload, { headers });

            if (res?.success) {
                dispatch(setMessageList([...messageList, res.data]));
                dispatch(setCurrentMessage(''));
                dispatch(setImagePreview(null));
                setCurrentImage(null);
                e.target.reset();
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message)
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCurrentImage({ file, preview: imageUrl })
            dispatch(setImagePreview(imageUrl));
            chatInputRef.current.focus()
        }
    };

    return (
        <div className="bg-white rounded-[15px] mx-1 4xl:mx-6">
            <form
                onSubmit={handleSendMessage}
                className="w-full flex gap-2 justify-between px-5 items-center">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
                <button
                    type="button"
                    className="cursor-pointer my-3"
                    onClick={() => fileInputRef.current?.click()}>
                    <Paperclip
                        size={25}
                        strokeWidth={2}
                        color="#6B6B6B"
                        className="-scale-x-100 rotate-90 w-fit"
                    />
                </button>

                <input
                    type="text"
                    ref={chatInputRef}
                    placeholder="Type your comment"
                    className="focus:outline-none placeholder:text-[#939296] w-full"
                    value={currentMessage}
                    onChange={(e) => dispatch(setCurrentMessage(e.target.value))}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            submitButtonRef.current?.click();
                        }
                    }}
                />

                <button
                    type="submit"
                    ref={submitButtonRef}
                    className="w-fit h-fit">
                    <img src={sendBtn} alt="send btn" className="w-[24px]" />
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
