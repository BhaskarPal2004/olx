import { useEffect } from "react"
import { useDispatch } from "react-redux"
import useAxiosInstance from "../useAxiosInstance"
import { setCategories } from "@/store/slices/adSlice"

const useGetCategories = () => {
    const { adsApi } = useAxiosInstance()
    const dispatch = useDispatch()

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await adsApi.get('/getCategory')
                if (res.success) {
                    dispatch(setCategories(res.data))
                }
            } catch (error) {
                console.error(error)
            }
        }

        getCategories()

    }, [adsApi, dispatch])
}

export default useGetCategories