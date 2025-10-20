import { MapPin } from "lucide-react"
import Heart from "react-heart";
import watch from "@/assets/sellerHome/watch.jpg"
import SellerAdCardMenu from "./SellerAdCardMenu"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { removeFavoriteAd, setFavoriteAd, setSingleAdId, setCompareAd } from "@/store/slices/adSlice"
import { useState } from "react";
import daysAgoFunction from "@/utils/daysAgoFunction";
import useCheckIsSaved from "@/hooks/ad/useCheckIsSaved";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import toast from "react-hot-toast";

const SellerAdCard = ({ ad, className = '' ,data}) => {
    const { userApi } = useAxiosInstance()
    const { favoriteAd } = useSelector(store => store.ad)
    const { compareAd } = useSelector(store => store.ad)
    const isSaved = useCheckIsSaved(ad._id)
    const [active, setActive] = useState(isSaved);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const imageSrc = ad.files[0].fileUrl || watch

    const handleAdView = (event) => {
        event.stopPropagation()
        const adId = ad?._id
        dispatch(setSingleAdId(adId))
        navigate(`/ad/details/${adId}`)
    }


    const handleCheckChange = (event) => {
        event.stopPropagation();

        if (compareAd?.some(item => item._id === ad._id)) {
            dispatch(setCompareAd(compareAd.filter(item => item._id !== ad._id)));
        } else {
            // Else add it
            if (!compareAd) {
                dispatch(setCompareAd(ad))
            }
            else {
                dispatch(setCompareAd([...compareAd, ad]));
            }
        }
    };

    const handleSaveFunc = async () => {
        try {
            const res = await userApi.post(`/saveAd/${ad._id}`)
            if (res.success) {
                toast.success(res.message)
                dispatch(setFavoriteAd([...favoriteAd, ad]))
            }

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleUnsaveFunc = async () => {
        try {
            const res = await userApi.delete(`/removeSavedAd/${ad._id}`)
            if (res.success) {
                toast.success(res.message)
                dispatch(removeFavoriteAd(ad._id))
            }

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleSave = async (e) => {
        e.stopPropagation()
        if (!active) {
            await handleSaveFunc()
            setActive(true)
        } else {
            await handleUnsaveFunc()
            setActive(false)
        }
    }

    return (
        <>
            <div className={`bg-white border border-[#EAEAEA] ${className} rounded-[10px] max-w-[450px] lg:max-h-[690px] xl:max-h-[250px] 2xl:min-w-[870px] mx-auto flex flex-col 2xl:flex-row cursor-pointer hover:bg-slate-50 ${ad?.isExpired ? 'opacity-50' : 'opacity-100'}`} onClick={handleAdView}>
                <div className="relative 2xl:w-[270px] 2xl:h-[174px] p-1 2xl:p-[14px] flex justify-center">
                    <input
                        type="checkbox"
                        className="absolute top-2 2xl:top-5 left-2 2xl:left-5 accent-orange-500"
                        onClick={(e) => e.stopPropagation()}
                        checked={compareAd?.some(item => item._id === ad._id)}
                        onChange={handleCheckChange}
                        disabled={data === "favoriteAd"}
                    />
                    <img src={imageSrc} alt="ad image" className="w-full h-full" />
                    {ad?.isFeatured && <div className="font-bold font-Manrope text-xs w-[71px] px-[9px] pt-1 pb-[5px] bg-[#F7C305] rounded-[4px] text-[#302706] absolute bottom-2 2xl:bottom-5 right-2 2xl:right-5">Featured</div>}
                </div>

                <div className="2xl:w-full 2xl:px-5">
                    <div className="flex items-center justify-between mt-2 px-2 2xl:pe-0 2xl:-me-4 2xl:pt-4">
                        <p className="m-0 text-xl font-semibold text-[#0C0C0C]">₹{ad?.price}</p>
                        <div className="flex items-center justify-center gap-2 2xl:gap-6 2xl:-mt-7 2xl:me-5">
                            <span className="text-[#6C6C6C] text-xs">{daysAgoFunction(ad?.createdAt)}</span>
                            <button onClick={(e) => e.stopPropagation()}><SellerAdCardMenu ad={ad} /></button>
                        </div>
                    </div>
                    <p className="my-2 2xl:my-3 px-2 text-[#828282]">{ad?.name}</p>
                    <p className="px-2 2xl:pe-9 my-2">{ad?.description}</p>
                    <div className="flex flex-col 2xl:flex-row items-center justify-between px-6 2xl:mt-10 2xl:pb-4 2xl:px-0">
                        <div className="flex flex-wrap gap-4 px-2 justify-center 2xl:justify-start mt-6 2xl:my-0 text-sm">
                            <button className="flex justify-center items-center text-[#6C6C6C] gap-2 hover:text-black" onClick={handleSave}>
                                <Heart
                                    isActive={active}
                                    className={"w-[18px]"}
                                    onClick={handleSave}
                                />
                                Wishlist
                            </button>
                            <p className="m-0 flex justify-center items-center text-[#6C6C6C] gap-2">
                                <MapPin color="#828282" />
                                {ad?.adLocation?.city}, {ad?.adLocation?.state}
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <button className={`${ad?.isExpire ? 'bg-[#F7DBDB] text-[#b26b6b] border-[#E2C2C2]' : 'bg-[#E3F6E2] text-[#2DB61A] '} border border-[#B9E0B7] font-Manrope text-sm rounded-[7px] px-[13px] py-1 my-3 2xl:my-0  mx-auto`}>
                                {ad?.isExpire ? 'Expired' : 'Active'}
                            </button>
                     </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SellerAdCard

