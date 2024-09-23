'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Scrollbar } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from 'next/image';
import Title from '../Title';
import { getInitials } from '@/app/Util/errorImage';
import { useCallback, useEffect, useState } from 'react';
import { renderSkeletons } from '@/app/Util/skeleton';
import SwiperButtons from '../SwiperButtons/SwiperButtons';

const ArtistNews = (query: any) => {

  const [data, setNewsData] = useState<any>([]);
  const [screenWidth, setScreenWidth] = useState(0);
  const [loader, setLoader] = useState(true)

  //#region FUNCTIONS

  const getNewsData = async () => {
    setLoader(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer${query?.query}`,
        { next: { revalidate: 3600 } }
      )
      const albumsRes = await res.json();
      setNewsData(albumsRes.data);
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
    getNewsData()
  }, [query?.query])

  //#endregion

  return (
    <div>
      {data?.length > 0 ?
        <div>
          <Swiper
            className='!flex flex-col-reverse'
            spaceBetween={30}
            slidesPerView={2.5}
            grabCursor={true}
            speed={1800}
            loop={true}
            autoplay={{
              delay: 4000,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay, Scrollbar, A11y]}
            scrollbar={{ draggable: true }}
            breakpoints={{
              280: {
                slidesPerView: 1
              },
              320: {
                slidesPerView: 1
              },
              395: {
                slidesPerView: 1
              },
              455: {
                slidesPerView: 1
              },
              510: {
                slidesPerView: 1
              },
              576: {
                slidesPerView: 1.5
              },
              768: {
                slidesPerView: 2
              },
              1240: {
                slidesPerView: 3
              }
            }}
          >
            <div className='flex justify-between items-center'>
              <Title title="News" className='flex-span-1' />
              <div className="border-t border-white w-full flex-span-8 mx-10"></div>
              <div className='flex-span-3'>
                <SwiperButtons></SwiperButtons>
              </div>
            </div>

            {data && data?.map((news: any, index: number) => {
              return (
                <SwiperSlide key={`artistNews-${index}`}>
                  <a href={`/news/${news.slug}`} className='relative rounded-xl flex xs:flex-row flex-col h-[300px] xs:h-auto gap-x-6 items-center bg-[#272727]'>
                    {/* TODO::SIZES */}
                    {news?.image ? <Image className="hidden xs:block rounded-s-xl w-full max-w-[250px] h-[200px] object-cover" width={250} height={200} src={news.image} alt={data.image} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" /> :
                      <div className='xs:block h-[200px] w-[250px] bg-gray-400 rounded-lg text-8xl text-gray-700 items-center flex justify-center'>
                        {getInitials(news?.title)}
                      </div>
                    }
                    {news?.thumbnail ? <Image className="block xs:hidden rounded-xl w-full h-[300px] object-cover" width={300} height={300} src={news.thumbnail} alt={data.thumbnail} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" /> :
                      <div className='xs:hidden h-[300px] w-full bg-gray-400 rounded-lg text-8xl text-gray-700 items-center flex justify-center'>
                        {getInitials(news?.title)}
                      </div>
                    }
                    <div className="absolute xs:relative font-cabin flex flex-col mx-auto justify-end xs:justify-evenly gap-y-6 pl-3 pr-3 pb-3 xs:pr-6 xs:pl-0 xs:pb-0 h-[300px] w-full xs:h-auto xs:w-auto bg-gradient-to-t from-black via-[rgba(0,0,0,0.3)] to-transparent xs:bg-none">
                      <div className='text-lg line-clamp-3'>{news.title}</div>
                      <div className='flex flex-col gap-y-1'>
                        <span className='text-gray-500 text-xs'>{new Date(news.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div> :
        <div className="flex gap-x-4 mt-3">
          {loader && renderSkeletons(screenWidth < 520 ? 1 : 3, '200')}
        </div>

      }
      {
        data?.length == 0 && !loader && <div>
          <Title title="News" />
          <div className='text-2xl'>
            No data found!
          </div>
        </div>
      }
    </div>)
}

export default ArtistNews;