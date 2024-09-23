

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination } from 'swiper/modules';
import Image from 'next/image';
interface logos {
    img: string;

}

interface Props {
    data: logos[];

}
const LogoSlider: React.FC<Props> = ({ data }) => {
    return (
        <>
            <Swiper
                className='!flex flex-col-reverse items-center justify-center'
                spaceBetween={30}
                slidesPerView={1}
                grabCursor={true}
                speed={1800}
                loop={true}
                autoplay={{
                    delay: 4000,
                    pauseOnMouseEnter: true,
                }}

                pagination={{ clickable: true }} // Add pagination option
                modules={[Autoplay, Scrollbar, A11y, Pagination]}
                scrollbar={{ draggable: true }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    450: { slidesPerView: 1.7 },
                    576: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 3.5 },
                    1420: { slidesPerView: 5 }
                }}
            >
                {data?.map((obj: any, index: number) => (
                    <SwiperSlide key={`logo-ss-${index}`}>
                        <Image
                            className="rounded-lg z-0 w-[304px] h-[304px] px-4 sm:px-0 sm:w-[162px] sm:h-[162px] object-contain"
                            width={304}
                            height={304}
                            src={obj?.img}
                            alt='Musaic'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default LogoSlider;