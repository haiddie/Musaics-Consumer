"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    A11y,
    Autoplay,
    Navigation,
    Scrollbar,
    Pagination,
} from "swiper/modules";
import Image from "next/image";

import FAQS from "../FAQS";
import { useRouter } from "next/navigation";
import GenericModal from "../modal/modal";
import Login from "../login/login";

import { useOpenSignupModal } from "@/app/Util/signInModal";

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
const MusicFans = () => {
    const router = useRouter(); // Move the useRouter hook inside the component
    const FAQSArr = [
        {
            question: "How to join Tappi?",
            answer:
                "To join Tappi, simply visit our website and sign up for a free account. Once registered, you'll have access to a wide range of immersive stories from emerging artists, allowing you to explore their creative process and personal journeys.",
        },
        {
            question: "How can I contribute?",
            answer:
                "As a music fan, you can contribute to the Tappi community by publishing your own stories, from your unique point of view. Share your experiences with music, connect with the artists you follow, and contribute to the collective appreciation of music's impact.",
        },
        {
            question: "How to discover artists?",
            answer:
                "Discovering artists on Tappi is easy. Simply browse through immersive stories and explore the creative process, inspirations, and personal journeys of emerging artists. Follow the ones that resonate with you and stay updated with their latest stories.",
        },
        {
            question: "How to connect with artists?",
            answer:
                "Connecting with artists on Tappi is simple. You can engage with them by commenting on their tappi stories, sharing your thoughts and experiences, and showing your support. Join the tappi community and build meaningful connections with your favorite artists.",
        },
    ];

    const artists = [
        {
            name: "Eskimo Jones",
            img: "/images/music-fans-mage2.jpg",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
        },
        {
            name: "Think Down Low",
            img: "/images/music-fans-mage3.jpg",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
        },
        {
            name: "The Jetlags",
            img: "/images/music-fans-mage4.jpg",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
        },
    ];

    const sliderRef = useRef<any>(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    const openPage = (tab: string) => {
        router.push(`/${tab}`);
    };

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

    return (
        <>
            <div className=" bg-[#060B28]">
                <div className="bg-[url('/images/marketing-tools-banner.jpg')] bg-cover bg-center min-h-[500px]">
                    <div className="grid grid-cols-12 py-[150px] mt-[70px] bg-gray-800 bg-opacity-50 h-full min-h-[500px] lg:gap-6 px-4 sm:px-6 xl:p-[130px] ">
                        <div className="col-span-12  ">
                            <div className="h-full w-full flex justify-center items-center">
                                <div className="max-w-[720px]">
                                    <h1 className="text-[32px] xl:text-[48px]  font-[600] font-inter text-center leading-[38.4px] xl:leading-[57.6px]">
                                        New Stories, New Artists, New Connections
                                    </h1>
                                    <p className="text-[16px] xl:text-[18px] font-[400] font-inter leading-[24px] text-center py-4">
                                        Explore the world of emerging artists and share your musical
                                        experiences.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12  w-full  p-4 sm:p-6 xl:p-[130px] lg:gap-x-8">
                    <div className="col-span-12 xl:col-span-6">
                        <div className="flex  items-start h-full">
                            <div>
                                <p className="text-[16px] xl:text-[24px] font-[600]  font-inter leading-[24px] xl:leading-[36px]  py-2 text-left">
                                    Immersive Stories
                                </p>
                                <h1 className="text-[32px] xl:text-[48px] font-[600]   text-left leading-[38.4px] xl:leading-[57.6px]">
                                    {" "}
                                    Discover the Untold Stories of Artists on Tappi
                                </h1>

                                <p className="text-[16px] font-400 leading-[24px] py-2 text-left">
                                    Immerse yourself in the creative process, inspirations, and
                                    personal journeys of emerging artists through unique
                                    multimedia Stories on Tappi. Gain a deeper understanding of
                                    the music you love and connect with artists on a more personal
                                    level.
                                </p>
                                <div className="flex items-center justify-start gap-4 py-3">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7.34701 0.161719C7.76089 -0.0539062 8.23867 -0.0539062 8.65256 0.161719L14.7248 3.31797C14.9609 3.43984 15.1109 3.70547 15.1109 3.99922C15.1109 4.29297 14.9609 4.55859 14.7248 4.68047L8.65256 7.83672C8.23867 8.05234 7.76089 8.05234 7.34701 7.83672L1.27478 4.68047C1.03867 4.55547 0.888672 4.28984 0.888672 3.99922C0.888672 3.70859 1.03867 3.43984 1.27478 3.31797L7.34701 0.161719ZM13.247 6.54922L14.7248 7.31797C14.9609 7.43984 15.1109 7.70547 15.1109 7.99922C15.1109 8.29297 14.9609 8.55859 14.7248 8.68047L8.65256 11.8367C8.23867 12.0523 7.76089 12.0523 7.34701 11.8367L1.27478 8.68047C1.03867 8.55547 0.888672 8.28984 0.888672 7.99922C0.888672 7.70859 1.03867 7.43984 1.27478 7.31797L2.75256 6.54922L6.97478 8.74297C7.29616 8.90973 7.64587 8.99609 7.99978 8.99609C8.3537 8.99609 8.70341 8.90973 9.02478 8.74297L13.247 6.54922ZM9.02478 12.743L13.247 10.5492L14.7248 11.318C14.9609 11.4398 15.1109 11.7055 15.1109 11.9992C15.1109 12.293 14.9609 12.5586 14.7248 12.6805L8.65256 15.8367C8.23867 16.0523 7.76089 16.0523 7.34701 15.8367L1.27478 12.6805C1.03867 12.5555 0.888672 12.2898 0.888672 11.9992C0.888672 11.7086 1.03867 11.4398 1.27478 11.318L2.75256 10.5492L6.97478 12.743C7.29616 12.9097 7.64587 12.9961 7.99978 12.9961C8.3537 12.9961 8.70341 12.9097 9.02478 12.743Z"
                                            fill="white"
                                        />
                                    </svg>

                                    <p>Uncover the Stories Behind the Music</p>
                                </div>

                                <div className="flex items-center justify-start gap-4 py-3">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.12737 9.79467C8.50025 9.79467 8.81581 9.66578 9.07403 9.408C9.33181 9.14978 9.4607 8.83422 9.4607 8.46133V4.64133H11.2814V3.61533H8.94803V7.48733C8.83781 7.36733 8.71425 7.27755 8.57736 7.218C8.44092 7.158 8.29092 7.128 8.12737 7.128C7.75492 7.128 7.43959 7.25711 7.18136 7.51533C6.92314 7.77356 6.79425 8.08911 6.7947 8.462C6.7947 8.83444 6.92359 9.14978 7.18136 9.408C7.43914 9.66578 7.75403 9.79467 8.12737 9.79467ZM5.4087 11.3333C5.10203 11.3333 4.84603 11.2307 4.6407 11.0253C4.43492 10.8196 4.33203 10.5633 4.33203 10.2567V3.07667C4.33203 2.77 4.43492 2.514 4.6407 2.30867C4.84648 2.10289 5.1027 2 5.40936 2H12.5894C12.896 2 13.152 2.10289 13.3574 2.30867C13.5631 2.514 13.666 2.77 13.666 3.07667V10.2567C13.666 10.5633 13.5634 10.8196 13.358 11.0253C13.1523 11.2307 12.896 11.3333 12.5894 11.3333H5.4087ZM3.4087 13.3333C3.10203 13.3333 2.84603 13.2307 2.6407 13.0253C2.43492 12.8196 2.33203 12.5633 2.33203 12.2567V4.41H2.9987V12.2567C2.9987 12.3589 3.04136 12.4529 3.1267 12.5387C3.21248 12.624 3.30648 12.6667 3.4087 12.6667H11.2554V13.3333H3.4087Z"
                                            fill="white"
                                        />
                                    </svg>

                                    <p>Experience Music in a Whole New Way</p>
                                </div>

                                <div className="flex items-center justify-start gap-4 py-3">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.6667 13.3346C11.2 13.3346 10.8056 13.1735 10.4833 12.8513C10.1611 12.5291 10 12.1346 10 11.668C10 11.2013 10.1611 10.8069 10.4833 10.4846C10.8056 10.1624 11.2 10.0013 11.6667 10.0013C11.7556 10.0013 11.8556 10.0097 11.9667 10.0266C12.0778 10.0435 12.2 10.0795 12.3333 10.1346V7.33464C12.3333 7.14575 12.3973 6.98752 12.5253 6.85997C12.6533 6.73241 12.8116 6.66841 13 6.66797H14C14.1889 6.66797 14.3473 6.73197 14.4753 6.85997C14.6033 6.98797 14.6671 7.14619 14.6667 7.33464C14.6667 7.52352 14.6027 7.68197 14.4747 7.80997C14.3467 7.93797 14.1884 8.00175 14 8.0013H13.3333V11.668C13.3333 12.1346 13.1722 12.5291 12.85 12.8513C12.5278 13.1735 12.1333 13.3346 11.6667 13.3346ZM7.33333 8.0013C6.6 8.0013 5.97222 7.74019 5.45 7.21797C4.92778 6.69575 4.66667 6.06797 4.66667 5.33464C4.66667 4.6013 4.92778 3.97352 5.45 3.4513C5.97222 2.92908 6.6 2.66797 7.33333 2.66797C8.06667 2.66797 8.69444 2.92908 9.21667 3.4513C9.73889 3.97352 10 4.6013 10 5.33464C10 6.06797 9.73889 6.69575 9.21667 7.21797C8.69444 7.74019 8.06667 8.0013 7.33333 8.0013ZM2.66667 13.3346C2.47778 13.3346 2.31956 13.2706 2.192 13.1426C2.06444 13.0146 2.00044 12.8564 2 12.668V11.468C2 11.0791 2.09733 10.7291 2.292 10.418C2.48667 10.1069 2.74489 9.86797 3.06667 9.7013C3.75556 9.35686 4.45556 9.09864 5.16667 8.92664C5.87778 8.75464 6.6 8.66841 7.33333 8.66797C7.64444 8.66797 7.95289 8.68464 8.25867 8.71797C8.56444 8.7513 8.87267 8.8013 9.18333 8.86797C9.37222 8.91241 9.49156 9.02908 9.54133 9.21797C9.59111 9.40686 9.53844 9.57908 9.38333 9.73464C9.15 10.0124 8.97489 10.3153 8.858 10.6433C8.74111 10.9713 8.68289 11.3129 8.68333 11.668C8.68333 11.8124 8.69178 11.9542 8.70867 12.0933C8.72555 12.2324 8.756 12.374 8.8 12.518C8.85556 12.718 8.83067 12.9042 8.72533 13.0766C8.62 13.2491 8.47267 13.3351 8.28333 13.3346H2.66667Z"
                                            fill="white"
                                        />
                                    </svg>

                                    <p>Connect with Artists and Fellow Music Fans</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 xl:col-span-6">
                        <div className="bg-transparent !items-center  !flex justify-center   h-full w-full">
                            <img
                                src="/images/about-us-image1.jpg"
                                className="h-[348px] rounded-lg w-[348px] xl:w-[524px] xl:h-[524px] max-h-[524px] object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12  w-full py-4 sm:py-6  xl:py-[40px] px-4 sm:px-6 xl:px-[130px] bg-white bg-opacity-[0.1] lg:gap-6">
                    <div className="hidden xl:block xl:col-span-6 ">
                        <div className="bg-transparent items-center flex justify-center  h-full w-full">
                            <img
                                src="/images/merch-tool-video-placeholder.jpg"
                                className="h-[348px] rounded-lg w-[348px] xl:w-[524px] max-h-[524px] xl:h-[524px] object-cover"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 xl:col-span-6">
                        <div className="flex justify-start  items-center w-full h-full">
                            <div>
                                <p className="text-[16px] xl:text-[24px] font-[600] xl:py-2  font-inter  leading-[36px] text-left">
                                    Amplify
                                </p>
                                <h1 className="text-[32px] xl:text-[48px] font-[600] text-left leading-[38.4px] xl:leading-[57.6px]">
                                    {" "}
                                    Share Your Journey with Tappi
                                </h1>

                                <p className="text-[16px] font-400 leading-[1.5] py-2 text-left">
                                    With Tappi, you have the power to share your own fan generated
                                    stories and contribute to the vibrant music community. Amplify
                                    your voice, gain visibility, and connect with the artists you
                                    love.
                                </p>

                                <p className="text-[16px] font-400 leading-[1.5] py-2 text-left">
                                    See what other Fans experience our as they share their unique
                                    journeys.
                                </p>
                                <button
                                    type="button"
                                    className="mt-4 px-4 py-2 bg-gradient-to-r from-[#6960F5] to-[#757BF6] rounded-md"
                                    onClick={() => {
                                        openPage("musaics-archive");
                                    }}
                                >
                                    Explore Immersive Stories
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 xl:hidden pt-4">
                        <div className="bg-transparent items-center flex justify-center  h-full w-full">
                            <img
                                src="/images/merch-tool-video-placeholder.jpg"
                                className="rounded-lg h-[280px] w-[280px]  xs:h-[354px]  xs:w-[354px] xl:w-[524px] max-h-[524px] xl:h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12  w-full  p-4 sm:p-6 xl:p-[130px] gap-4">
                    <div className="col-span-12">
                        <div className="flex justify-center  items-center w-full h-full">
                            <div className="max-w-[891px]">
                                <p className="text-[16px] xl:text-[24px] font-[600] py-2  font-inter  leading-[24px] xl:leading-[36px] text-center">
                                    Explore
                                </p>
                                <h1 className="text-[32px] xl:text-[48px] font-[600] text-center leading-[38.4px] xl:leading-[57.6px]">
                                    {" "}
                                    Join the Tappi Community and Discover the Stories Behind the
                                    Music
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 xl:col-span-4">
                        <div className="flex flex-col  w-full max-w-[376px] mx-auto gap-6">
                            <img
                                src="/images/music-fans-mage2.jpg"
                                className="h-[240px] max-w-[376px] rounded-lg w-full object-cover"
                            />
                            <p className="font-inter font-[600] text-[24px] leading-[33.6px] text-center min-h-[100px]">
                                Create and Share Your Own Immersive Stories
                            </p>
                            <p className="font-inter font-[400] text-[16px] leading-[24px] text-center min-h-[100px]">
                                Gain visibility in our unique musical community, connect with
                                your favorite artists, and contribute to the collective
                                appreciation of music&apos;s impact.
                            </p>
                            <button
                                type="button"
                                className="bg-transparent border-[0.3px] mx-auto border-white w-[120px] rounded-md text-[14px] font-inter font-[400] leading-[16.94px] px-3 py-2"
                                onClick={checkLogin}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    <div className="col-span-12 xl:col-span-4">
                        <div className="flex flex-col  w-full max-w-[376px] mx-auto gap-6">
                            <img
                                src="/images/music-fans-mage3.jpg"
                                className="h-[240px] max-w-[376px] w-full rounded-lg object-cover"
                            />
                            <p className="font-inter font-[600] text-[24px] leading-[33.6px] text-center min-h-[100px]">
                                Explore a World of Unique Multimedia Stories
                            </p>
                            <p className="font-inter font-[400] text-[16px] leading-[24px] text-center min-h-[100px]">
                                Immerse yourself in the creative process, inspirations, and
                                personal journeys of emerging artists.
                            </p>
                            <button
                                type="button"
                                className="bg-transparent border-[0.3px] mx-auto border-white w-[120px] rounded-md text-[14px] font-inter font-[400] leading-[16.94px] px-3 py-2"
                                onClick={() => {
                                    openPage("musaics-archive");
                                }}
                            >
                                View Immersive Stories
                            </button>
                        </div>
                    </div>

                    <div className="col-span-12 xl:col-span-4">
                        <div className="flex flex-col  w-full max-w-[376px] mx-auto gap-6">
                            <img
                                src="/images/music-fans-mage4.jpg"
                                className="h-[240px] max-w-[376px] w-full rounded-lg object-cover"
                            />
                            <p className="font-inter font-[600] text-[24px] leading-[33.6px] text-center min-h-[100px]">
                                Connect with Artists and Share Your Music Experiences
                            </p>
                            <p className="font-inter font-[400] text-[16px] leading-[24px] text-center min-h-[100px]">
                                Engage with artists on a personal level, purchase exclusive
                                content and contribute to the music community.
                            </p>
                            <button
                                type="button"
                                className="bg-transparent border-[0.3px] mx-auto border-white w-[120px] rounded-md text-[14px] font-inter font-[400] leading-[16.94px] px-3 py-2"
                                onClick={() => {
                                    openPage("artists");
                                }}
                            >
                                Discover
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12  w-full py-[40px] px-4 sm:px-6 xl:px-[130px] bg-white bg-opacity-[0.1] gap-6">
                    <div className="col-span-12  ">
                        <p className="text-[16px] xl:text-[24px] font-[600] py-2  font-inter  leading-[24px] xl:leading-[36px] text-center">
                            Our Faves
                        </p>
                        <h1 className="text-[32px] xl:text-[48px] font-[600] text-center leading-[38.4px] xl:leading-[57.6px]">
                            {" "}
                            View Artists
                        </h1>

                        <p className="text-[16px] xl:text-[18px] font-inter font-[400] leading-[24px] text-center pt-6 pb-16">
                            Showcasing exceptional emerging artists world wide
                        </p>

                        <div className="relative">
                            <Swiper
                                ref={sliderRef}
                                className="!flex flex-col-reverse"
                                spaceBetween={30}
                                slidesPerView={1}
                                initialSlide={0}
                                grabCursor={true}
                                centeredSlides={true}
                                speed={1800}
                                loop={true}
                                autoplay={{
                                    delay: 4000,
                                    pauseOnMouseEnter: true,
                                }}
                                modules={[Autoplay, Scrollbar, A11y, Pagination]}
                                scrollbar={{ draggable: true }}
                                breakpoints={{
                                    320: { slidesPerView: 1 },
                                    450: { slidesPerView: 1 },
                                    576: { slidesPerView: 1.5 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 2.5 },
                                    1420: { slidesPerView: 3 },
                                }}
                            >
                                {artists?.map((obj: any, index: number) => (
                                    <SwiperSlide
                                        key={`artist-${index}`}
                                        className="border-white border-[0.3px] rounded-md"
                                    >
                                        <Image
                                            className=" z-0 w-full h-full  px-0 sm:w-full min-h-[400px] xl:min-h-[500px] sm:max-h-[650px] object-cover"
                                            width={304}
                                            height={304}
                                            src={obj?.img}
                                            alt="Musaic"
                                        />
                                        <h1 className="text-[16px] xl:text-[24px] font-inter font-[700] leading-[33.6px] px-4 py-3">
                                            {obj.name}
                                        </h1>
                                        <p className="text-[16px] font-inter font-[400] leading-[24px] px-4">
                                            {obj.desc}
                                        </p>
                                        <div className="flex items-center justify-start gap-4 mb-[40px] px-4">
                                            <button
                                                type="button"
                                                className="mt-4 px-4 py-2 bg-gradient-to-r from-[#6960F5] to-[#757BF6] rounded-md"
                                            >
                                                Tag one
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-4 px-4 py-2 bg-gradient-to-r from-[#6960F5] to-[#757BF6] rounded-md"
                                            >
                                                Tag two
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-4 px-4 py-2 bg-gradient-to-r from-[#6960F5] to-[#757BF6] rounded-md"
                                            >
                                                Tag three
                                            </button>
                                        </div>
                                        <div className="py-6 px-4 my-2">
                                            {/*<a
                        href="{name}"
                        className="text-white text-[16px] font-inter font-[400] leading-[24px] "
                      >
                        View Artists
                      </a> */}
                                            <button
                                                type="button"
                                                className="mt-4 px-4 py-2 bg-gradient-to-r from-[#6960F5] to-[#757BF6] rounded-md"
                                                onClick={() => {
                                                    openPage("");
                                                }}
                                            >
                                                View Artist Profile
                                            </button>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="absolute top-1/2 left-0 w-full flex justify-center">
                                <div className="swiper-pagination"></div>
                                {/* Customize navigation buttons */}
                                <div
                                    className={`prev-arrow ${styles.swiperButton} ${styles.swiperButtonPrev}`}
                                    onClick={handlePrev}
                                >
                                    <ArrowBackIcon className="text-black" />
                                </div>
                                <div
                                    className={`next-arrow ${styles.swiperButton} ${styles.swiperButtonNext}`}
                                    onClick={handleNext}
                                >
                                    <ArrowForwardIcon className="text-black" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center mt-[50px]">
                            <button
                                type="button"
                                className="mt-4 px-4 py-2 bg-gradient-to-r from-[#6960F5] to-[#757BF6] rounded-md"
                                onClick={() => {
                                    openPage("artists");
                                }}
                            >
                                View All
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center bg-white bg-opacity-[0.1] w-full py-[40px] px-4 sm:px-6 xl:px-[130px] ">
                    <FAQS data={FAQSArr} />
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

export default MusicFans;