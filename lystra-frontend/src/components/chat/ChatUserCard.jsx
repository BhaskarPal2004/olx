
import sampleChatDp from '@/assets/chat/sampleChatDp.jpg'
import { setCurrentReceiver, setReceiverId } from '@/store/slices/chatSlice'
import { useDispatch } from 'react-redux'

const ChatUserCard = ({ id, name, profilePicture, lastMessage, lastMessageTime }) => {
    const src = profilePicture || sampleChatDp
    const dispatch = useDispatch()

    const handleSetReceiver = () => {
        dispatch(setReceiverId(id))
        dispatch(setCurrentReceiver({ id, name, profilePicture }))
    }

    const formatTime = (time) => {
        if (!time) return ''
        const date = new Date(time)
        const today = new Date()
        
        const isToday = date.toDateString() === today.toDateString()
        return isToday 
            ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            : date.toLocaleDateString([], { month: 'short', day: 'numeric' }) 
    }

    return (
        <div
            className='flex items-center 2xl:items-start justify-between px-2 gap-1 2xl:gap-0 2xl:justify-center py-2 mt-2 border-b border-b-[#EEEEEE] cursor-pointer hover:bg-slate-200 rounded-2xl mx-1'
            onClick={handleSetReceiver}
        >
            <div className='flex flex-col md:flex-row items-center gap-2 2xl:gap-5'>
                <img src={src} alt="profile" className='w-8 lg:w-12 2xl:w-[70px] rounded-full' />
                <div className='font-archivo'>
                    <h4 className='text-[#0C0C0C] 2xl:text-lg mb-0 font-medium 2xl:mb-[7px]'>
                        {name}
                    </h4>
                    <span className='text-[#6C6C6C] hidden lg:block text-sm truncate w-[150px] 2xl:w-[200px]'>
                        {lastMessage || "Start chatting..."}
                    </span>
                </div>
            </div>
            <span className='text-[13px] text-[#A4A4A4] w-16 text-nowrap md:w-fit'>
                {formatTime(lastMessageTime)}
            </span>
        </div>
    )
}

export default ChatUserCard


