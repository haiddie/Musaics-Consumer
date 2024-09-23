'use client';

import Image from 'next/image';


const Trivia = ({ data }: any) => {
  return (
    <div >
      <div className="bg-white p-2 rounded-md flex flex-col items-center justify-center">
        <div className='w-full'>
          <div
            className="bg-[#0F172A] h-[80px] w-[80px] border-[#0F172A] border-[0.5px] flex justify-center items-center text-[#0F172A] absolute mt-[-20px]  left-1/2 -translate-x-1/2 rounded-full">
            <img src="/icons/musical.png" className="h-[40px] w-[40px]" />
          </div>
        </div>
        <div className="bg-transparent rounded-md flex-col px-3 pb-6 min-h-[120px] pt-[60px]">
          <div dangerouslySetInnerHTML={{ __html: data?.main_content?.question }} className="flex justify-left text-black w-full text-2xl" />


          <p dangerouslySetInnerHTML={{ __html: data?.main_content?.text }} className=" text-base sm:text-xl !text-black  trivia-text" />
        </div>
      </div>
    </div>
  )
}

export default Trivia;