import { useState } from "react";
import watches from "@/assets/buyerLandingTestImgs/watches.png";
import locationPin from "@/assets/buyerLandingTestImgs/locationPin.svg";
import { Heart } from "lucide-react";
import daysAgoFunction from "@/utils/daysAgoFunction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    removeFavoriteAd,
    setCompareAd,
    setFavoriteAd,
    setSingleAdId,
} from "@/store/slices/adSlice";
import useCheckIsSaved from "@/hooks/ad/useCheckIsSaved";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import toast from "react-hot-toast";

const BuyerAdCard = ({ ad, className = '' ,data}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { favoriteAd, compareAd } = useSelector(state => state.ad);
    const { userApi } = useAxiosInstance();
    const isSaved = useCheckIsSaved(ad._id);
    const [savedAd, setSavedAd] = useState(isSaved);

    const imageSrc = ad.files[0]?.fileUrl || watches;

    const handleAdView = (event) => {
        event.stopPropagation();
        dispatch(setSingleAdId(ad._id));
        navigate(`/ad/details/${ad._id}`);
    };

    const toggleSavedAd = async (event) => {
        event.stopPropagation();

        if (!savedAd) {
            try {
                const res = await userApi.post(`/saveAd/${ad._id}`);
                if (res.success) {
                    dispatch(setFavoriteAd([...favoriteAd, ad]));
                    toast.success(res.message);
                    setSavedAd(true);
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        } else {
            try {
                const res = await userApi.delete(`/removeSavedAd/${ad._id}`);
                if (res.success) {
                    dispatch(removeFavoriteAd(ad._id));
                    toast.success(res.message);
                    setSavedAd(false);
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
    };

    const handleCheck = (event) => {
        event.stopPropagation();
        if (compareAd?.some(item => item._id === ad._id)) {
            dispatch(setCompareAd(compareAd.filter(item => item._id !== ad._id)));
        } else {
            dispatch(setCompareAd([...compareAd, ad]));
        }
    };

    return (
        <div className={`relative flex flex-col cursor-pointer ${className}`} onClick={handleAdView}>
            {/* Image Container */}
            <div className="mx-auto py-1 px-2 h-40 w-full 4xl:w-[270px] border border-[#EEEEEE] bg-white rounded-t-lg flex items-center justify-center overflow-hidden relative">
                <img
                    src={imageSrc}
                    alt="ad image"
                    className="h-full fit-contain"
                />

               
                {ad?.isFeatured && (
                    <div className="absolute bottom-2 right-2 font-bold font-Manrope text-xs px-[9px] pt-1 pb-[5px] bg-[#F7C305] rounded-[4px] text-[#302706] z-10 shadow-md">
                        Featured
                    </div>
                )}
            </div>

            
            <input
                type="checkbox"
                className="absolute top-3 left-3 w-5 h-5 cursor-pointer"
                checked={compareAd?.some(item => item._id === ad._id)}
                onChange={handleCheck}
                onClick={(event) => event.stopPropagation()}
                disabled={data === "favoriteAd"}
            />

            
            <div
                className="rounded-full size-[28px] bg-white absolute top-[13px] right-[13px] flex items-center justify-center cursor-pointer"
                onClick={toggleSavedAd}
            >
                <Heart
                    color={savedAd ? "red" : "#C9C9C9"}
                    fill={savedAd ? "red" : "#C9C9C9"}
                    width={18}
                    height={18}
                />
            </div>

            
            <div className="flex flex-col border bg-white border-[#EEEEEE] border-t-0 px-4 py-3">
                <div className="flex justify-between items-baseline">
                    <h2 className="font-semibold text-xl">₹{ad?.price}</h2>
                    <span className="text-[#6C6C6C] text-xs">{daysAgoFunction(ad?.createdAt)}</span>
                </div>
                <h4 className="font-normal text-[#828282] w-full text-nowrap overflow-hidden text-ellipsis">
                    {ad?.name}
                </h4>
            </div>

            
            <div className="flex border-[1px] bg-white border-[#EEEEEE] border-t-0 gap-[6px] pl-[19px] pt-[11px] pb-[14px] rounded-b-[10px]">
                <img src={locationPin} alt="locationPin" />
                <p className="m-0 text-[#6C6C6C] text-[12px] font-normal">
                    {ad?.adLocation?.city}, {ad?.adLocation?.state}
                </p>
            </div>
        </div>
    );
};

export default BuyerAdCard;
