'use client';

import Image from 'next/image';
import { useState } from 'react';

const Wikipedia = ({ data }: any) => {
  const [imageSrc, setImageSrc] = useState(data?.image_url);


  const handleError = (img: string) => {
    setImageSrc(img);
  };
  return (
    <div className="grid grid-cols-12 grid-rows-1">
      <div className="col-span-2 sm:col-span-2 md:col-span-2 xl:colspan-2 rounded-lg">
        <div className="h-[100px] rounded-lg">

          <>
            {
              data?.type === 'other' && <img
                src={imageSrc}
                onError={() => handleError('/icons/bulb-img.svg')}
                alt="wiki"
                width={650}
                height={650}
                className='h-[80px] sm:h-[120px] object-cover  xl:h-[120px]  rounded-lg ' />
            }
            {
              data?.type === 'organization' && <Image
                src={imageSrc}
                onError={() => handleError('/icons/organization-img.svg')}
                alt="wiki"
                width={650}
                height={650}
                className='h-[80px] sm:h-[120px] object-cover  xl:h-[120px]  rounded-lg ' />
            }
            {
              data?.type === 'person' && <Image
                src={imageSrc}
                onError={() => handleError('/icons/person-img.svg')}
                alt="wiki"
                width={650}
                height={650}
                className='h-[80px] sm:h-[120px] object-cover  xl:h-[120px]  rounded-lg ' />
            }
          </>



        </div>
      </div>
      <div className="col-span-9 sm:col-span-9 md:col-span-9 text-left">
        <div className="relative">
          <div className="cursor-text text-[16px] px-2 text-white">
            {data?.main_content?.name}
          </div>
          <div className="relative z-10">
            <p dangerouslySetInnerHTML={{ __html: data?.main_content?.data[0]?.description }} className="text-[14px] min-h-[120px] px-2 pb-2  border-none text-white font-cabin musaics-text"></p>
          </div>
        </div>
      </div>

      <div className="col-span-1 flex justify-center align-middle items-center">
        <div className='flex flex-col justify-center'>
          <a target="_blank" href={data?.url}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
            </svg>

            <div className="uppercase text-primary-base text-xs font-RohnRounded-Bold">wiki</div>
          </a>

        </div>
      </div>
    </div>
  )
}

export default Wikipedia;