import { useSwiper } from "swiper/react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from '../../../styles/swiperStyles.module.css';
const CustomizedSwiperButtons = () => {
    const swiper = useSwiper();

    return (<div className='flex w-full justify-end'>


        <div className='flex gap-x-3 items-center'>

            <button onClick={() => swiper.slidePrev()} className={`${styles.swiperButton} ${styles.swiperButtonPrev}`}>
                <ArrowBackIcon className="text-black" />
            </button>


            <button onClick={() => swiper.slideNext()} className={`${styles.swiperButton} ${styles.swiperButtonNext}`}>
                <ArrowForwardIcon className="text-black" />

            </button>

        </div>
    </div>)
};

export default CustomizedSwiperButtons;