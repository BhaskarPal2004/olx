import formatMessageText from "@/utils/formatMessageText"
import { formatMessageTime } from "@/utils/formatMsgTime"
import { useSelector } from "react-redux"

const Message = ({ message }) => {
    const id = useSelector(store => store.auth.user._id)
    const sender = message.senderId === id
    return (
        <div className={`w-full flex flex-col px-6 gap-2 2xl:gap-3 ${sender ? 'items-end' : 'items-start'} text-sm my-5 `}>
            <div className="flex gap-4 text-[#8A8A8A] text-xs">
                <span>{formatMessageTime(message.createdAt)[0]}</span>
                <span>{formatMessageTime(message.createdAt)[1]}</span>
            </div>
            <div className={`flex items-start ${sender && 'flex-row-reverse'}  gap-2 w-full`}>
                <div className={`rounded-[30px] ${sender ? 'rounded-tr-none' : 'rounded-tl-none'} border  text-start ${sender ? 'text-end bg-[#CBDCFA] border-[#B7CCF0]' : 'text-start bg-[#C7D2D6] border-[#B5C0C3]'} max-w-[351px] break-words py-2 px-4 2xl:py-[18px] 2xl:px-[26px]`}>
                    {message.image && (
                        <img
                            src={message.image}
                            alt="Attachment"
                            className="rounded-[10px] mb-2"
                        />
                    )}
                    {message.text && formatMessageText(message.text)}
                </div>
            </div>
        </div >
    )
}

export default Message