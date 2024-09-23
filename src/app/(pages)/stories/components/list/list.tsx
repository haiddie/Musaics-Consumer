'use client';

import Image from 'next/image';
import { StaticImageData } from 'next/image';
import checkmarkOutline from '../../../../../../public/musaic-icons/tick.png';
import closeOutline from '../../../../../../public/musaic-icons/x.png';
import footballOutline from '../../../../../../public/musaic-icons/drum.png';
import baseballOutline from '../../../../../../public/musaic-icons/music-note.png';
import basketballOutline from '../../../../../../public/musaic-icons/headphones.png';
import rugbyBallOutline from '../../../../../../public/musaic-icons/guitar-instrument.png';
import caretForwardOutline from '../../../../../../public/musaic-icons/play-button-arrowhead.png';
import checkboxOutline from '../../../../../../public/musaic-icons/checkbox.png';
import checkmarkCircleOutline from '../../../../../../public/musaic-icons/check.png';
import stopOutline from '../../../../../../public/musaic-icons/unchecked.png';
import trophyOutline from '../../../../../../public/musaic-icons/trumpet.png';
import { useEffect, useState } from 'react';


const iconMapping: { [key: string]: StaticImageData } = {
  'checkmark-outline': checkmarkOutline,
  'close-outline': closeOutline,
  'football-outline': footballOutline,
  'baseball-outline': baseballOutline,
  'basketball-outline': basketballOutline,
  'american-football-outline': rugbyBallOutline,
  'caret-forward-outline': caretForwardOutline,
  'checkbox-outline': checkboxOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'stop-outline': stopOutline,
  'trophy-outline': trophyOutline,
};



const List = ({ data }: any) => {

  return (
    <div className={`mx-2 flex flex-col gap-4 w-full justify-center bg-white  p-2 xl:p-4  py-4 rounded-xl`}>
      {data?.main_content?.listarray?.map((item: any, index: number) => {
        return (
          <div key={index} className='flex gap-x-2'>
            {item.type === 'unordered' ?
              <Image
                src={iconMapping[item?.icon_name]}
                alt="list"
                width={25}
                height={25}
                className='lg:col-span-2 lg:row-span-2 rounded-md text-black object-contain'
              /> : <div
                key={index}
                className={`h-[20px] w-[20px] cursor-pointer flex justify-center items-center ${item.shape === 'round' ? 'rounded-[20px]' : 'rounded-[0px]'}`}
                style={{ background: item.background }}
              >
                <p className={`text-[${item?.color}] `}>{index + 1}</p>
              </div>
            }

            <span className='text-black w-[90%]'>{item?.text}</span>
          </div>
        )
      })}
    </div>
  )
}

export default List;