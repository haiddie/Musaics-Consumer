

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination } from 'swiper/modules';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Rating, styled } from "@mui/material";
import Image from "next/image";
interface reviews {
    personImg: string;
    stars: number;
    review: string;
    personName: string;
    personType: string;
    companyLogo: string;

}

interface Props {
    data: reviews[];

}

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#7479F6',
    },
    '& .MuiRating-iconHover': {
        color: '#7479F6',
    },
});

const ReviewSlider: React.FC<Props> = ({ data }) => {
    return (
        <>
            <Swiper
                className='!flex flex-col-reverse items-center justify-center !pb-[100px]'
                spaceBetween={30}
                slidesPerView={1}
                centeredSlides={true}
                initialSlide={0}
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

            >
                {data?.map((obj: reviews, index: number) => (
                    <SwiperSlide key={`logo-ss-${index}`}>
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12">
                                <div className="flex justify-center">
                                    <StyledRating
                                        name="customized-color"

                                        value={obj.stars}
                                        precision={0.5}
                                        icon={<StarIcon fontSize="inherit" />}
                                        emptyIcon={<StarBorderOutlinedIcon fontSize="inherit" className="text-gray-400" />}
                                    />
                                </div>
                            </div>
                            <div className="col-span-12">
                                <p className="text-center text-[20px] lg:text-[24px] leading-[28px] lg:leading-[33.6px] font-[400]">
                                    {obj.review}
                                </p>
                            </div>
                            <div className="col-span-12 sm:col-span-6 px-4 sm:border-r-[0.3px] sm:border-white">
                                <div className="flex flex-col sm:flex-row items-center justify-end gap-x-4">
                                    <div
                                        className="mt-[5px]"
                                        dangerouslySetInnerHTML={{ __html: obj?.personImg }}
                                    />
                                    <div>
                                        <p className="text-[16px] font-[600]">{obj.personName}</p>
                                        <p className="text-[16px] font-[400]">{obj.personType}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6">

                                <div
                                    className="flex justify-center sm:justify-start"
                                    dangerouslySetInnerHTML={{ __html: obj?.companyLogo }}
                                />

                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default ReviewSlider;