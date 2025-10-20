import earpodImg from "@/assets/visuals/earpods.png"
import plus from "@/assets/visuals/plusIcon.png"


const ProductCard = () => {
    return (
        <div className="rounded-md w-[100px] absolute top-60 right-[20px] bg-white shadow-[-15px_18px_29px_rgba(0,0,0,0.1)] s:w-2/5 md:w-[150px] md:top-[50px] md:right-[90px] md:z-30 lg:w-[200px] 2xl:w-[300px] 4xl:w-fit 4xl:right-[143px] 4xl:top-[130px]">
            <img src={earpodImg} alt='earpods' className="w-full 4xl:w-[370px] 4xl:h-[282.1px]" />
            <div className="flex items-center gap-0 p-2 lg:justify-around 2xl:p-[30px] 4xl:pt-[39.9px] 4xl:pb-[42px] 4xl:pl-[38px] 4xl:pr-[36px]">
                <span className="text-sm lg:w-[120px] 2xl:text-[20px] 2xl:w-[150px] 4xl:text-[26px] 4xl:font-normal 4xl:tracking-wider 4xl:leading-7 4xl:h-[60px] 4xl:w-[250px]">Add New<br /> Selling Products</span>
                <img src={plus} alt="plus" className="w-[20px] h-[20px] 2xl:w-[30px] 2xl:h-[30px] 4xl:size-[39px]" />
            </div>
        </div>
    )
}

export default ProductCard