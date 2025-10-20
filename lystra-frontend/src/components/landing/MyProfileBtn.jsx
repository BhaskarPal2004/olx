import { useSelector } from "react-redux";
import dummyImg from "@/assets/profile/user.svg";

const MyProfileBtn = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return null; // Or render a default fallback

  return (
    <img
      src={user?.profilePicture || dummyImg}
      alt="Profile"
      className="w-8 h-8 rounded-full"
    />
  );
};

export default MyProfileBtn;
