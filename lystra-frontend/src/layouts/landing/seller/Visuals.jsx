import SectionHeading from "@/components/landing/SectionHeading";
import BrowserScreenshot from "@/components/landing/seller/visuals/BrowserScreenshot";
import EditProfile from "@/components/landing/seller/visuals/EditProfile";
import LystraBox from "@/components/landing/seller/visuals/LystraBox";
import ProductCard from "@/components/landing/seller/visuals/ProductCard";
import ReviewCard from "@/components/landing/seller/visuals/ReviewCard";
import SkinColorBox from "@/components/landing/seller/visuals/SkinColorBox";
import Spirals from "@/components/landing/seller/visuals/Spirals";


const Visuals = () => {
    return (
        <>
            <SectionHeading text={'Visuals & UI Highlights'} />
            <div className="relative max-w-[425px] mx-auto md:max-w-[768px] lg:max-w-[1024px]  2xl:max-w-[1440px] 4xl:m-0 4xl:max-w-full overflow-hidden">
                <LystraBox />
                <ProductCard />
                <Spirals />
                <ReviewCard />
                <EditProfile />
                <SkinColorBox />
                <BrowserScreenshot />
            </div>
        </>
    )
}

export default Visuals