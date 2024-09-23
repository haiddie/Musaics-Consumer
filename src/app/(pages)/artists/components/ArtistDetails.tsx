'use client'

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from 'react'
import Image from 'next/image';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ArtistNews from "@/app/components/News/News";
import MusaicsListing from "@/app/components/MusaicsListing/MusaicsListing";
import { classNames } from "@/app/Util/styling";
import { renderSkeletons } from "@/app/Util/skeleton";
import { NumberFormatter } from "@/app/Util/numberFormatter";
import { handleFacebookShare, handleTwitterShare } from "@/app/Util/socialMediaSharing";



const ArtistDetails = () => {

  const params = useParams();
  const router = useRouter();
  const content_url = typeof window !== 'undefined' ? window.location.href : '';


  // #region STATES 

  const [artistData, setArtistData] = useState<any>();
  const [albumsData, setAlbumsData] = useState<any>();
  const [achievementsData, setAchievementsData] = useState<any>();
  const [isDesktop, setIsDesktop] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(1);



  // #endregion

  // #region API

  const getArtistData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer?artist=true&slug=${params.id}`,
        { next: { revalidate: 3600 } }
      )
      const artistRes = await res.json();
      setArtistData(artistRes.data[0]);
    } catch (error) {
      console.log('ERROR: >>>', error);
    }
  }

  const getAlbumsData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer?album=true&slug=${params.id}`,
        { next: { revalidate: 3600 } }
      )
      const albumsRes = await res.json();
      setAlbumsData(albumsRes.data);
    } catch (error) {
      console.log('ERROR: >>>', error);
    }
  }

  const getAchievementsData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer?award=true&slug=${params.id}`,
        { next: { revalidate: 3600 } }
      )
      const albumsRes = await res.json();
      setAchievementsData(albumsRes.data);
    } catch (error) {
      console.log('ERROR: >>>', error);
    }
  }

  // #endregion

  // #region LIFECYCLE

  useEffect(() => {
    getArtistData();
    getAlbumsData();
    getAchievementsData();
  }, [])


  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // #endregion


  // #region FUNCTIONS

  const twitterShare = () => {
    handleTwitterShare(content_url, artistData?.name, artistData?.bio, isDesktop, artistData?.display_picture_url);
  };

  const handleAccordionToggle = (accordionNumber: any) => {
    setOpenAccordion((prev) => (prev === accordionNumber ? null : accordionNumber));
  };

  // #endregion




  return (
    <div className={classNames('bg-black', 'mt-36', 'text-white', 'font-cabin')}>
      <div className={classNames('pt-6')}>
        <div className={classNames('mx-auto', 'max-w-7xl', 'px-4', 'sm:px-6', 'lg:px-8')}>
          <div className={classNames('lg:grid', 'lg:auto-rows-min', 'lg:grid-cols-12', 'lg:gap-x-8')}>
            {/* Image gallery */}
            <div className={classNames('mt-8', 'lg:col-span-7', 'lg:col-start-1', 'lg:row-span-3', 'lg:row-start-1', 'lg:mt-0')}>
              <h2 className={classNames('sr-only')}>Images</h2>

              <div className={classNames('grid', 'grid-cols-1', 'lg:grid-cols-2', 'lg:gap-8')}>

                {artistData ? (
                  <Image
                    src={artistData.display_picture_url}
                    alt="Artist-Detail"
                    width={650}
                    height={750}
                    className={classNames('lg:col-span-2 lg:row-span-2')}
                  />
                ) :
                  <div className="h-[750px] w-[full] sm:w-[650px] mb-6 sm:mb-0  flex items-center justify-center rounded-lg bg-gray-700">
                    <svg className="w-10 h-10  text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                }
              </div>
            </div>
            <div className={classNames('lg:col-span-5', 'lg:col-start-8', 'mt-4', 'sm:mt-0')}>
              <div className={classNames('lg:col-span-5', 'lg:col-start-8')}>
                {/* <div className="flex gap-x-1 ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="skyblue" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                  </svg>

                  Verified Artist
                </div> */}
                {artistData ?
                  <div className={classNames('flex', 'justify-between', 'flex-col', 'gap-y-5')}>

                    <h1 className={classNames('text-3xl', 'font-medium')}>{artistData?.name}</h1>
                    <div className="flex gap-x-3 items-center">

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mb-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mt-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                      </svg>

                      <h1 className={classNames('text-3xl', 'font-medium')}>{NumberFormatter(artistData?.spotify_followers)}</h1>
                      <span className="text-xl text-gray-400 mt-1">followers</span>
                    </div>
                  </div> :
                  <div>
                    <div className="mt-3">
                      {renderSkeletons(1, '40')}
                    </div>
                    <div className="mt-3">
                      {renderSkeletons(1, '40')}
                    </div>
                  </div>
                }
              </div>
            </div>



            <div className={classNames('lg:col-span-5')}>
              {/* Product details */}
              {artistData ?
                <div className={classNames('mt-5')}>

                  <div
                    className={classNames('prose', 'prose-lg', 'mt-4', 'text-gray-500', 'text-xl')}
                    dangerouslySetInnerHTML={{ __html: artistData?.bio }}
                  />
                </div>
                :
                <div className="mt-5">
                  {renderSkeletons(5, '25')}
                </div>
              }



              <div className="mt-5 flex flex-row gap-x-3">
                <svg onClick={() => handleFacebookShare(content_url)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-12 g-12 cursor-pointer" viewBox="0 0 48 48">
                  <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                </svg>

                <svg onClick={() => twitterShare()} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-12 g-12 cursor-pointer" viewBox="0 0 48 48">
                  <path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
                </svg>
              </div>

              {achievementsData?.length > 0 ?
                <div className="mt-5">
                  <h2 className={classNames('text-2xl', 'font-medium')}>Awards & Achievements </h2>

                  <div className={classNames('prose', 'prose-lg', 'mt-4', 'text-gray-500', 'text-xl')} >
                    <ul>
                      {achievementsData && achievementsData?.length > 0 ? achievementsData.map((item: any, index: number) => (
                        < li key={index}> {item.description}</li>
                      )) : <div className="mt-2 text-base">
                        No Awards Found!
                      </div>
                      }
                    </ul>
                  </div>

                </div> :
                <div className="flex gap-x-4 mt-3">
                  {renderSkeletons(1, '80', 'full')}
                </div>
              }

              <div className='mt-5'>
                {artistData ?
                  <div>
                    <div className="flex gap-x-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                    </svg><h2 className={classNames('text-2xl', 'font-medium')}>Genres</h2>

                    </div>

                    <div className='flex flex-wrap items-center gap-4 mt-2'>
                      {artistData?.genres?.map((genre: any, index: number) => (
                        <a href={`/genres/${genre.slug}`} key={index} className={`text-lg rounded-full cursor-pointer hover:bg-primary-200 hover:text-white transition-colors ease-in-out duration-250 border border-primary-100 px-7 py-2 capitalize `} dangerouslySetInnerHTML={{ __html: genre.name }}></a>
                      ))}
                    </div>
                  </div> :
                  <div className="flex gap-x-4 mt-3">
                    {renderSkeletons(3, '40', 'full')}
                  </div>
                }
              </div>


              <div className="mt-5">
                {albumsData ? <div>
                  <div className="flex gap-x-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mb-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                  </svg><h2 className={classNames('text-2xl', 'font-medium', 'mb-3')}>Albums</h2>
                  </div>
                  {albumsData && albumsData?.length > 0 ?
                    albumsData?.map((item: any, index: number) => (
                      <div key={index}>
                        <div className="my-2">
                          <h2 id={`accordion-arrow-icon-heading-${index + 1}`}>
                            <button
                              type="button"
                              className={`flex cursor-pointer items-center justify-between w-full p-5 font-medium rtl:text-right  border border-b-0  ${openAccordion === index + 1 ? 'rounded-t-xl' : 'rounded-xl'} border-gray-700 text-white bg-gray-800  hover:bg-gray-800 gap-3`}
                              data-accordion-target={`#accordion-arrow-icon-body-${index + 1}`}
                              aria-expanded={openAccordion === index + 1}
                              aria-controls={`accordion-arrow-icon-body-${index + 1}`}
                              onClick={() => handleAccordionToggle(index + 1)}
                            >

                              <div className="flex flex-row gap-x-8 items-center"> <Image
                                src={item.image_url}
                                alt="Artist"
                                width={70}
                                height={70}
                                className={classNames('lg:col-span-2 lg:row-span-2', 'rounded-full')}
                              /><span className="text-lg">{item.name}</span></div>
                              <svg
                                data-accordion-icon
                                className={`w-3 h-3 rotate-${openAccordion === index + 1 ? '0' : '180'} shrink-0`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                              >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                              </svg>
                            </button>
                          </h2>
                          <div
                            id={`accordion-arrow-icon-body-${index + 1}`}
                            aria-labelledby={`accordion-arrow-icon-heading-${index + 1}`}
                            style={{ display: openAccordion === index + 1 ? 'block' : 'none' }}
                            className="border border-gray-700 rounded-b-xl p-5"
                          >
                            <div className="flex gap-x-2 items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mb-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                              </svg>
                              <h2 className={classNames('text-xl', 'font-medium', 'mb-3')}>Tracks</h2>
                            </div>

                            {item?.tracks?.length > 0 ? <span className="text-lg">{
                              item?.tracks.map((track: any, index: number) => (
                                track.name
                              ))
                            }</span> : <div className="text-lg">No tracks found!</div>}
                          </div>
                        </div>
                      </div>
                    )) :
                    <div className="mt-2 text-base text-gray-500">
                      No Albums Found!
                    </div>
                  }
                </div> : <div role="status" className="animate-pulse flex flex-col xl:flex-row items-center gap-x-4">
                  <div className="h-[200px] w-full  rounded-lg bg-gray-700"></div>
                </div>}
              </div>
            </div>

          </div>


          <MusaicsListing query={`?article=true&type=content&artist_slug=${params.id}`} ></ MusaicsListing>

          <ArtistNews query={`?article=true&type=articles&artist_slug=${params.id}`}></ArtistNews>
        </div>
      </div>
    </div >
  );
}

export default ArtistDetails;