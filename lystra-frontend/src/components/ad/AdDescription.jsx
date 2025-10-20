import { Heart, MapPin, Share2 } from "lucide-react";
import { useSelector } from "react-redux";
import daysAgoFunction from "@/utils/daysAgoFunction";
import toast from "react-hot-toast";

const AdDescription = () => {
  const singleAd = useSelector((store) => store.ad.singleAd);
  const favoriteAd = useSelector((store) => store.ad.favoriteAd);

  const isSaved = favoriteAd?.some((ad) => ad._id === singleAd?._id);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link Copied");
  };

  return (
    <section className="flex flex-col 2xl:justify-stretch gap-2 2xl:gap-6 text-center lg:w-1/2 2xl:w-fit">
      <p className="font-normal text-[25px] 2xl:w-[444px] 2xl:text-start">
        {singleAd?.name}
      </p>

      <div className="2xl:order-last mt-5 4xl:mt-16 2xl:w-[497px]">
        <h6 className="text-medium mb-5 2xl:text-start">Description</h6>
        <p className="text-normal 2xl:text-start text-[#828282]">
          {singleAd?.description}
        </p>
      </div>

      <div className="flex gap-2 items-baseline justify-center 2xl:justify-start">
        <p className="text-[30px] font-semibold text-[#ED640F]">
          ₹{singleAd?.price}
        </p>
        <span className="text-[16px] text-[#6C6C6C]">
          {daysAgoFunction(singleAd?.createdAt)}
        </span>
      </div>

      <div className="flex flex-wrap justify-center 2xl:justify-start items-center gap-x-3 2xl:gap-10">
        <div className="m-0 flex justify-center items-center text-[#6C6C6C] gap-2 capitalize">
          <MapPin color="#828282" />
          {singleAd?.address?.city}, {singleAd?.address?.state}
        </div>

        <button
          className="m-0 flex justify-center items-center text-[#6C6C6C] gap-2 hover:text-black"
          onClick={handleCopy}
        >
          <Share2 color="#828282" />
          Share
        </button>

        <div className="flex justify-center items-center gap-2 hover:text-black">
          <Heart
            color={isSaved ? "red" : "#828282"}
            fill={isSaved ? "red" : "none"}
          />
          Wishlist
        </div>
      </div>
    </section>
  );
};

export default AdDescription;
