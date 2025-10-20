import { useEffect } from "react"
import { useDispatch } from "react-redux"
import useAxiosInstance from "../useAxiosInstance"
import { setFavoriteAd } from "@/store/slices/adSlice"
import { useSelector } from "react-redux"


const useGetFavoriteAds = () => {
    const { userApi } = useAxiosInstance()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user || !user._id) return;
        const getFavoriteAds = async () => {
            try {
                const res = await userApi.get('/getSavedAds')
                if (res.success) {
                    dispatch(setFavoriteAd(res.data))
                }
            } catch (error) {
                console.error(error)
            }
        }

        getFavoriteAds()

    }, [user, userApi, dispatch])
}

export default useGetFavoriteAds
