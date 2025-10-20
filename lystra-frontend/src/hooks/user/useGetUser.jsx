import { useDispatch } from "react-redux"
import useAxiosInstance from "../useAxiosInstance"
import { setUser } from "@/store/slices/authSlice"
import { useEffect } from "react"
import { setFavoriteAd } from "@/store/slices/adSlice"


const useGetUser = () => {
    const { userApi } = useAxiosInstance()
    const dispatch = useDispatch()

    const getUserData = async () => {
        try {
            const response = await userApi.get('/userData')
            if (response.success) {
                dispatch(setUser(response.data))
                dispatch(setFavoriteAd(userApi.favoriteAds))
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserData()

        //eslint-disable-next-line
    }, [])

    return getUserData
}


export default useGetUser