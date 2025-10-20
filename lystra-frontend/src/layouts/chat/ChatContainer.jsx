import ChatContainerHeader from "@/components/chat/ChatContainerHeader"
import ChatInput from "@/components/chat/ChatInput"
import ChatMessageContainer from "@/components/chat/ChatMessageContainer"
import ImagePreviewCard from "@/components/chat/ImagePreviewCard"
import QuickMessage from "@/components/chat/QuickMessage"
import { useRef } from "react"
import { useSelector } from "react-redux"


const ChatContainer = () => {
    const imagePreview = useSelector(store => store.chat.imagePreview)
    const chatInputRef = useRef(null)

    return (
        <div className="w-full h-[calc(98vh-81px)] 2xl:h-[calc(95vh-81px)] 4xl:h-[840px] md:w-[70%] lg:w-[65%] 2xl:w-[769px] bg-[#F2F2F2] border border-[#E2E2E2] rounded-[10px] flex flex-col justify-between 4xl:justify-stretch pb-3 4xl:pb-[26px]">
            <ChatContainerHeader />
            <ChatMessageContainer />
            <QuickMessage chatInputRef={chatInputRef} />
            <div className="relative">
                {imagePreview && <ImagePreviewCard />}
                <ChatInput chatInputRef={chatInputRef} />
            </div>
        </div>
    )
}

export default ChatContainer