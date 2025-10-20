import BuyerHero from "@/components/landing/buyer/hero/BuyerHero";
import { Carousel } from "antd";


const Hero = () => {
  return (
    <>
      <Carousel arrows adaptiveHeight infinite={true} autoplay={{ dotDuration: true }}>
        <BuyerHero />
        <BuyerHero />
        <BuyerHero />
        <BuyerHero />
      </Carousel>
    </>
  );
};

export default Hero;