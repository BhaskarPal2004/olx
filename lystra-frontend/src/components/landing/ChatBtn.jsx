import chatIcon from "@/assets/authNavbar/chatIcon.jpg"
import { Link } from "react-router-dom"


const ChatBtn = () => {
    return (
        <Link to='/chat' className="cursor-pointer hover:scale-105">
            <img src={chatIcon} alt="chatIcon" />
        </Link>
    )
}

export default ChatBtn