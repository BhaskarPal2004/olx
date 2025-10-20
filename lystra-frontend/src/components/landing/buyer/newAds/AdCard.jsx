import locationPin from "@/assets/buyerLandingTestImgs/locationPin.svg"
import { Heart } from "lucide-react"
import { useState } from "react"
import daysAgoFunction from "@/utils/daysAgoFunction"
import { useNavigate } from "react-router-dom"


const AdCard = ({ checkBox = false, handleCheck, data }) => {
  const [savedAd, setSavedAd] = useState(false)
  const navigate = useNavigate();

  const toggleSavedAd = () => {
    setSavedAd((prev) => !prev)
  }

  return (
    <div className="flex flex-col w-full s:w-[320px] lg:w-[270px] mx-auto relative cursor-pointer hover:scale-105 duration-300 ease-in-out" onDoubleClick={toggleSavedAd} onClick={() => {
      navigate('/auth/login')
    }} >
      <img src={data.files[0].fileUrl} alt="watches" className="max-h-[150px] fit-contain" />
      {checkBox && <input type="checkbox" name="compareAdCheck" className="absolute top-3 left-3 w-5 h-5 cursor-pointer" onChange={handleCheck} />}
      <div className="rounded-full size-[28px] bg-white absolute top-[13px] right-[13px] flex items-center justify-center cursor-pointer" onClick={toggleSavedAd}>
        <Heart color={savedAd ? "red" : "#C9C9C9"} fill={savedAd ? "red" : "#C9C9C9"} width={18} height={18} />
      </div>
      <div className="relative flex flex-col border-[1px] border-[#EEEEEE] border-t-0">
        <h2 className="font-semibold text-[20px] pt-[19px] pb-[11px] pl-[20px]">₹{data?.price}</h2>
        <h4 className="font-normal text-[16px] text-[#828282] pl-[20px] pb-[18px] w-full text-nowrap overflow-hidden text-ellipsis">{data?.name}</h4>
        <div className="absolute top-[26px] right-[20px] text-[#6C6C6C] text-[12px]">
          {daysAgoFunction(data?.createdAt)}
        </div>
      </div>
      <div className="flex border-[1px] border-[#EEEEEE] border-t-0 gap-[6px] pl-[19px] pt-[11px] pb-[14px] rounded-b-[10px]">
        <img src={locationPin} alt="locationPin" />
        <p className="m-0 text-[#6C6C6C] text-[12px] font-normal">{data?.address?.city},{data?.address?.state}</p>
      </div>
    </div>
  )
}

export default AdCard