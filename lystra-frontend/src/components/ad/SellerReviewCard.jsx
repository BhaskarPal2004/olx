import zalim from "@/assets/visuals/zalimKapadia.png"
import { useSelector } from "react-redux"
import { Rate } from "antd"


const SellerReviewCard = () => {
    const singleAd = useSelector(store => store.ad.singleAd)
    const profilePictureUrl = singleAd?.sellerId?.profilePicture || zalim
    const averageRating = singleAd.sellerId?.averageRating || 0
    const reviewCount = singleAd.reviews?.length

    return (
        <div className="flex justify-center items-center w-fit px-2 py-1 2xl:p-0 4xl:p-0 gap-3">
            <img src={profilePictureUrl} alt="seller profile picture" className="w-[45px] h-[45px] border rounded-full" />
            <div>
                <span className="4xl:font-medium 4xl:pb-[9px]">
                    {singleAd?.sellerId?.name}
                </span>
                <div className="flex flex-wrap items-center gap-3">
                    <Rate disabled allowHalf value={averageRating} className="" />
                    <p className="m-0 text-[10px] md:text-base text-[#6C6C6C] 2xl:text-[10.45px] 4xl:font-normal">
                        ({reviewCount} Reviews)
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SellerReviewCard