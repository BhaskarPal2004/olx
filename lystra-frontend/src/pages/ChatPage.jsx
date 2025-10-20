import useSetSocket from "@/hooks/chat/useSetSocket"
import ChatContainer from "@/layouts/chat/ChatContainer"
import UserList from "@/layouts/chat/UserList"
import AuthNavbar from "@/layouts/shared/AuthNavbar"
import { useSelector } from "react-redux"


const ChatPage = () => {
    const socket = useSetSocket()
    console.log('socket id = ', socket.current?.id)
    const receiverId = useSelector(store => store.chat.receiverId)

    return (
        <>
            <div className="bg-[#F7F7F7] h-screen">
                <AuthNavbar />
                <section className={`w-full mx-auto flex ${receiverId ? 'gap-0 md:gap-2' : 'gap-2'} 2xl:gap-[30px] mt-2 4xl:mt-20 md:px-2 2xl:w-[1170px]`}>
                    <UserList />
                    {receiverId ? <ChatContainer/> : <div className="text-2xl text-zinc-900 hidden lg:inline">Please Select a chat</div>}
                </section>
            </div>
        </>
    )
}

export default ChatPage