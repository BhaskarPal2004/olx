import { useEffect } from "react";
import useAxiosInstance from "../useAxiosInstance";
import { useDispatch } from "react-redux";
import { setChatUserList } from "@/store/slices/chatSlice";

const useGetChatUsers = () => {
  const { chatApi } = useAxiosInstance();
  const dispatch = useDispatch();

  const getChatUsers = async () => {
    try {
      const res = await chatApi.get("get/users");
      dispatch(setChatUserList(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChatUsers();

    //eslint-disable-next-line
  }, []);
};

export default useGetChatUsers;
