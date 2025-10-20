
import ChatUserCard from "@/components/chat/ChatUserCard"
import useGetChatUsers from "@/hooks/chat/useGetChatUsers"
import { useSelector } from "react-redux"

const UserList = () => {
    useGetChatUsers()
    const receiverId = useSelector(store => store.chat.receiverId)
    const chatUserList = useSelector(store => store.chat.chatUserList)

    return (
        <div className={`bg-white ${receiverId ? 'w-0' : 'w-full'} border border-[#E2E2E2] h-[calc(90vh-80px)] 4xl:max-h-[840px] rounded-[10px] py-4 md:w-[30%] lg:w-[35%] 2xl:w-[370px] overflow-y-auto`}>
            {
                chatUserList.map((user) => (
                    <ChatUserCard
                        key={user._id}
                        id={user._id}
                        name={user.name}
                        profilePicture={user.profilePicture}
                        lastMessage={user.lastMessage}
                        lastMessageTime={user.lastMessageTime}
                    />
                ))
            }
        </div>
    )
}

export default UserList
