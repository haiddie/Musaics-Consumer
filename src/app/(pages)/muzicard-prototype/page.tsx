'use client'

import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import Albumart from "./components/AlbumArt";
import Listview from "./components/listview";
import MusicTrack from "./components/MusicTrack";
import MusicVideo from "./components/MusicVideo";
import Musicdownload from "./components/Download";
import BandsInTown from "./components/BandsInTown";
import { classNames } from "@/app/Util/styling";

type Props = {
  params: { slug: string, timestamp: string }
  searchParams: { [key: string]: string | string[] | undefined }
}


const Page = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showGradient, setShowGradient] = useState(true);
  const [hideGradient, setHideGradient] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [muzicardData, setMuzicardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false)
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [sections, setSections] = useState<any>(null);


  // #region LIFECYCLE

  useEffect(() => {
    getMuzicardData();

  }, [])

  useEffect(() => {
    if (isDataFetched) {
      if (!showAnimation) setTimeout(() => {
        setShowAnimation(true);
      }, 300);
      if (showAnimation && showAnimation) setTimeout(() => {
        setShowGradient(false);
      }, 2500);
      if (showAnimation && showAnimation) setTimeout(() => {
        setHideGradient(true);
      }, 3000);
    }
  }, [isDataFetched, showAnimation])

  useEffect(() => {
    if (muzicardData) {
      setSections(getSections(muzicardData?.sections));
    }
  }, [muzicardData])

  // #endregion


  // #region FUNCTIONS



  const getMuzicardData = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer?muzicard=true&slug=eminem-muzicard-test-6729`,
        { next: { revalidate: 3600 } }
      )
      const artistRes = await res.json();
      setMuzicardData(artistRes.data);
      setIsLoading(false)
      setIsDataFetched(true)
    } catch (error) {
      console.log('ERROR: >>>', error);
      setIsLoading(false)
      setIsDataFetched(true)

    }
  }


  function getSections(jsonData: any) {
    const sections: any = {};
    jsonData.forEach((item: any) => {
      if (typeof item === 'object' && item !== null && 'type' in item && 'blocks' in item) {
        const { type, blocks } = item;
        sections[type] = blocks;
      }
    });
    return sections;
  }

  // #endregion

  return (
    <div className="relative font-cabin h-[100dvh] w-screen pt-7">

      {!isLoading ? <div>
        {activeTab === 'Home' && <Image
          style={{ transition: 'ease-in-out all 500ms' }}
          src={muzicardData?.muzicard[0]?.image_url}
          height={430}
          width={430}
          alt="artist"
          className={`mx-auto rounded-md object-cover ${showGradient ? 'h-screen w-screen' : 'h-[350px] w-[350px]'} `} />}

        {!hideGradient && <div className={`absolute text-center z-10 transition-transform duration-1000 ${showGradient ? 'transform-none' : 'translate-y-[100%]'} top-0 rounded-lg h-screen w-screen bg-gradient-to-b from-transparent to-black`}>
          <div className={`absolute transition-transform duration-1000 left-1/2 -bottom-20 -translate-x-1/2 ${showAnimation ? '-translate-y-[500px]' : 'translate-y-[300px]'}  !font-abril text-7xl z-20`}>{muzicardData?.muzicard[0]?.title}</div>
        </div>}

        <div className="relative">
          {hideGradient &&
            <div className={`mt-4 px-4 overflow-auto ${activeTab === 'Home' ? 'max-h-[calc(100vh-460px)] min-h-[calc(100vh-460px)]' : 'max-h-[calc(100vh-100px)] min-h-[calc(100vh-110px)]'}`}>
              <h2 className="text-4xl mb-2">{activeTab}</h2>
              {
                activeTab === 'Home' &&
                <div
                  className='mt-4 text-gray-400 text-xl muzicard-bio'
                  dangerouslySetInnerHTML={{ __html: muzicardData?.muzicard[0]?.description }}
                />
              }
              {
                activeTab === 'Music' &&
                <div>
                  {sections?.music_track ? <MusicTrack data={sections?.music_track} /> : <div className='text-2xl'>
                    No Musics found!
                  </div>}
                </div>
              }
              {
                activeTab === 'Videos' &&
                <div>
                  {sections?.music_video ? <MusicVideo data={sections?.music_video} /> : <div className='text-2xl'>
                    No Videos found!
                  </div>}
                </div>
              }
              {
                activeTab === 'Album Art' &&
                <div>
                  {sections?.album_art ? <Albumart data={sections?.album_art[0]} /> : <div className='text-2xl'>
                    No Album Arts found!
                  </div>}
                </div>
              }
              {
                activeTab === 'Streaming' &&
                <div>
                  {sections?.streaming_list ? <Listview data={sections?.streaming_list[0]} /> : <div className='text-2xl'>
                    No Streamings found!
                  </div>}
                </div>
              }
              {
                activeTab === 'Socials' &&
                <div>
                  {sections?.social_list ? <Listview data={sections?.social_list[0]} /> : <div className='text-2xl'>
                    No Socials found!
                  </div>}
                </div>
              }
              {
                activeTab === 'Downloads' &&
                <div>
                  {sections?.music_download ? <Musicdownload data={sections?.music_download} /> : <div className='text-2xl'>
                    No Downloads found!
                  </div>}
                </div>
              }
              {
                activeTab === 'Shows' &&
                <div>
                  {sections?.shows ? <BandsInTown data={sections?.shows} /> : <div className='text-2xl'>
                    No Downloads found!
                  </div>}
                </div>
              }
            </div>

          }

          {hideGradient && <div className={`text-sm z-50 font-bold w-screen flex flex-nowrap items-end justify-around overflow-hidden bottom-0 py-2`}>
            <div onClick={() => setActiveTab('Home')} className={`flex flex-col items-center gap-1 ${activeTab === 'Home' ? 'text-primary-100' : 'text-white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Home
            </div>
            <div onClick={() => setActiveTab('Music')} className={`flex flex-col items-center gap-1 ${activeTab === 'Music' ? 'text-primary-100' : 'text-white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
              </svg>
              Music
            </div>
            <div onClick={() => setActiveTab('Videos')} className={`flex flex-col items-center gap-1 ${activeTab === 'Videos' ? 'text-primary-100' : 'text-white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              Videos
            </div>
            <div onClick={() => setActiveTab('Album Art')} className={`flex flex-col items-center gap-1 whitespace-nowrap ${activeTab === 'Album Art' ? 'text-primary-100' : 'text-white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              Album Art
            </div>
            <Menu as="div" className="z-50 inline-block text-left">
              <div>
                <Menu.Button className="flex flex-col gap-1 items-center rounded-full text-white focus:outline-none">
                  <span className="sr-only">Open options</span>
                  <EllipsisHorizontalIcon className="h-6 w-6" aria-hidden="true" />
                  More
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute bottom-16 right-4 z-50 mt-2 w-32 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1 z-50">
                    <Menu.Item>
                      {({ active }) => (
                        <div onClick={() => setActiveTab('Streaming')} className={classNames(
                          activeTab === 'Streaming' ? 'bg-gray-100 text-primary-100' : 'text-gray-700',
                          'px-4 py-2 text-sm flex items-center gap-1'
                        )}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                          </svg>
                          Streaming
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div onClick={() => setActiveTab('Socials')} className={classNames(
                          activeTab === 'Socials' ? 'bg-gray-100 text-primary-200' : 'text-gray-700',
                          'px-4 py-2 text-sm flex items-center gap-1'
                        )}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                          </svg>
                          Socials
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div onClick={() => setActiveTab('Shows')} className={classNames(
                          activeTab === 'Shows' ? 'bg-gray-100 text-primary-100' : 'text-gray-700',
                          'px-4 py-2 text-sm flex items-center gap-1'
                        )}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
                          </svg>

                          Shows
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div onClick={() => setActiveTab('Downloads')} className={classNames(
                          activeTab === 'Downloads' ? 'bg-gray-100 text-primary-100' : 'text-gray-700',
                          'px-4 py-2 text-sm flex items-center gap-1'
                        )}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                          Downloads
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>}
        </div>
      </div> :
        <div className="flex flex-col min-h-[550px] justify-center items-center p-4">
          <div className="flex justify-center">
            <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent  rounded-full text-blue-500" role="status" aria-label="loading">
            </div>
          </div>
        </div>}
    </div>
  )
}

export default Page;