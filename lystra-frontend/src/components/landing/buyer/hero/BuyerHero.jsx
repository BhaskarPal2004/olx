import carousel from "@/assets/hero/carousel.jpg"
import StartSellingBtn from "@/components/landing/StartSellingBtn"
export default function BuyerHero() {
  return (
    <>
      <div className='relative'>
        <img src={carousel} alt='hero' />
        <div className='absolute ml-[10px] w-1/3 top-[5px] flex flex-col gap-1 xs:top-[20px] xs:gap-2 s:top-[30px] sm:ml-[15px] sm:top-[15px] md:top-[35px] md:gap-4 md:w-[250px] lg:top-[50px] lg:ml-[80px] lg:gap-6 xl:top-[95px] xl:ml-[150px] xl:gap-8 xl:w-[23%] 2xl:top-[70px] 4xl:ml-[243px]'>
          <h3 className='text-[14px] text-[#222329] font-medium sm:text-[20px] lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-[60px] 3xl:leading-[60px] 4xl:leading-[80px] 2xl:w-[450px]'>
            Your Old Stuff, Someone&apos;s New Find - Start Selling!
          </h3>
          <p className='hidden  text-[#524D40] font-normal sm:inline sm:text-[14px] lg:text-md xl:text-lg  2xl:w-[320px] 3xl:text-[18px] 4xl:w-[420px] 4xl:leading-[34px] 4xl:mb-[18px]'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          </p>
          <StartSellingBtn />
        </div>
      </div>
    </>
  )
}