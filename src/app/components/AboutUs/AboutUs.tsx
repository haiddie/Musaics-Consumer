"use client";

import SubHeader from "../SubHeader";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import {
    A11y,
    Autoplay,
    Navigation,
    Scrollbar,
    Pagination,
} from "swiper/modules";
import Image from "next/image";

import { useOpenSignupModal } from "@/app/Util/signInModal";
import GenericModal from "../modal/modal";
import Login from "../login/login";
import { useCallback, useEffect, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "../../../styles/swiperStyles.module.css";

interface FeatureCategory {
    category: string;
    data: {
        name: string;
        column1: string;
        column2: string;
        column3: string;
    }[];
}
const AboutUs = () => {
    const sliderRef = useRef<any>(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    const { isOpen, openSignupModal, closeModal } = useOpenSignupModal();

    const checkLogin = () => {
        const userDataFromStorage = localStorage.getItem("userInfo");

        if (userDataFromStorage) {
        } else {
            openSignupModal("signup");
        }
    };

    const checkIsLoggedIn = () => {
        const userDataFromStorage = localStorage.getItem("userInfo");
        if (userDataFromStorage) {
            console.log("User is logged in");
        } else {
            console.log("User is not logged in");
        }
    };

    useEffect(() => {
        // Check if user is logged in when component mounts
        checkIsLoggedIn();
    }, []);

    const app_ss = [
        {
            img: "/images/marketing-tools-ss1.jpg",
            title:
                "We promise to redefine the way artists and fans connect over music.",
        },
        {
            img: "/images/marketing-tools-ss2.jpg",
            title:
                "For artists, we pledge to provide innovative, easy-to-use tools that empower them to share their stories, grow their fanbase, and monetize their work directly and effectively. ",
        },
        {
            img: "/images/marketing-tools-ss3.jpg",
            title:
                "For fans, we offer a unique window into the soul of the music they love, enabling them to engage with artists on a personal level and contribute their own experiences to the musical narrative. ",
        },
        {
            img: "/images/marketing-tools-ss4.jpg",
            title:
                "Tappi is committed to building a vibrant community where every interaction is meaningful, every story is heard, and every connection celebrates the power of music to inspire and unite. ",
        },
        {
            img: "/images/marketing-tools-ss5.jpg",
            title:
                "With Tappi, every note tells a story, and every story brings us closer.",
        },
    ];

    return (
        <>
            <div className=" bg-[#060B28]">
                <div className="bg-[url('/images/marketing-tools-banner.jpg')] bg-cover bg-center min-h-[500px]">
                    <div className="grid grid-cols-12 py-[150px] mt-[30px] bg-gray-800 bg-opacity-50 h-full min-h-[500px] lg:gap-6 px-4 lg:px-10 xl:p-[130px]">
                        <div className="col-span-12 md:col-span-6">
                            <div className="h-full flex justify-start items-start">
                                <div>
                                    <p className="text-[16px] xl:text-[24px] font-[600]  font-inter leading-[24px] lg:leading-[36px]  py-2 text-left">
                                        Transforming
                                    </p>
                                    <h1 className="text-[32px] xl:text-[48px] font-[600]   text-left leading-[38.4px] lg:leading-[57.6px]">
                                        {" "}
                                        Empowering Artists, Enchanting Fans
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 ">
                            <div className="h-full flex  items-start">
                                <div>
                                    <p className="text-[16px] lg:text-[18px] font-[400] leading-[24px] text-left pt-4 md:py-0">
                                        Tappi redefines the way artists and fans connect over music
                                        by providing innovative tools for artists to share their
                                        stories, grow their fan base, and monetize their work.
                                    </p>
                                    <p className="text-[16px] lg:text-[18px] font-[400] leading-[24px] text-left py-6">
                                        For fans, Tappi offers a unique window into the soul of the
                                        music they love, enabling them to engage with artists on a
                                        personal level and contribute their own experiences to the
                                        musical narrative.
                                    </p>
                                    <p className="text-[16px] lg:text-[18px] font-[400] leading-[24px] text-left">
                                        Every interaction on Tappi is meaningful, celebrating the
                                        power of music to inspire and unite.
                                    </p>

                                    <div className="flex items-center justify-start gap-4 mt-[40px] mx-4 xl:mx-0">
                                        <button
                                            type="button"
                                            className="cursor-pointer bg-gradient-to-r from-[#6960F5] to-[#757BF6] text-white px-4 py-2   rounded-md"
                                        >
                                            Learn More
                                        </button>

                                        <button
                                            type="button"
                                            onClick={checkLogin}
                                            className="cursor-pointer bg-transparent border-[1px] border-white text-white px-4  py-2 rounded-md"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12  w-full  p-4 sm:p-6 xl:p-[130px] lg:gap-x-8">
                    <div className="col-span-12 xl:col-span-6">
                        <div className="flex  items-start h-full">
                            <div>
                                <p className="text-[16px] xl:text-[24px] font-[600]  font-inter leading-[24px] lg:leading-[36px]  py-2 text-left">
                                    Our Story
                                </p>
                                <h1 className="text-[32px] xl:text-[48px] font-[600]   text-left leading-[38.4px] lg:leading-[57.6px]">
                                    {" "}
                                    Born from Artists, For Artists: The Tappi Story
                                </h1>

                                <p className="text-[16px] font-400 leading-[1.5] py-2 text-left">
                                    Tappi was born from a simple idea: to revolutionize the way
                                    artists and fans connect. Founded by a group of musicians and
                                    tech enthusiasts, we&apos;ve experienced firsthand the
                                    challenges and rewards of sharing music in the digital age.
                                </p>
                                <p className="text-[16px] font-400 leading-[1.5]  py-2 text-left">
                                    Our journey is about more than just building a platform;
                                    it&apos;s about creating a community where every note tells a
                                    story, and every story brings us closer.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 xl:col-span-6">
                        <div className="bg-transparent !items-center  !flex justify-center   h-full w-full">
                            <img
                                src="/images/about-us-image1.jpg"
                                className="h-[348px] w-[348px] xl:w-[524px] xl:h-[524px] rounded-lg max-h-[524px] object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12  w-full py-4 sm:py-6 xl:py-[40px] px-4 sm:px-6 xl:px-[130px] bg-white bg-opacity-[0.1] gap-6">
                    <div className="hidden xl:block xl:col-span-6 ">
                        <div className="bg-transparent items-center flex justify-center  h-full w-full">
                            <img
                                src="/images/merch-tool-video-placeholder.jpg"
                                className="h-[348px] w-[348px] xl:w-[524px] rounded-lg max-h-[524px] xl:h-[524px] object-cover"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 xl:col-span-6">
                        <div className="flex justify-start  items-end w-full h-full">
                            <div>
                                <p className="text-[16px] xl:text-[24px] font-[600]  font-inter leading-[24px] lg:leading-[36px]  py-2 text-left">
                                    Making Connections
                                </p>
                                <h1 className="text-[32px] xl:text-[48px] font-[600]   text-left leading-[38.4px] lg:leading-[57.6px]">
                                    {" "}
                                    Uniting Artists and Fans, Note by Note
                                </h1>

                                <p className="text-[16px] font-400 leading-[1.5] py-2 text-left">
                                    At Tappi, we believe in the power of music to unite. Our
                                    platform is designed to forge deeper connections between
                                    emerging artists and music devotees through shared stories,
                                    experiences, and direct support. Here, every interaction is a
                                    step towards a more vibrant and supportive music community.
                                </p>

                                <div className="grid grid-cols-12 my-8 gap-x-6">
                                    <div className="col-span-12 xl:col-span-6">
                                        <div className="flex gap-x-2 items-center w-full">
                                            <svg
                                                width="30"
                                                height="28"
                                                viewBox="0 0 30 28"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M10.449 8.98191L13.913 2.00591C14.0138 1.80402 14.1689 1.63421 14.3609 1.51553C14.5528 1.39685 14.774 1.33398 14.9997 1.33398C15.2253 1.33398 15.4465 1.39685 15.6385 1.51553C15.8304 1.63421 15.9855 1.80402 16.0863 2.00591L19.5503 8.98191L27.2943 10.1072C27.5177 10.1382 27.7279 10.2314 27.9008 10.3761C28.0738 10.5207 28.2026 10.7112 28.2725 10.9255C28.3425 11.1399 28.3507 11.3697 28.2963 11.5885C28.242 11.8074 28.1271 12.0065 27.965 12.1632L22.3623 17.5899L23.685 25.2566C23.8543 26.2406 22.8143 26.9899 21.925 26.5259L14.9997 22.9046L8.073 26.5259C7.185 26.9912 6.145 26.2406 6.31433 25.2552L7.637 17.5886L2.03433 12.1619C1.87298 12.0051 1.75886 11.8061 1.70495 11.5877C1.65104 11.3692 1.6595 11.14 1.72936 10.9261C1.79922 10.7122 1.92769 10.5222 2.10016 10.3777C2.27263 10.2332 2.48218 10.1399 2.705 10.1086L10.449 8.98191Z"
                                                    fill="white"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    stroke-linecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>

                                            <h4 className="text-[20px] font-[700]">For Fans</h4>
                                        </div>
                                        <p className="text-[16px] font-[400] py-4">
                                            Exclusive access to behind-the-scenes content,
                                            opportunities to contribute their own stories about their
                                            favorite artists, and unique engagement with artists
                                            directly.
                                        </p>
                                    </div>

                                    <div className="col-span-12 xl:col-span-6">
                                        <div className="flex gap-x-2 items-center">
                                            <svg
                                                width="26"
                                                height="22"
                                                viewBox="0 0 26 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M19.3333 21.6673C18.4 21.6673 17.6111 21.3451 16.9667 20.7007C16.3222 20.0562 16 19.2673 16 18.334C16 17.4007 16.3222 16.6118 16.9667 15.9673C17.6111 15.3229 18.4 15.0007 19.3333 15.0007C19.5111 15.0007 19.7111 15.0175 19.9333 15.0513C20.1556 15.0851 20.4 15.1571 20.6667 15.2673V9.66732C20.6667 9.28954 20.7947 8.9731 21.0507 8.71799C21.3067 8.46287 21.6231 8.33487 22 8.33398H24C24.3778 8.33398 24.6947 8.46198 24.9507 8.71799C25.2067 8.97398 25.3342 9.29043 25.3333 9.66732C25.3333 10.0451 25.2053 10.362 24.9493 10.618C24.6933 10.874 24.3769 11.0015 24 11.0007H22.6667V18.334C22.6667 19.2673 22.3444 20.0562 21.7 20.7007C21.0556 21.3451 20.2667 21.6673 19.3333 21.6673ZM10.6667 11.0007C9.2 11.0007 7.94444 10.4784 6.9 9.43398C5.85556 8.38954 5.33333 7.13398 5.33333 5.66732C5.33333 4.20065 5.85556 2.9451 6.9 1.90065C7.94444 0.856207 9.2 0.333984 10.6667 0.333984C12.1333 0.333984 13.3889 0.856207 14.4333 1.90065C15.4778 2.9451 16 4.20065 16 5.66732C16 7.13398 15.4778 8.38954 14.4333 9.43398C13.3889 10.4784 12.1333 11.0007 10.6667 11.0007ZM1.33333 21.6673C0.955555 21.6673 0.639111 21.5393 0.384 21.2833C0.128889 21.0273 0.000888889 20.7109 0 20.334V17.934C0 17.1562 0.194667 16.4562 0.584 15.834C0.973333 15.2118 1.48978 14.734 2.13333 14.4007C3.51111 13.7118 4.91111 13.1953 6.33333 12.8513C7.75556 12.5073 9.2 12.3349 10.6667 12.334C11.2889 12.334 11.9058 12.3673 12.5173 12.434C13.1289 12.5007 13.7453 12.6007 14.3667 12.734C14.7444 12.8229 14.9831 13.0562 15.0827 13.434C15.1822 13.8118 15.0769 14.1562 14.7667 14.4673C14.3 15.0229 13.9498 15.6287 13.716 16.2847C13.4822 16.9407 13.3658 17.6238 13.3667 18.334C13.3667 18.6229 13.3836 18.9064 13.4173 19.1847C13.4511 19.4629 13.512 19.746 13.6 20.034C13.7111 20.434 13.6613 20.8064 13.4507 21.1513C13.24 21.4962 12.9453 21.6682 12.5667 21.6673H1.33333Z"
                                                    fill="white"
                                                />
                                            </svg>

                                            <h4 className="text-[20px] font-[700]">For Artists</h4>
                                        </div>
                                        <p className="text-[16px] font-[400] py-4">
                                            Tappi represents a groundbreaking platform designed to
                                            amplify your voice and connect you with a dedicated
                                            fanbase. It offers a suite of tools tailored to help you
                                            share your story, showcase your creativity, and engage
                                            with fans on a deeper level.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 xl:hidden ">
                        <div className="bg-transparent items-center flex justify-center  h-full w-full">
                            <img
                                src="/images/merch-tool-video-placeholder.jpg"
                                className="rounded-lg h-[280px] w-[280px]  xs:h-[354px]  xs:w-[354px] xl:w-[524px] max-h-[524px] xl:h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center  w-full  p-4 sm:p-6 xl:p-[130px] gap-2">
                    <p className="text-[16px] xl:text-[24px] font-[600]  font-inter leading-[24px] lg:leading-[36px]  py-2 text-left">
                        Our Pledge
                    </p>
                    <h1 className="text-[32px] xl:text-[48px] font-[600] pb-6 xl:pb-[40]   text-left leading-[38.4px] lg:leading-[57.6px]">
                        {" "}
                        Connecting Hearts and Harmonies: Our Pledge to You
                    </h1>
                    <div className="relative">
                        <Swiper
                            ref={sliderRef}
                            className="!flex flex-col-reverse"
                            spaceBetween={30}
                            slidesPerView={1}
                            grabCursor={true}
                            centeredSlides={true}
                            initialSlide={0}
                            speed={1800}
                            loop={true}
                            autoplay={{
                                delay: 4000,
                                pauseOnMouseEnter: true,
                            }}
                            modules={[Autoplay, Scrollbar, A11y, Pagination]}
                            scrollbar={{ draggable: true }}
                            breakpoints={{
                                280: { slidesPerView: 1 },
                                350: { slidesPerView: 1.2 },
                                450: { slidesPerView: 1.2 },
                                576: { slidesPerView: 2 },
                                768: { slidesPerView: 2.5 },
                                1024: { slidesPerView: 3.5 },
                                1420: { slidesPerView: 3.5 },
                                1520: { slidesPerView: 4 },
                            }}
                        >
                            {app_ss?.map((obj: any, index: number) => (
                                <SwiperSlide key={`app-ss-${index}`}>
                                    <div className="relative w-full flex items-center justify-center">
                                        {/* Image with white border */}
                                        <div className="rounded-lg overflow-hidden border w-[280px] h-[280px]  md:px-0 md:w-[304px] md:h-[304px] border-white relative">
                                            <Image
                                                className="w-[280px] h-[280px] rounded-md  md:px-0 md:w-[304px] md:h-[304px] object-cover"
                                                width={304}
                                                height={304}
                                                src={obj?.img}
                                                alt="Musaic"
                                            />
                                            <div className="absolute inset-0 bg-gray-700 opacity-30"></div>
                                        </div>
                                        {/* Text overlay */}
                                        <div className="absolute inset-0 flex items-center   justify-center ">
                                            <h2 className="text-white text-[16px] font-[400] max-w-[280px] px-6 md:max-w-[304px] leading-[24px]">
                                                {obj?.title}
                                            </h2>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="absolute top-1/2 left-0 w-full flex justify-center">
                            <div className="swiper-pagination"></div>
                            {/* Customize navigation buttons */}
                            <div
                                className={`prev-arrow h-[20px] w-[20px] md:h-[40px] md:w-[40px] ${styles.swiperButton} ${styles.swiperButtonPrev}`}
                                onClick={handlePrev}
                            >
                                <ArrowBackIcon className="text-black text-[12px] md:text-[20px]" />
                            </div>
                            <div
                                className={`next-arrow h-[20px] w-[20px] md:h-[40px] md:w-[40px] ${styles.swiperButton} ${styles.swiperButtonNext}`}
                                onClick={handleNext}
                            >
                                <ArrowForwardIcon className="text-black text-[12px] md:text-[20px]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className='grid grid-cols-12  w-full py-[60px] bg-white bg-opacity-[0.1] gap-6 px-4 sm:px-6 xl:px-[130px]'>
                    <div className='hidden xl:block xl:col-span-6 '>


                        <div className="bg-transparent items-center flex justify-center  h-full w-full">

                            <video className="w-full max-h-[327px] max-w-[600px] rounded-lg object-cover" controls>
                                <source src="/videos/intro2.mp4" type="video/mp4" />
                                Your browser does not support the video tag.

                            </video>
                        </div>
                    </div>
                    <div className='col-span-12 xl:col-span-6'>
                        <div className="flex justify-start  items-start w-full h-full">
                            <div>
                                <h1 className="text-[32px] xl:text-[48px] font-[600] pb-6 xl:pb-[40]   text-left leading-[38.4px] lg:leading-[57.6px]">
                                    Discover the Beat of Our Community
                                </h1>


                                <p className="text-[16px] font-400 leading-[1.5]  text-left">Explore the essence of Tappi in our brief video introduction. Learn how we&apos;re transforming the way artists and fans connect, offering innovative tools and exclusive insights. Witness the unique blend of creativity and community that makes Tappi a special place for music lovers and creators alike. Join our journey and feel the rhythm of our united community.</p>

                            </div>
                        </div>

                    </div>


                    <div className='col-span-12 xl:hidden pt-4'>


                        <div className="bg-transparent items-center flex justify-center  h-full w-full">
                            <video className="rounded-lg h-full w-full object-cover" controls>
                                <source src="/videos/intro2.mp4" type="video/mp4" />
                                Your browser does not support the video tag.

                            </video>

                        </div>
                    </div>

                </div> */}

                <div className="relative flex flex-col h-[300px] items-center justify-center">
                    {/* Container for background image and gray mask */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Background image */}
                        <div
                            className="absolute inset-0 bg-[url('/images/footer-banner.png')] bg-cover bg-center"
                            style={{ zIndex: 22 }}
                        ></div>
                        {/* Gray mask overlay */}
                        <div className="absolute  z-[23] inset-0 bg-gray-900 opacity-30"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-[24] flex flex-col items-center justify-center text-center text-white">
                        <p className="text-[20px] lg:text-[32px] font-[600] leading-[24.2px] lg:leading-[38.73px] ">
                            Join The Tappi Community
                        </p>
                        <p className="mt-2 text-[14px] lg:text-[20px] px-4 leading-[16.94px] lg:leading-[24.2px] font-[400]">
                            Discover a new world of music connection and storytelling with
                            Tappi.
                        </p>
                        <button
                            type="button"
                            onClick={checkLogin}
                            className="mt-4 px-4 py-2 bg-gradient-to-r from-[#777FF7] to-[#604AF5] rounded-md"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                <GenericModal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    customStyles={{
                        content: {
                            top: "50%",
                            left: "50%",
                            right: "auto",
                            bottom: "auto",
                            marginRight: "-50%",
                            transform: "translate(-50%, -50%)",
                        },
                    }}
                    width="650"
                >
                    <Login type="signup" loginTrigger={checkLogin} onclose={closeModal} />
                </GenericModal>
            </div>
        </>
    );
};

export default AboutUs;