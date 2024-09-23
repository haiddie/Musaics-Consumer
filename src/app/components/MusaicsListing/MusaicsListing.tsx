'use client';


import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Scrollbar } from 'swiper/modules';
import { getInitials } from '@/app/Util/errorImage';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from 'next/image';
import Title from '../Title';
import { useEffect, useState } from 'react';
import { IGenreData } from '@/app/(pages)/artists/models';
import { renderSkeletons } from '@/app/Util/skeleton';
import SwiperButtons from '../SwiperButtons/SwiperButtons';
import { useRouter } from 'next/navigation';

const MusaicsListing = (query: any) => {

  const [data, setMusaicData] = useState<IGenreData[]>([]);
  const [screenWidth, setScreenWidth] = useState(0);
  const [loader, setLoader] = useState(true)
  const router = useRouter();

  // #region FUNCTIONS

  const getMusaicsData = async () => {
    setLoader(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer${query?.query}`,
        { next: { revalidate: 3600 } }
      )
      const albumsRes = await res.json();
      setMusaicData(albumsRes.data);
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
    getMusaicsData();
  }, [query?.query])


  const openMoreStories = () => {
    router.push('musaics-archive')
  }

  // #endregion


  return (
    <div>
      {data?.length > 0 ?
        <div className='h-[540px] sm:h-[474px] lg:h-[37rem]'>
          <Swiper
            className='!flex flex-col-reverse'
            spaceBetween={30}
            slidesPerView={1}
            grabCursor={true}
            speed={1800}
            loop={true}
            // autoplay={{
            //   delay: 4000,
            //   pauseOnMouseEnter: true,
            // }}
            modules={[Scrollbar, A11y]}
            scrollbar={{ draggable: true }}
            breakpoints={{
              280: {
                slidesPerView: 1
              },
              320: {
                slidesPerView: 1.3
              },
              395: {
                slidesPerView: 1.7
              },
              455: {
                slidesPerView: 2
              },
              510: {
                slidesPerView: 2.2
              },
              576: {
                slidesPerView: 2.4
              },
              698: {
                slidesPerView: 3.2
              },
              798: {
                slidesPerView: 3.5
              },
              896: {
                slidesPerView: 4.2
              },
              1024: {
                slidesPerView: 3.5
              },
              1080: {
                slidesPerView: 3.7
              },
              1180: {
                slidesPerView: 4
              },
              1280: {
                slidesPerView: 4.5
              },
              1420: {
                slidesPerView: 4.8
              },
              1610: {
                slidesPerView: 5.5
              }
            }}
          >
            <div className='flex justify-between flex-wrap sm:flex-nowrap items-center gap-x-2'>
              <Title title="Immersive Stories" className='sm:flex flex-span-1' />
              <div className='flex-span-3 mb-0'>
                <button type='button' onClick={openMoreStories}
                  className='bg-[#7A38FE] rounded-full min-w-[100px] text-white p-2 ml-2 flex justify-center items-center' >See More</button>
              </div>
              <div className="border-t border-white w-full hidden sm:flex flex-span-3 mx-10"></div>
              <div className='flex-span-5 mb-6 sm:mb-0'>
                <SwiperButtons />
              </div>
            </div>
            {data?.map((news: any, index: number) => (
              <SwiperSlide key={`artistNews-${index}`} className="swiper-slide">
                <a href={`/stories/${news?.slug}`}>
                  <div className="relative cursor-pointer w-[210px] lg:w-[280px] min-h-[374px] lg:min-h-[496px] h-full">

                    {news?.thumbnail ? (
                      <Image
                        className="rounded-lg z-0 w-[210px] lg:w-[280px] min-h-[374px] lg:min-h-[496px] !h-full object-cover"
                        width={350}
                        height={450}
                        src={news?.thumbnail}
                        alt='Musaic'
                      />
                    ) : (
                      <div className='w-[210px] lg:w-[280px] min-h-[374px] lg:min-h-[496px] !h-full bg-gray-400 rounded-lg text-8xl text-gray-700 items-center flex justify-center'>
                        {getInitials(news?.title)}
                      </div>
                    )}
                    <div className="absolute top-0 left-0 z-5 w-full h-full bg-gradient-to-b from-transparent to-black rounded-lg"></div>
                    <div className="absolute bottom-0 font-[800]  w-full z-10 overflow-hidden p-[25px]  font-poppins">
                      <div className='flex flex-col gap-y-1 mt-2 w-full'>
                        <span className='text-violet-500 text-sm font-[700] mb-2'>
                          {new Date(news?.published_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                          })}
                        </span>
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: news?.title }} className='font-[700]  text-base text-white'></div>
                      {news?.organization && (
                        <div dangerouslySetInnerHTML={{ __html: news?.organization }} className='text-base uppercase font-semibold line-clamp-3 text-white text-right' />
                      )}
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div> :
        <div className="flex gap-x-4 mt-3">
          {loader && renderSkeletons(screenWidth < 520 ? 1 : screenWidth < 800 ? 3 : 5, '400')}
        </div>
      }
      {data?.length == 0 && !loader && (
        <div>
          <Title title="Immersive Stories" />
          <div className='text-2xl'>No data found!</div>
        </div>
      )}
    </div>)
}

export default MusaicsListing;