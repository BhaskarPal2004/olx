import sampleChatDp from '@/assets/chat/sampleChatDp.jpg'
import { ArrowLeft, Phone } from 'lucide-react'
import ChatMenu from '@/components/chat/ChatMenu'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentReceiver, setReceiverId } from '@/store/slices/chatSlice'
import useAxiosInstance from '@/hooks/useAxiosInstance';
import toast from 'react-hot-toast';


const ChatContainerHeader = () => {
    const currentReceiver = useSelector(store => store.chat.currentReceiver)
    const dispatch = useDispatch()
    const handleBack = () => {
        dispatch(setReceiverId(null))
        dispatch(setCurrentReceiver(null))
    }
    const src = currentReceiver?.profilePicture || sampleChatDp
    const { userApi } = useAxiosInstance();
    const receiverId = useSelector(store => store.chat.currentReceiver.id);

    const handleCallRequest = async() => {
        try{
            const res = await userApi.post(`/request/call/${receiverId}`);
            
            if (res.success) {
                toast.success(res.message);
            }
        }
        catch(error){
            toast.error(error.response.data.message)           
        }
    }

    return (
        <div className="bg-[#FFFFFF] rounded-tl-[10px] rounded-tr-[10px] flex justify-between px-2 4xl:px-6 py-2">
            <div className='flex gap-2 items-center cursor-pointer font-archivo'>
                <button className='hover:scale-105 pe-1 md:hidden' onClick={handleBack}><ArrowLeft /></button>
                <div className="w-10 cursor-pointer rounded-full">
            <img src={src} alt="user image" className='w-8 lg:w-12 2xl:w-[70px] rounded-full' />
        </div>
                <h3 className='overflow-auto mb-0 2xl:text-lg'>{currentReceiver?.name}</h3>
            </div>
            <div className='flex gap-1 2xl:gap-3 4xl:gap-[22px] items-center justify-center 4xl:pe-4'>
                <button className='rounded-[10px] bg-[#E1EFE5] border border-[#CADCCF] p-2 4xl:size-[50px] flex justify-center items-center'>
                    <Phone fill='#15A841' stroke='0px' onClick={handleCallRequest} />
                </button>
                <ChatMenu />
            </div>
        </div>
    )
}

export default ChatContainerHeader