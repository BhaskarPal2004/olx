import browser from "@/assets/visuals/browser.png"


const BrowserScreenshot = () => {
    return (
        <img
            src={browser}
            alt="browserScreenshot"
            className="relative hidden md:inline w-[350px] bottom-[400px] left-[200px] z-20 lg:w-[500px] lg:left-[262px] 2xl:w-[750px] 2xl:left-[350px] 2xl:bottom-[530px] 4xl:w-[912px] 4xl:h-[612px] 4xl:left-[566px] 4xl:top-[-700px] hover:scale-110 transition" />
    )
}

export default BrowserScreenshot