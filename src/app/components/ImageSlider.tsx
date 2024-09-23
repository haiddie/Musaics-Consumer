

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { useCallback, useRef } from "react";
import styles from '../../styles/swiperStyles.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const ImageSlider: React.FC<any> = ({ data }) => {

    const sliderRef = useRef<any>(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);
    return (
        <>
            <div className="relative">
                <Swiper
                    ref={sliderRef}
                    className='!flex min-h-[550px] flex-col-reverse items-center justify-center !pb-[60px]'
                    spaceBetween={30}
                    slidesPerView={1}
                    grabCursor={true}
                    speed={1800}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        450: { slidesPerView: 1 },
                        576: { slidesPerView: 1 },
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 1 },
                        1420: { slidesPerView: 1 }
                    }}

                    pagination={{ clickable: true }} // Add pagination option
                    modules={[Scrollbar, A11y, Pagination]}
                    scrollbar={{ draggable: true }}

                >
                    {data?.main_content.image.map((obj: any, index: number) => (
                        <SwiperSlide key={`image-${data?.id}-${index}`}>

                            <Image
                                className="rounded-md max-h-[360px] h-auto w-auto"
                                width={304}
                                height={304}
                                src={obj?.url}
                                alt='Musaic'
                            />
                            {obj.description && data?.main_content?.showCaptions === true &&
                                <div className="flex flex-wrap py-[20px] items-center justify-start">
                                    <div className="text-white text-[14px]"
                                        dangerouslySetInnerHTML={{ __html: obj?.description }} />
                                </div>
                            }


                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="absolute top-[30%] md:top-1/3 left-0 w-full flex justify-center">
                    <div className="swiper-pagination"></div>
                    {/* Customize navigation buttons */}
                    <div className={`prev-arrow h-[20px] w-[20px] md:h-[40px] md:w-[40px] ${styles.swiperButton} ${styles.swiperButtonPrev}`} onClick={handlePrev}>
                        <ArrowBackIcon className="text-black text-[12px] md:text-[20px]" />
                    </div>
                    <div className={`next-arrow h-[20px] w-[20px] md:h-[40px] md:w-[40px] ${styles.swiperButton} ${styles.swiperButtonNext}`} onClick={handleNext}>
                        <ArrowForwardIcon className="text-black text-[12px] md:text-[20px]" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageSlider;