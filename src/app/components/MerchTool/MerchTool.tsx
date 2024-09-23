'use client';



import { classNames } from "@/app/Util/styling";
import MarketingHeroImage from "../MarketingHeroImage";
import SubHeader from "../SubHeader";

import SwiperButtons from '../SwiperButtons/SwiperButtons';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination, EffectCube, EffectFlip, EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';
import { useState } from "react";
import PricingTable from "../PricingTable";
import FAQS from "../FAQS";
import LogoSlider from "../LogoSlider";

import { useCallback, useEffect, useRef } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from '../../../styles/swiperStyles.module.css';
import PricingTableMerch from "../PricingTableMerch";
interface FeatureCategory {
  category: string;
  data: {
    name: string;
    column1: string;
    column2: string;
    column3: string;
  }[];
}
const MerchTool = () => {

  const sliderRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const benefits = [
    {
      name: 'Audio Player',
      id: 0
    },
    {
      name: 'Sponsors/Ads',
      id: 7
    },
    {
      name: 'Video Player',
      id: 1
    },
    {
      name: 'Newsletter',
      id: 8
    },
    {
      name: 'Album Art',
      id: 2
    },
    {
      name: 'Bio',
      id: 9
    },
    {
      name: 'Downloads',
      id: 3
    },
    {
      name: 'Contacts',
      id: 10
    },
    {
      name: 'Social Connects',
      id: 4
    },
    {
      name: 'Connect to Mailchimp',
      id: 11
    },
    {
      name: 'Streaming Connects',
      id: 5
    },

    {
      name: 'Connect to BandsInTown',
      id: 12
    },
    {
      name: 'Show Schedule',
      id: 6
    },
    {
      name: 'Advanced Analytics',
      id: 13
    },

  ]



  const benefits_mb = [
    {
      name: 'Audio Player',
      id: 0
    },
    {
      name: 'Video Player',
      id: 1
    },
    {
      name: 'Album Art',
      id: 2
    },
    {
      name: 'Downloads',
      id: 3
    },
    {
      name: 'Social connects',
      id: 4
    },
    {
      name: 'Streaming connects',
      id: 5
    },
    {
      name: 'Show Schedule',
      id: 6
    },

    {
      name: 'Sponsors/Ads',
      id: 7
    },
    {
      name: 'Newsletter',
      id: 8
    },
    {
      name: 'Bio',
      id: 9
    },
    {
      name: 'Contacts',
      id: 10
    },
    {
      name: 'Connect to Mailchimp',
      id: 11
    },
    {
      name: 'Connect to BandsInTown',
      id: 12
    },
    {
      name: 'Advanced Analytics',
      id: 13
    },

  ]


  const mobile_ss = [

    {
      img: '/images/music.png'
    },

    {
      img: '/images/videos.png'
    },
    {
      img: '/images/album-art.png'
    },
    {
      img: '/images/music.png'
    },
    {
      img: '/images/socials.png'
    },
    {
      img: '/images/streaming.png'
    },
    {
      img: '/images/shows.png'
    },
    {
      img: '/images/sponsors.png'
    },
    {
      img: '/images/newsletter.png'
    },

    {
      img: '/images/home.png'
    },
    {
      img: '/images/home.png'
    },
    {
      img: '/images/shows.png'
    },
    {
      img: '/images/shows.png'
    },








    {
      img: '/images/home.png'
    },

  ]

  const app_ss = [
    {
      img: '/images/music_placeholder.png'
    },
    {
      img: '/images/music_placeholder.png'
    },
    {
      img: '/images/music_placeholder.png'
    },
    {
      img: '/images/music_placeholder.png'
    },
    {
      img: '/images/music_placeholder.png'
    },
    {
      img: '/images/music_placeholder.png'
    },
    {
      img: '/images/music_placeholder.png'
    },
    {
      img: '/images/music_placeholder.png'
    },
    {
      img: '/images/music_placeholder.png'
    },
    {
      img: '/images/music_placeholder.png'
    },
  ]


  const logoArr =
    [
      {
        img: "/images/logo1.png"
      },
      {
        img: "/images/logo2.png"
      },
      {
        img: "/images/logo3.png"
      },
      {
        img: "/images/logo4.png"
      },
      {
        img: "/images/logo5.png"
      }
    ]


  const [plan, setPlan] = useState<string>('month')





  const worksArr = [
    {
      name: 'For Fans',
      description: 'The Cards are equipped with NFC and QR codes. With NFC you just tap the card to your phone, and your phone will automatically load the Tappi app and present the Artist&apos;s content. No app downloads or sign ins required. It&apos;s that simple.',
      icon: `<svg width="20" height="20" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.77908 8.64792L13.2431 1.67192C13.3439 1.47004 13.499 1.30023 13.6909 1.18155C13.8829 1.06287 14.1041 1 14.3297 1C14.5554 1 14.7766 1.06287 14.9686 1.18155C15.1605 1.30023 15.3156 1.47004 15.4164 1.67192L18.8804 8.64792L26.6244 9.77326C26.8478 9.80423 27.0579 9.89738 27.2309 10.0421C27.4039 10.1868 27.5327 10.3772 27.6026 10.5916C27.6725 10.8059 27.6808 11.0357 27.6264 11.2545C27.572 11.4734 27.4572 11.6725 27.2951 11.8293L21.6924 17.2559L23.0151 24.9226C23.1844 25.9066 22.1444 26.6559 21.2551 26.1919L14.3297 22.5706L7.40308 26.1919C6.51508 26.6573 5.47508 25.9066 5.64441 24.9213L6.96708 17.2546L1.36441 11.8279C1.20306 11.6711 1.08894 11.4721 1.03503 11.2537C0.981118 11.0352 0.989574 10.806 1.05944 10.5921C1.1293 10.3782 1.25777 10.1882 1.43024 10.0437C1.60271 9.89918 1.81226 9.80595 2.03508 9.77459L9.77908 8.64792Z" fill="white" stroke="white" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round"/>
            </svg>
            `
    },
    {
      name: 'For Artists',
      description: 'Artists can choose from prebuilt sections and can also build custom sections with AI and Tappi stories for a unique content experience. Artists can make content changes at any time for real-time updates. Fans do not need to re-scan to see the updates.',
      icon: `<svg width="20" height="20" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.3333 21.6693C18.4 21.6693 17.6111 21.347 16.9667 20.7026C16.3222 20.0582 16 19.2693 16 18.3359C16 17.4026 16.3222 16.6137 16.9667 15.9693C17.6111 15.3248 18.4 15.0026 19.3333 15.0026C19.5111 15.0026 19.7111 15.0195 19.9333 15.0533C20.1556 15.087 20.4 15.159 20.6667 15.2693V9.66927C20.6667 9.29149 20.7947 8.97505 21.0507 8.71994C21.3067 8.46483 21.6231 8.33683 22 8.33594H24C24.3778 8.33594 24.6947 8.46394 24.9507 8.71994C25.2067 8.97594 25.3342 9.29238 25.3333 9.66927C25.3333 10.047 25.2053 10.3639 24.9493 10.6199C24.6933 10.8759 24.3769 11.0035 24 11.0026H22.6667V18.3359C22.6667 19.2693 22.3444 20.0582 21.7 20.7026C21.0556 21.347 20.2667 21.6693 19.3333 21.6693ZM10.6667 11.0026C9.2 11.0026 7.94444 10.4804 6.9 9.43594C5.85556 8.39149 5.33333 7.13594 5.33333 5.66927C5.33333 4.2026 5.85556 2.94705 6.9 1.9026C7.94444 0.85816 9.2 0.335938 10.6667 0.335938C12.1333 0.335938 13.3889 0.85816 14.4333 1.9026C15.4778 2.94705 16 4.2026 16 5.66927C16 7.13594 15.4778 8.39149 14.4333 9.43594C13.3889 10.4804 12.1333 11.0026 10.6667 11.0026ZM1.33333 21.6693C0.955555 21.6693 0.639111 21.5413 0.384 21.2853C0.128889 21.0293 0.000888889 20.7128 0 20.3359V17.9359C0 17.1582 0.194667 16.4582 0.584 15.8359C0.973333 15.2137 1.48978 14.7359 2.13333 14.4026C3.51111 13.7137 4.91111 13.1973 6.33333 12.8533C7.75556 12.5093 9.2 12.3368 10.6667 12.3359C11.2889 12.3359 11.9058 12.3693 12.5173 12.4359C13.1289 12.5026 13.7453 12.6026 14.3667 12.7359C14.7444 12.8248 14.9831 13.0582 15.0827 13.4359C15.1822 13.8137 15.0769 14.1582 14.7667 14.4693C14.3 15.0248 13.9498 15.6306 13.716 16.2866C13.4822 16.9426 13.3658 17.6257 13.3667 18.3359C13.3667 18.6248 13.3836 18.9084 13.4173 19.1866C13.4511 19.4648 13.512 19.7479 13.6 20.0359C13.7111 20.4359 13.6613 20.8084 13.4507 21.1533C13.24 21.4982 12.9453 21.6702 12.5667 21.6693H1.33333Z" fill="white"/>
            </svg>
            `
    },
    {
      name: 'Advanced Analytics and Insights',
      description: 'Gain valuable insights into fan engagement and track the performance of your cards with our advanced analytics tools. Obtain meaningful insight about your audience and make data-driven decisions to optimize your sales and marketing strategies.',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clip-rule="evenodd" d="M4.80078 4.79844C4.80078 3.47296 5.8753 2.39844 7.20078 2.39844H12.7037C13.3402 2.39844 13.9507 2.65129 14.4008 3.10138L18.4978 7.19844C18.9479 7.64853 19.2008 8.25898 19.2008 8.89549V19.1984C19.2008 20.5239 18.1263 21.5984 16.8008 21.5984H7.20078C5.8753 21.5984 4.80078 20.5239 4.80078 19.1984V4.79844ZM7.20078 11.9984C7.20078 11.3357 7.73804 10.7984 8.40078 10.7984H15.6008C16.2635 10.7984 16.8008 11.3357 16.8008 11.9984C16.8008 12.6612 16.2635 13.1984 15.6008 13.1984H8.40078C7.73804 13.1984 7.20078 12.6612 7.20078 11.9984ZM8.40078 15.5984C7.73804 15.5984 7.20078 16.1357 7.20078 16.7984C7.20078 17.4612 7.73804 17.9984 8.40078 17.9984H15.6008C16.2635 17.9984 16.8008 17.4612 16.8008 16.7984C16.8008 16.1357 16.2635 15.5984 15.6008 15.5984H8.40078Z" fill="white"/>
            </svg>`
    },

  ]


  const plansArr: any[] = [
    {
      name: 'Silver',
      price: 'Free',
      desc: "Try it out, you’ll like it!",

    },
    {
      name: 'Gold',
      price: '$19',
      desc: "Multiple releases",

    },
    {
      name: 'Platinum',
      price: '$49',
      desc: "Publish your catalog",

    },

  ]



  const featureCategory: any[] = [
    {
      category: 'Feature Category',
      data: [
        {
          name: 'Feature text goes here',
          column1: '<p>10</p>',
          column2: '<p>25</p>',
          column3: '<p>Unlimited</p>'
        },
        {
          name: 'Feature text goes here',
          column1: '<img src="/icons/verify.png" />',
          column2: '',
          column3: '<img src="/icons/verify.png" />'
        },
        {
          name: 'Feature text goes here',
          column1: '<img src="/icons/verify.png" />',
          column2: '<img src="/icons/verify.png" />',
          column3: ''
        },
        {
          name: 'Feature text goes here',
          column1: '<img src="/icons/verify.png" />',
          column2: '<img src="/icons/verify.png" />',
          column3: '<img src="/icons/verify.png" />'
        },
      ]
    },
    {
      category: 'Feature Category',
      data: [
        {
          name: 'Feature text goes here',
          column1: '<p>10</p>',
          column2: '<p>25</p>',
          column3: '<p>Unlimited</p>'
        },
        {
          name: 'Feature text goes here',
          column1: '<img src="/icons/verify.png" />',
          column2: '',
          column3: '<img src="/icons/verify.png" />'
        },
        {
          name: 'Feature text goes here',
          column1: '<img src="/icons/verify.png" />',
          column2: '<img src="/icons/verify.png" />',
          column3: ''
        },
        {
          name: 'Feature text goes here',
          column1: '<img src="/icons/verify.png" />',
          column2: '<img src="/icons/verify.png" />',
          column3: '<img src="/icons/verify.png" />'
        },
      ]
    },
    {
      category: 'Feature Category',
      data: [
        {
          name: 'Feature text goes here',
          column1: '<p>10</p>',
          column2: '<p>25</p>',
          column3: '<p>Unlimited</p>'
        },
        {
          name: 'Feature text goes here',
          column1: '<img src="/icons/verify.png" />',
          column2: '',
          column3: '<img src="/icons/verify.png" />'
        },
        {
          name: 'Feature text goes here',
          column1: '<img src="/icons/verify.png" />',
          column2: '<img src="/icons/verify.png" />',
          column3: ''
        },
        {
          name: 'Feature text goes here',
          column1: '<img src="/icons/verify.png" />',
          column2: '<img src="/icons/verify.png" />',
          column3: '<img src="/icons/verify.png" />'
        },
      ]
    }
  ]


  const FAQSArr = [
    {
      question: "Are Tappi Cards like CDs?",
      answer:
        "As the next generation of music distribution, Tappi Cards are poised to replace traditional CDs as the go-to platform for direct musica album sales. Tappi Cards improve upon the CD format by providing full interactivity with your fans!",
    },
    {
      question: "What Content can I upload?",
      answer:
        "Pick the sections/tabs you want to upload content to. Music, video, album art, bio, shows, streaming, contact and sponsors, and more! When you have everything in place hit the publish button and the builder will do the rest.",
    },
    {
      question: "Can I change my content after I publish my Album Release?",
      answer:
        "You can change your content at any time by adding, editing or deleting content and re-publishing.",
    },
    {
      question:
        "I have a Mailchimp newsletter, can I connect the Tappi Card to that?",
      answer:
        "Capture email addresses directly to your Mailchimp account by adding your MailChimp key. We'll show you how!",
    },
    {
      question: "Is there Protection for my Music?",
      answer:
        "Yes, there is! That's what makes Tappi Cards so unique. You‘re in control. You choose how many times your cards can be scanned by Fans!",
    },
    {
      question: "Can I allow fans to download my Album Tracks?",
      answer:
        "Yes, that's your option, you determine that. You can include bonus tracks and high-res versions of your audio tracks too, if you like.",
    },
  ];

  const tab: string = "merch-tools"

  const swiperRef = useRef<any>(null);

  const selectSlide = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);

    }
  };
  return (
    <>
      <SubHeader tab={tab} />
      <div className="pt-[60px] w-[100%] bg-[#060B28]">




        <MarketingHeroImage title="One Tap Fan Engagement Tool" title2="" tab="merch-tools"
          subtitle="Tappi" image="/images/merch-tools-banner1.png"
          description="Tappi is modern-day merch. Increase your revenue with a unique fan acquisition and engagement solution. Tappi  gives fans instant access to your music and exclusive content through NFC and AI powered solutions." />

        {/* <div className="flex flex-col items-center justify-center w-full px-4 md:px-[130px]  pb-[80px] gap-y-4">
          <p className="font-inter font-[600] text-[16px] xl:text-[24px] leading-[36px] pb-2">Tappi Tools Introduction</p>

          <video className="rounded-lg h-full w-full object-cover" controls>
            <source src="/videos/intro2.mp4" type="video/mp4" />
            Your browser does not support the video tag.

          </video>
        </div> */}


        <div className='grid grid-cols-12 gap-6 bg-white bg-opacity-[0.1] w-full py-4  sm:pl-6 sm:py-6  md:py-[40px] px-4 md:px-[130px] '>
          <div className='col-span-12 lg:col-span-8'>
            <div className="flex h-full items-center">
              <div>

                <p className="text-[16px] xl:text-[24px] font-[600]  font-inter  leading-[24px] lg:leading-[36px]  py-2 text-left">Benefits</p>
                <h1 className="text-[32px] xl:text-[48px] font-[600] text-left max-w-[700px] leading-[38.4px] lg:leading-[57.6px]">What do I get with my Custom Tappi Card?</h1>

                <div className="grid grid-cols-12 gap-y-2 lg:gap-y-4 py-4 my-3">
                  {benefits.map((obj, index) => (
                    <div className="hidden sm:block sm:col-span-6" key={'benefit-' + index}>
                      <div className="flex flex-wrap gap-x-3 justify-start items-center cursor-pointer" onMouseOver={() => { selectSlide(obj.id) }} onClick={() => { selectSlide(obj.id) }}>
                        <img src="/icons/verify.png" className="w-[18.46px] h-[17.69px]" />
                        <p className="text-[16px] xl:text-[20px] font-[400] font-inter leading-[24.2px]">{obj.name}</p>
                      </div>
                    </div>
                  ))}
                  {benefits_mb.map((obj, index) => (
                    <div className="col-span-12 sm:hidden" key={'benefit-' + index}>
                      <div className="flex flex-wrap gap-x-3 justify-start items-center cursor-pointer" onMouseOver={() => { selectSlide(obj.id) }} onClick={() => { selectSlide(obj.id) }}>
                        <img src="/icons/verify.png" className="w-[18.46px] h-[17.69px]" />
                        <p className="text-[16px] xl:text-[20px] font-[400] font-inter leading-[24.2px]">{obj.name}</p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
          <div className='col-span-12 lg:col-span-4'>
            {/* <div className="flex w-full justify-center lg:justify-center"> */}
            <div className="!flex w-full !items-center !justify-center !lg:justify-center">
              <Swiper
                className='!flex !justify-center !items-center flex-col-reverse !pb-[50px]'
                spaceBetween={10}
                ref={swiperRef}
                slidesPerView={1}
                grabCursor={true}
                speed={1800}

                autoplay={{
                  delay: 4000,
                  pauseOnMouseEnter: true,
                }}
                effect={'coverflow'}



                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: false,
                }}


                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Autoplay, Scrollbar, A11y, Pagination]}
                scrollbar={{ draggable: true }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  450: { slidesPerView: 1 },
                  576: { slidesPerView: 1 },
                  768: { slidesPerView: 1 },
                  1024: { slidesPerView: 1 },
                  1420: { slidesPerView: 1 }
                }}
              >
                {mobile_ss?.map((obj: any, index: number) => (
                  <SwiperSlide key={`mobile-ss-${index}`} className="flex justify-center w-full">
                    <img src={obj.img} className="w-[200px] max-h-[400px] mx-auto" id={'ss-' + index} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute bottom-0 left-0 w-full flex justify-center">
                <div className="swiper-pagination"></div>
                {/* Customize navigation buttons */}

              </div>
              {/* </div> */}

            </div>
          </div>
        </div>


        <div className='grid grid-cols-12 gap-6 w-full  py-4  sm:pl-6 sm:py-6 xl:pl-[130px] xl:py-[130px]'>
          <div className='col-span-12 lg:col-span-6  px-4 md:px-0'>
            <div className="flex h-full items-center">
              <div>


                <p className="text-[16px] xl:text-[24px] font-[600]  font-inter  leading-[24px] lg:leading-[36px]  pt-4 pb-2 text-left">Smart Cards</p>
                <h1 className="text-[32px] xl:text-[48px] font-[600] text-left leading-[38.4px] lg:leading-[57.6px]">How It works</h1>


                <div className="grid grid-cols-12 gap-y-16 py-4">
                  {worksArr.map((obj, index) => (
                    <div className="col-span-12" key={'work' + index}>
                      <div className="flex justify-start items-start gap-x-2">
                        <div

                          dangerouslySetInnerHTML={{ __html: obj?.icon }}
                        />
                        <div className="flex flex-col gap-y-4">
                          <p className="text-[16px] lg:text-[20px] leading-[24.2px] lg:leading-[26px]font-inter font-[500]">{obj.name}</p>

                          <div
                            className="text-[16px] leading-[28px] font-inter font-[400]"
                            dangerouslySetInnerHTML={{ __html: obj.description }}
                          />
                        </div>

                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-12 lg:col-span-6'>

            <div className="bg-transparent items-center  flex justify-center  h-full w-full">
              <img src="/images/merch-tools-banner2.jpg" className="rounded-lg h-[280px] w-[280px]  xs:h-[354px]  xs:w-[354px] lg:pr-4 sm:pr-0 lg:w-[524px] max-h-[524px] lg:h-full object-cover" />
            </div>
          </div>
        </div>


        <div className='flex flex-col  justify-center bg-white bg-opacity-[0.1] w-full gap-y-2 py-4 sm:py-6 md:py-[100px] px-0 sm:px-6 lg:px-[130px]'>


          <p className="text-[16px] xl:text-[24px] font-[600]  font-inter  leading-[24px] lg:leading-[36px]  pt-4 pb-2 text-center">Explore</p>
          <h1 className="text-[32px] xl:text-[48px] font-[600] text-center leading-[38.4px] lg:leading-[57.6px] pb-4">Apps Screenshots</h1>
          <div className="relative">
            <Swiper
              ref={sliderRef}
              className='!flex flex-col-reverse !pb-[100px]'
              spaceBetween={10}
              centeredSlides={true}
              initialSlide={0}
              slidesPerView={1}
              grabCursor={true}
              speed={1800}
              loop={true}
              autoplay={{
                delay: 4000,
                pauseOnMouseEnter: true,
              }}

              pagination={{ clickable: true }} // Add pagination option
              modules={[Autoplay, Scrollbar, A11y, Pagination]}
              scrollbar={{ draggable: true }}
              breakpoints={{
                320: { slidesPerView: 1 },
                450: { slidesPerView: 1.7 },
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1420: { slidesPerView: 4 }
              }}
            >
              {app_ss?.map((obj: any, index: number) => (
                <SwiperSlide key={`app-ss-${index}`}>
                  <Image
                    className="rounded-lg z-0 w-full h-full px-4 sm:px-0 sm:w-[304px] sm:h-[304px] object-cover"
                    width={304}
                    height={304}
                    src={obj?.img}
                    alt='Musaic'
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute top-[35%] left-0 w-full flex justify-center">

              {/* Customize navigation buttons */}
              <div className={`prev-arrow ${styles.swiperButton} ${styles.swiperButtonPrev}`} onClick={handlePrev}>
                <ArrowBackIcon className="text-black" />
              </div>
              <div className={`next-arrow ${styles.swiperButton} ${styles.swiperButtonNext}`} onClick={handleNext}>
                <ArrowForwardIcon className="text-black" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full flex justify-center">
              <div className="swiper-pagination"></div>
              {/* Customize navigation buttons */}

            </div>
          </div>

        </div>



        <div className="pt-[60px] !w-[100%] bg-[#060B28]">
          <div className="flex flex-col items-center justify-center w-full   p-4 sm:p-6 lg:p-[130px] gap-2">
            <PricingTableMerch data={featureCategory} plansArr={plansArr} />
          </div>
        </div>


        <div className='flex flex-col justify-center bg-white bg-opacity-[0.1] w-full  py-[40px] px-4 sm:px-6 lg:px-[130px]'>
          <p className={`text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px]  font-[400] text-center`}>Extensive music industry experience working with top professionals in the field.</p>

          <div className="p-[10px] lg:p-[60px]">
            <LogoSlider data={logoArr} />
          </div>
        </div>


        <div className='flex flex-col justify-center bg-white bg-opacity-[0.1] w-full  py-[40px] px-4 sm:px-6 lg:px-[130px]'>

          <hr className="w-full border-[1px] border-white" />
          <FAQS data={FAQSArr} />

        </div>

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
            <p className="text-[20px] lg:text-[36px] leading-[24.2px] lg:leading-[43.57px] font-[600]">Let&apos;s build the next big</p>
            <p className="text-[20px] lg:text-[36px] leading-[24.2px] lg:leading-[43.57px] font-[600]">thing together</p>
            <button type="button" className="cursor-pointer bg-gradient-to-r from-[#777FF7] to-[#604AF5] text-white px-4 py-2 my-2 rounded-md">Sign Up</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MerchTool;