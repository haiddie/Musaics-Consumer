"use client";


import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Scrollbar } from 'swiper/modules';
import { getInitials } from '@/app/Util/errorImage';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from 'next/image';
import Title from '../Title';
import { useCallback, useEffect, useState } from 'react';
import { IGenreData } from '@/app/(pages)/artists/models';
import { renderSkeletons } from '@/app/Util/skeleton';
import SwiperButtons from '../SwiperButtons/SwiperButtons';

const LandmarksListing = ({ id }: any) => {
    const [data, setLandmarksData] = useState<IGenreData[]>([]);
    const [screenWidth, setScreenWidth] = useState(0);
    const [loader, setLoader] = useState(true)


    // #region FUNCTIONS

    const getLandmarksData = async () => {
        setLoader(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_LOGIN_URL}?landmark=true&city_id=${id}`,
                { next: { revalidate: 3600 } }
            )
            const landmarkRes = await res.json();
            setLandmarksData(landmarkRes.data);
            setLoader(false);

        } catch (error) {
            console.error('ERROR: >>>', error);
            setLoader(false);
        }
    }

    // #endregion

    // #region LIFECYCLE

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setScreenWidth(window.innerWidth);
            };
            setScreenWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        getLandmarksData();
    }, [id])

    // #endregion


    return (
        <div>
            {data?.length > 0 && !loader ? (
                <div>
                    <Swiper
                        className="!flex flex-col-reverse"
                        spaceBetween={30}
                        slidesPerView={1}
                        grabCursor={true}
                        speed={1800}
                        loop={true}
                        modules={[Scrollbar, A11y]}
                        scrollbar={{ draggable: true }}
                        breakpoints={{
                            280: {
                                slidesPerView: 1,
                            },
                            320: {
                                slidesPerView: 1.5,
                            },
                            576: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },

                            1420: {
                                slidesPerView: 5,
                            },
                        }}
                    >
                        <div className="hidden md:flex justify-between items-center">
                            <Title title="Landmarks" className="flex-span-1" />
                            <div className="border-t border-white w-full flex-span-8 mx-10"></div>
                            <div className="flex-span-3">
                                <SwiperButtons></SwiperButtons>
                            </div>
                        </div>
                        {data?.map((landmark: any, index: number) => {
                            return (
                                <SwiperSlide key={`artistNews-${index}`}>
                                    <a className="relative w-full overlay inline-block">
                                        {landmark?.image ? (
                                            <Image
                                                className="rounded-lg z-0 min-h-[520px] max-h-[520px] w-full max-w-[450px] object-cover"
                                                width={350}
                                                height={450}
                                                src={landmark?.image}
                                                alt="Musaic"
                                            />
                                        ) : (
                                            <div className="h-[520px]  w-auto bg-gray-400 rounded-lg text-8xl text-gray-700 items-center flex justify-center">
                                                {getInitials(landmark?.title)}
                                            </div>
                                        )}
                                        <div className="absolute top-0 left-0 w-full h-full  bg-gradient-to-b from-transparent to-black rounded-lg"></div>
                                        <div className="relative top-[-160px] bottom-[40px] left-[1px] w-full max-w-[350px] z-10 overflow-hidden px-3">
                                            <div
                                                dangerouslySetInnerHTML={{ __html: landmark?.title }}
                                                className="text-lg line-clamp-3 text-white mb-6"
                                            ></div>
                                            <div
                                                title={landmark?.description}
                                                className="flex flex-col gap-y-1 mt-2"
                                            >
                                                <span className="text-white text-sm mb-2">
                                                    {landmark?.description.slice(0, 150)}{" "}
                                                    {landmark?.description?.length > 150 ? "..." : ""}
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            ) : (
                <div className="flex gap-x-4 mt-3">
                    {loader &&
                        renderSkeletons(
                            screenWidth < 520 ? 1 : screenWidth < 800 ? 3 : 5,
                            "400"
                        )}
                </div>
            )}

            {data?.length == 0 && !loader && (
                <div>
                    <Title title="Tappi" />
                    <div className="text-2xl">No Landmarks found!</div>
                </div>
            )}
        </div>)
}

export default LandmarksListing;