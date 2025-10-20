import { useCallback, useEffect } from "react";
import useAxiosInstance from "./useAxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setFollower } from "@/store/slices/userSlice";

const useGetAllFollow = () => {
    const { followApi } = useAxiosInstance();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.auth.user);

    const fetchFollowers = useCallback(async () => {
        if (!user) return;
        try {
            const res = await followApi.get('/getAllFollower');
            dispatch(setFollower(res.data));
        } catch (error) {
            dispatch(setFollower([]));
            console.error(error);
        }
        //eslint-disable-next-line
    }, [followApi]);

    useEffect(() => {
        fetchFollowers();
    }, [fetchFollowers]);

    return fetchFollowers;
};

export default useGetAllFollow;
