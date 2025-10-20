import personImg from "@/assets/visuals/abhinav.jpg"
import yellowStar from "@/assets/visuals/yellowStar.png"
import emptyStar from "@/assets/visuals/emptyStar.png"
import dummyUser from "@/assets/visuals/dummyUser.jpg"
import EditProfileBtn from "@/components/landing/seller/visuals/EditProfileBtn"


const EditProfile = () => {
    return (
        <div className="bg-white w-fit rounded-lg p-5 flex-col justify-center items-center gap-2 shadow-[12px_14px_25px_rgba(0,0,0,0.05)] hidden sm:flex md:relative md:left-[50px] md:top-[50px] md:z-30 lg:left-[80px] lg:top-[130px] 2xl:left-[225px] 2xl:top-[180px] 4xl:gap-0 4xl:pl-[44.83px] 4xl:pr-[43.69px] 4xl:pt-[28.11px] 4xl:pb-[36.47px] 4xl:left-[409px]">
            <img src={personImg} alt="person" className="h-[60px] w-[60px] 4xl:size-[82.82px] 4xl:mb-[19.75px] " />
            <span className="4xl:font-semibold 4xl:text-[15.2px] 4xl:mb-[6.55px]">Abhinav Upasani</span>
            <div className="flex items-center gap-0.3 4xl:gap-[1.39px]">
                <img src={yellowStar} alt="yellowStar" className="h-[10px] w-[10px] 4xl:w-[13.16px] 4xl:h-[13.86px]" />
                <img src={yellowStar} alt="yellowStar" className="h-[10px] w-[10px]4xl:w-[13.16px] 4xl:h-[13.86px] " />
                <img src={yellowStar} alt="yellowStar" className="h-[10px] w-[10px]4xl:w-[13.16px] 4xl:h-[13.86px] " />
                <img src={yellowStar} alt="yellowStar" className="h-[10px] w-[10px]4xl:w-[13.16px] 4xl:h-[13.86px] " />
                <img src={emptyStar} alt="emptyStar" className="h-[10px] w-[10px] 4xl:w-[13.16px] 4xl:h-[13.86px] mr-[6.84px]" />
                <p className="text-[10px] text-[#6C6C6C]">(124 Reviews)</p>
            </div>
            <div className="flex justify-center items-center w-fit 2xl:my-[20px] 4xl:mt-[26.03px] 4xl:mb-[26.59px]">
                <img src={dummyUser} alt="dummyUser" className="w-[13.68px] h-[13.68px] mr-[4.56px] " />
                <p className="text-[10.64px] text-[#6C6C6C] font-normal">
                    Following
                    <span className="font-bold text-[#ED640F] border-[#BABABA] border-e-[1px] pr-[10px]">
                        (04)
                    </span>
                </p>
                <img src={dummyUser} alt="dummyUser" className="w-[13.68px] h-[13.68px] ml-[10px] mr-[4.56px] 4xl:ml-[12.92px]" />
                <p className="text-[10.64px] text-[#6C6C6C] font-normal">
                    Followers
                    <span className="font-bold text-[#ED640F]">
                        (12)
                    </span>
                </p>
            </div>
            <EditProfileBtn content={"Edit Profile"} />
        </div>
    )
}

export default EditProfile