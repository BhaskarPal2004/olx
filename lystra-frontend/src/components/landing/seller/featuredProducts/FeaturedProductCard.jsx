import { Ellipsis } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom"

const FeaturedProductCard = ({ data }) => {
  const navigate = useNavigate()
  const imageUrl = data?.files?.[0]?.fileUrl
  const timeAgo = data?.createdAt
    ? formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })
    : "";

  return (
    <div className="flex flex-wrap rounded-md border-[1px] border-[#eceef1] w-[95%] md:w-[300px] lg:w-[400px] xl:w-[570px] justify-center lg:justify-start p-2 gap-2 xl:gap-x-4 relative cursor-pointer" onClick={() => {
      navigate('/auth/login')
    }}>
      <div className="flex flex-col items-center mt-6 lg:mt-0 xl:pt-[10px] xl:py-[12px]">
        <img
          src={imageUrl}
          alt={data.name}
          className="w-[200px] lg:w-[100px] h-[80px] object-cover rounded"
        />
        {(data?.isFeatured || data?.boost?.isBoosted) && (
          <div className="bg-[#F7C305] rounded-md w-[100px] md:w-[71px] p-1 text-[12px] text-center mt-[-20px]">
            Featured
          </div>
        )}
      </div>

      <div className="w-[300px] md:w-[270px] lg:w-[270px] xl:w-[400px] lg:pt-[2px] xl:pt-[15px] leading-1">
        <p className="text-[20px] font-semibold">₹{data.price.toFixed(2)}</p>
        <p className="text-[#828282]">{data.name}</p>
        <p className="w-full text-nowrap pr-2 overflow-hidden text-ellipsis">
          {data.description || "No description available."}
        </p>
      </div>

      <div className="absolute right-[20px] flex gap-[30px]">
        <span className="text-[#828282]">{timeAgo}</span>
        <button>
          <Ellipsis />
        </button>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
