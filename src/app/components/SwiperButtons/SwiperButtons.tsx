import { useSwiper } from "swiper/react";

const SwiperButtons = () => {
    const swiper = useSwiper();
    return (<div className='flex w-full justify-end'>


        <div className='flex gap-x-3 items-center'>

            <button onClick={() => swiper.slidePrev()} className='flex items-center justify-center h-[35px] w-[35px] border-[3px] rounded-full cursor-pointer hover:bg-gray-700'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>


            <button onClick={() => swiper.slideNext()} className='flex items-center justify-center h-[35px] w-[35px] border-[3px] rounded-full  cursor-pointer hover:bg-gray-700'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>

            </button>

        </div>
    </div>)
};

export default SwiperButtons;