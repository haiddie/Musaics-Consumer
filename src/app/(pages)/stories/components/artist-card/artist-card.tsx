'use client';

import { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import Image from 'next/image';
import { NumberFormatter } from '@/app/Util/numberFormatter';
import "./artist-card.css"


const ArtistCard = ({ data }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [screenWidth, setScreenWidth] = useState<any>(270)
  const [screenHeight, setScreenHeight] = useState<any>(530)

  // #region FUNCTIONS

  const handleClick = () => {

    if (isFlipped) {
      setIsFlipped(false);
    }
    else {
      setIsFlipped(true);
    }

  };


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {

        if (window.innerWidth < 640) {
          setScreenWidth(250);
          setScreenHeight(451)
        }
        else {
          setScreenWidth(300);
          setScreenHeight(530)
        }

      };

      if (window.innerWidth < 640) {
        setScreenWidth(250);
        setScreenHeight(451)
      }
      else {
        setScreenWidth(300);
        setScreenHeight(530)
      }
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [window.innerWidth]);

  // #endregion 

  return (
    <>


      <div className={`border-2 !w-[${screenWidth}px] bg-black border-gray-700 rounded-xl cursor-pointer sm:min-h-[${screenHeight}px] max-h-[${screenHeight}px] p-21`}
        onClick={handleClick} style={{ background: data?.main_content?.team_color_1 }}>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerClassName={`!w-[${screenWidth}px]`} >


          <div style={{ width: screenWidth + 'px', height: screenHeight + 'px' }}
            className={`relative h-[${screenHeight}px] min-w-[${screenWidth}px] max-w-[${screenWidth}px] w-[${screenWidth}px] rounded-lg`}>

            <Image
              src={data?.main_content?.display_picture}
              alt="artist-card"
              width={450}
              height={450}
              className={`lg:col-span-2 lg:row-span-2 rounded-lg px-3 pt-3 max-w-[${screenWidth}px] min-h-[340px] object-cover`}
            />
            <div style={{ background: data?.main_content?.team_color_1 }} className="absolute top-[2px] right-[5px] bg-black z-99 flex justify-center font-bold align-middle items-center h-12 w-12 md:h-16 md:w-16 rounded-full" >
              <div style={{ color: data?.main_content?.team_color_2 }} className="text-2xl" >{data?.main_content?.popularity}</div>
            </div>

            {isFlipped === false && (
              <div className='absolute opacity-70 bottom-[180px] bg-black w-[98%] z-90'>
                <div className="  flex justify-center align-middle items-center">
                  <h1 className="flex align-middle justify-center items-center text-15">
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-25">
                      <path fillRule="evenodd" clipRule="evenodd" d="M34.3542 19.362C33.8923 19.8446 33.8923 20.627 34.3542 21.1096C34.8807 21.6596 35.6342 22.5 35.6342 24.0976C35.6342 24.5171 35.4425 25.1726 34.8758 25.9821C34.3206 26.7754 33.4577 27.6383 32.2694 28.451C29.9319 30.0497 26.4047 31.4053 21.7409 31.6577L23.5584 29.9623C24.0457 29.5078 24.088 28.7266 23.6529 28.2175C23.2178 27.7084 22.47 27.6641 21.9827 28.1187L17.8427 31.9805C17.5913 32.215 17.4476 32.5503 17.4476 32.9024C17.4476 33.2544 17.5913 33.5897 17.8427 33.8242L21.9827 37.686C22.47 38.1406 23.2178 38.0964 23.6529 37.5873C24.088 37.0781 24.0457 36.2969 23.5584 35.8424L21.7259 34.133C26.8254 33.8802 30.8143 32.4004 33.5652 30.5188C34.946 29.5744 36.033 28.516 36.7854 27.4411C37.5264 26.3825 38 25.2229 38 24.0976C38 21.4936 36.6835 20.0477 36.0271 19.362C35.5651 18.8793 34.8162 18.8793 34.3542 19.362ZM3.76598 19.509C4.15022 20.061 4.03341 20.8339 3.50507 21.2353C3.22959 21.4446 2.36576 22.4405 2.36576 24.0977C2.36576 25.1591 2.88518 26.5872 4.78033 27.9697C6.70403 29.3731 10.0021 30.6846 15.3724 31.367C16.0209 31.4494 16.4827 32.0654 16.4038 32.743C16.3249 33.4205 15.7353 33.9029 15.0868 33.8205C9.51545 33.1126 5.79013 31.7209 3.4259 29.9962C1.0331 28.2506 0 26.1258 0 24.0977C0 21.5532 1.30479 19.851 2.1136 19.2364C2.64194 18.835 3.38173 18.9571 3.76598 19.509Z" fill="white"></path>
                      <path d="M30.0833 22.8703V5.62959C30.0833 4.27496 28.975 3.16663 27.6203 3.16663H10.3796C9.02496 3.16663 7.91663 4.27496 7.91663 5.62959V22.8703C7.91663 24.225 9.02496 25.3333 10.3796 25.3333H27.6203C28.975 25.3333 30.0833 24.225 30.0833 22.8703ZM14.6898 16.0972L17.7685 19.8039L22.0787 14.25L27.6203 21.6388H10.3796L14.6898 16.0972Z" fill="white"></path>
                    </svg> Flip
                  </h1>
                </div>
              </div>
            )}



            <div className="flex justify-center w-full uppercase text-[14px] sm:!text-[18px] my-[4px] sm:!my-[10px] font-semibold" style={{ color: data?.main_content?.team_color_2 }}>
              {data?.main_content?.name}
            </div>

            <div className='flex justify-center min-h-[80px] items-center text-lg sm:mt-2 font-cabin sm:my-4 gap-y-2 flex-wrap bg-[#f5f5dc] mx-2 p-2 rounded-lg'>
              {data?.main_content?.genres.slice(0, 3).map((item: any, index: number) => {
                return <div key={index} className='mx-2 whitespace-nowrap'>
                  <span
                    className=" px-2 capitalize py-1 border border-black text-[14px] sm:text-[18px] rounded-full text-black !font-bold"
                    style={{ color: data?.main_content?.team_color_1 }}
                    key={item}
                  >
                    {item}
                  </span>
                </div>
              })}
              {data?.main_content.genres.length === 0 && (<span className='text-black'>No Genres</span>)}
            </div>
          </div>

          <div style={{ width: screenWidth + 'px', height: screenHeight + 'px' }} className={`min-w-[${screenWidth}px] max-w-[${screenWidth}px] w-[${screenWidth}px] bg-[#f5f5dc] p-5 rounded-lg`} >
            <div className={`uppercase text-black text-center font-semibold text-[17px]`}>
              {data?.main_content?.name}
            </div>
            <div className={`grid grid-cols-12 gap-2   justify-left px-4`}>
              <div className='col-span-6   border-none'>
                <span className='text-black !font-semibold text-[12px] !leading-[2.0]'>Folowers : </span>
                <span className='border-none text-black !font-normal text-[12px] !leading-[2.0]'>{NumberFormatter(data?.main_content?.followers)}</span>
              </div>
              <div className='col-span-6   border-none'>
                <span className='text-black !font-semibold text-[12px] !leading-[2.0]'>Popularity : </span>
                <span className='border-none text-black !font-normal text-[12px] !leading-[2.0]'>{data?.main_content?.popularity}</span>
              </div>
            </div>
            <hr

              className="w-[90%] mx-4 my-2 border-black border-[2px]" />
            <div className="relative z-10 px-4">
              <p dangerouslySetInnerHTML={{ __html: data?.display_text }} className="!bg-transparent text-black !leading-tight !text-[12px]  !font-normal  font-cabin musaics-text"></p>
            </div>

          </div>
        </ReactCardFlip>
      </div>
    </>
  );
}

export default ArtistCard;