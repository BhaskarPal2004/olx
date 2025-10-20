import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import useAxiosInstance from "../useAxiosInstance"
import { useEffect } from "react"
import { setSingleAd } from "@/store/slices/adSlice"

const useGetSingleAd = () => {
    const singleAdId = useSelector(store => store.ad.singleAdId)
    const dispatch = useDispatch()
    const { adsApi } = useAxiosInstance()
    const { user } = useSelector(store => store.auth);
    
    useEffect(() => {
        if (!user) return;
        const getAd = async () => {
            try {
                const res = await adsApi.get(`/getAdById/${singleAdId}`)

                if (res?.success) {
                    dispatch(setSingleAd(res.data))
                }

            } catch (error) {
                toast.error(error.response.data.message)
            }
        }

        getAd()
        //eslint-disable-next-line
    }, [adsApi, dispatch, singleAdId])
}

export default useGetSingleAd