import zalim from "@/assets/visuals/zalimKapadia.png"
import yellowStar from "@/assets/visuals/yellowStar.png"
import emptyStar from "@/assets/visuals/emptyStar.png"


const ReviewCard = () => {
    return (
        <div className="flex justify-center items-center w-fit rounded-[8.71px] border-[1px] border-[#F3F3F3] shadow-[10.45px_12.19px_21.77px_rgba(0,0,0,0.05)] px-2 py-1 relative top-[-20px] bg-white left-[20px] md:top-[-150px] md:left-[260px] md:z-30 lg:left-[350px] 2xl:top-[-250px] 2xl:left-[450px] 2xl:px-[20px] 2xl:py-[10px] 4xl:pl-[24px] 4xl:pr-[31px] 4xl:pt-[15.56px] 4xl:pb-[15.54px] 4xl:left-[700px] 4xl:top-[-360px]">
            <img src={zalim} alt="zalim kapadia" className="size-[40px] 2xl:size-[80px] 4xl:size-[67px] 4xl:mr-[19px]" />
            <div>
                <span className="text-xs 2xl:text-md 4xl:font-medium 4xl:text-[13.94px] 4xl:pb-[9px]">Zalim Kapadia</span>
                <div className="flex items-center gap-0.3">
                    <img src={yellowStar} alt="yellowStar" className="h-[10px] w-[10px] 4xl:w-[15.09px] 4xl:h-[15.88px]" />
                    <img src={yellowStar} alt="yellowStar" className="h-[10px] w-[10px]  4xl:w-[15.09px] 4xl:h-[15.88px]" />
                    <img src={yellowStar} alt="yellowStar" className="h-[10px] w-[10px]  4xl:w-[15.09px] 4xl:h-[15.88px]" />
                    <img src={yellowStar} alt="yellowStar" className="h-[10px] w-[10px]  4xl:w-[15.09px] 4xl:h-[15.88px]" />
                    <img src={emptyStar} alt="emptyStar" className="h-[10px] w-[10px]   4xl:w-[15.09px] 4xl:h-[15.88px] mr-1 4xl:mr-[9px]" />
                    <p className="text-[10px] text-[#6C6C6C] 2xl:text-[10.45px] 4xl:font-normal">(124 Reviews)</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard