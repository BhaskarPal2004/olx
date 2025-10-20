import { useCallback, useEffect } from "react";
import useAxiosInstance from "./useAxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing } from "@/store/slices/userSlice";

const useGetAllFollowing = () => {
    const { followApi } = useAxiosInstance();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.auth.user);

    const fetchFollowing = useCallback(async () => {
        if (!user) return;
        try {
            const res = await followApi.get('/getAllFollowing');
            dispatch(setFollowing(res.data));
        } catch (error) {
            dispatch(setFollowing([]));
            console.error(error);
        }
        //eslint-disable-next-line
    }, [followApi]);

    useEffect(() => {
        fetchFollowing();
    }, [fetchFollowing]);

    return fetchFollowing;
};

export default useGetAllFollowing;
