'use client';


import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Scrollbar } from 'swiper/modules';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from 'next/image';
import { AristsNewsData } from '@/app/data/artists';

const ArtistNews = (data:any) => {
  return (
    <Swiper
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
        320: {
          slidesPerView: 1
        },
        576: {
          slidesPerView: 1.1
        },
        768: {
          slidesPerView: 1.5
        },
        1024: {
          slidesPerView: 2.5
        }
      }}
    >
      {AristsNewsData && AristsNewsData.map((news, index) => {
        return (
          <SwiperSlide key={`artistNews-${index}`}>
            <a href={news.url} target='_blank' className='relative rounded-xl flex xs:flex-row flex-col h-[300px] xs:h-auto gap-x-6 items-center bg-[#272727]'>
              {/* TODO::SIZES */}
              <Image className="hidden xs:block rounded-s-xl w-[250px] h-[200px] object-cover" width={250} height={200} src={news.imageUrl} alt={news.imageUrl} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" /> 
              <Image className="block xs:hidden rounded-xl w-full h-[300px] object-cover" width={300} height={300} src={news.imageUrl} alt={news.imageUrl} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" /> 
              <div className="absolute xs:relative font-cabin flex flex-col mx-auto justify-end xs:justify-evenly gap-y-6 pl-3 pr-3 pb-3 xs:pr-6 xs:pl-0 xs:pb-0 h-[300px] w-full xs:h-auto xs:w-auto bg-gradient-to-t from-black via-[rgba(0,0,0,0.3)] to-transparent xs:bg-none">
                <div className='text-lg line-clamp-3'>{ news.title }</div>
                <div className='flex flex-col gap-y-1'>
                  <span className='text-gray-500 text-xs'>By { news.author }</span>
                  <span className='text-gray-500 text-xs'>{ news.created_at }</span>
                </div>
              </div>
            </a>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default ArtistNews;