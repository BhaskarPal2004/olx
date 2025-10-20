import { useState } from "react";
import { Carousel } from "antd";
import ReactPlayer from 'react-player'
import { useSelector } from "react-redux";


const AdImageCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const singleAd = useSelector(store => store.ad.singleAd)
    const totalSlides = singleAd?.files?.length;

    return (
        <section className="w-full mx-auto lg:w-1/2 2xl:w-[570px] ">
            <section>
                <Carousel
                    arrows
                    infinite={true}
                    autoplay={{ dotDuration: true }}
                    autoplaySpeed={4000}
                    afterChange={(current) => setCurrentSlide(current + 1)}
                >
                    {
                        singleAd?.files?.map((file) => {
                            return (
                                <div key={file._id} className="fit-contain max-h-[400px]">
                                    {file?.fileType.startsWith('image') ? (
                                        <img src={file?.fileUrl} alt="ad file" className="m-auto rounded-xl" />
                                    ) : (
                                        <ReactPlayer url={file?.fileUrl} playing muted controls loop width='100%' height='100%' />
                                    )}
                                </div>
                            )
                        })
                    }
                </Carousel>

                <div className="px-2 py-1 2xl:py-5 rounded text-black">{currentSlide}/{totalSlides}</div>
            </section>
        </section>
    );
};

export default AdImageCarousel;
