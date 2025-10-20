import useAxiosInstance from "@/hooks/useAxiosInstance";
import { setBlockUser } from "@/store/slices/blockdUserSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetBlockedUser = (refreshTrigger) => {
  const { userApi } = useAxiosInstance();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?._id) {
      dispatch(setBlockUser([]));
      return;
    }

    const fetchBlockedUser = async () => {
      try {
        const response = await userApi.get(`/getBlockedUser/${user._id}`);
        if (response.success) {
          dispatch(setBlockUser(response.data));
        }
      } catch (error) {
        dispatch(setBlockUser([]));
        console.error("Fetch error:", error.message);
      }
    };

    fetchBlockedUser();
  }, [dispatch, userApi, user?._id, refreshTrigger]);
};

export default useGetBlockedUser;
