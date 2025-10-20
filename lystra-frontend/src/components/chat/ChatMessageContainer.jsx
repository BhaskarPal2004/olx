import ScrollToBottom from "react-scroll-to-bottom"
import Message from "@/components/chat/Message"
import useGetMessages from "@/hooks/chat/useGetMessages"
import { useSelector } from "react-redux"

const ChatMessageContainer = () => {
    useGetMessages()
    const { messageList } = useSelector(store => store.chat)

    return (
        <ScrollToBottom className="overflow-auto h-[65vh] 4xl:h-[61vh]">
            {
                messageList.map(message => {
                    return <Message key={message._id} message={message} />
                })
            }
        </ScrollToBottom>
    )
}

export default ChatMessageContainer