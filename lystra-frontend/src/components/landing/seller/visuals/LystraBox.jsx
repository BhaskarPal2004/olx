import logo from "@/assets/visuals/lystraLogo.svg"
import browser from "@/assets/visuals/browser.png"


const LystraBox = () => {
    return (
        <>
            <div className="relative inline-block left-[30px] s:left-[220px] top-3 md:left-[20px] md:top-[90px] 2xl:top-[100px] 4xl:left-[82px] 4xl:top-[149px]">
                <div className="bg-[#FAE7DB] size-[35px] relative left-[55%] top-[10px] rounded-[5px] md:size-[70px] md:left-[40%] 2xl:size-[120px] 2xl:top-[30px] 4xl:w-[166px] 4xl:h-[152px] 4xl:left-[138px]"></div>
                <div className="size-[100px] 4xl:w-[345px] 4xl:h-[349px] bg-[#ED640F] rounded-[5px] flex justify-center items-center md:size-[150px] 2xl:size-[270px]">
                    <div className="flex justify-center items-center flex-col">
                        <img src={logo} alt="logo" className="size-[20px] md:size-[40px] 2xl:size-[60px] 4xl:size-[78.36px]" />
                        <span className="text-black font-Mplus1p 2xl:text-[33.41px] font-bold md:text-[20px] 4xl:text-[50.77px]">Lystra</span>
                    </div>
                </div>
            </div>
            <img src={browser} alt="browserScreenshot" className="w-[250px] relative bottom-[10px] -z-10 left-4 md:hidden" />
        </>
    )
}

export default LystraBox