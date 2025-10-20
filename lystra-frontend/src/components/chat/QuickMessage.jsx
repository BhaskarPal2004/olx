import { setCurrentMessage } from "@/store/slices/chatSlice"
import { useDispatch } from "react-redux"

const QuickMessage = ({ chatInputRef }) => {
    const dispatch = useDispatch()
    const quickMessages = ['Hello', 'is it available? ', 'Okay', 'No problem', 'Please reply', 'Not interested', 'Welcome', 'Thank You']

    const handleQuickMessage = (index) => {
        dispatch(setCurrentMessage(quickMessages[index]))
        chatInputRef.current.focus()
    }

    return (
        <div className="flex w-full gap-2 justify-between items-center overflow-x-auto overflow-y-hidden no-scrollbar pt-2 h-[80px] md:h-fit px-2 md:pb-2 4xl:pb-4 4xl:pt-10 4xl:px-0  4xl:w-[93%] 4xl:mx-auto">
            {
                quickMessages.map((message, index) => {
                    return (
                        <button key={index} className="bg-[#F8F9FC] text-center text-[#8B8F9B] rounded-[10px] border border-[#E3E5EC] p-[10px] 4xl:p-[14px] w-full text-nowrap no-scrollbar" onClick={() => handleQuickMessage(index)}>
                            {message}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default QuickMessage