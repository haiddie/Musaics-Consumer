'use client'

import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { EllipsisHorizontalIcon, PhotoIcon } from '@heroicons/react/20/solid'
import Albumart from "../components/AlbumArt";
import Listview from "../components/listview";
import MusicTrack from "../components/MusicTrack";
import MusicVideo from "../components/MusicVideo";
import Musicdownload from "../components/Download";
import BandsInTown from "../components/BandsInTown";
import { classNames } from "@/app/Util/styling";
import { useParams } from "next/navigation";
import Cookies from 'js-cookie';
import getSectionSVGComponent from "./getSVGComponent";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import AlbumartLarge from "./AlbumArtLarge";
import Bio from "./Bio";
import '../links.css';
import MailChimp from "./MailChimp";
import StarIcon from '@mui/icons-material/Star';
import Extras from "./Extras";
import GridOnIcon from '@mui/icons-material/GridOn';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}


const MuzicardDetails = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showGradient, setShowGradient] = useState(true);
  const [hideGradient, setHideGradient] = useState(false);
  const [grid, setGrid] = useState(false);
  const [activeStyle, setActiveStyle] = useState('large');
  const [activeTab, setActiveTab] = useState('Home');
  const [activeTabDisplayName, setActiveTabDisplayName] = useState('Home');
  const [muzicardData, setMuzicardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true)
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [sections, setSections] = useState<any>(null);
  const [sectionDisplay, setSectionsDisplay] = useState<any>(null);

  const [deviceId, setDeviceId] = useState('');
  let secret_id
  if (typeof window !== 'undefined') {
    secret_id = localStorage.getItem('secret_id')
  }
  const params = useParams();
  const [bioBlocks, setBioBlocks] = useState<any>(null)
  const [contactBlocks, setContactBlocks] = useState<any>(null)
  const [newsBlocks, setNewsBlocks] = useState<any>(null)

  // #region LIFECYCLE

  useEffect(() => {
    getMuzicardData();
    fetchDeviceId();
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
      let sectionsArr = muzicardData?.sections
      if (sectionsArr.length === 0 || sectionsArr[0].section_type !== 'home') {
        sectionsArr.unshift({
          blocks: [],
          section_display_name: "Music",
          section_display_order: 1,
          section_type: "home",
          visibility: true
        });
      }

      if (sectionsArr)
        setSections(sectionsArr);
      setSectionsDisplay(getSections(sectionsArr))
    }
  }, [muzicardData])


  const updateGridStyle = () => {

    setActiveStyle('large')
  }

  // #endregion


  // #region FUNCTIONS

  const fetchDeviceId = async () => {
    try {
      // Get the cookie string from document.cookie


      const uniqueId = Cookies.get('device_id') || generateUniqueId();
      Cookies.set('device_id', uniqueId);
      setDeviceId(uniqueId);
    } catch (error) {
      // Handle errors here
    }
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };



  const [errMsg, setErrMsg] = useState<any>('')

  const getMuzicardData = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer?muzicard_v2=true&slug=${params?.slug}`,
        { next: { revalidate: 3600 } }
      )
      const artistRes = await res.json();
      console.log('response ', artistRes.data)
      if (artistRes.data.muzicard && artistRes.data.muzicard.length != 0) {
        setMuzicardData(artistRes.data);
      }
      else {
        setErrMsg(artistRes.message)
      }

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
      if (typeof item === 'object' && item !== null && 'section_type' in item && 'blocks' in item) {
        const { section_type, blocks } = item;
        sections[section_type] = blocks;
      }
    });
    console.log('sections', sections)

    return sections;
  }


  const [playState, setPlayState] = useState(false);

  const updatePlayState = (newValue: boolean) => {

    setPlayState(newValue);
  };


  const [isDownloading, setIsDownloadLoading] = useState<boolean>(false)

  async function downloadAll() {
    const token = localStorage.getItem('token');


    sectionDisplay?.downloads.map(async (video: any) => {

      if (video.main_content && video.status === "published") {
        setIsDownloadLoading(true);

        let url = `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer?download=true&asset_id=${video.main_content.asset_id}&file_name=${video.title}&format=${video.main_content.format}`;
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to download video (status ${response.status})`);
          }

          const data = await response.json();

          await downloadFileFromDataUrl(data.data);
          setIsDownloadLoading(false);

        } catch (err) {
          console.error("Error downloading video:", err);


        }
      }

    })

  }

  async function downloadFileFromDataUrl(dataUrl: any) {
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      const a = document.createElement("a");
      const urlObject = URL.createObjectURL(blob);

      a.href = urlObject;
      a.download = extractFileNameFromUrl(dataUrl);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }

  function extractFileNameFromUrl(url: string) {
    const segments = url.split("/");
    return segments[segments.length - 1];
  }


  const transformContent = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    // Get all anchor tags
    const anchorTags = doc.querySelectorAll("a");

    // Add target="_blank" to each anchor tag and correct URLs
    anchorTags.forEach((anchor) => {
      anchor.setAttribute("target", "_blank");
      // Optionally, you can also add rel="noopener noreferrer" for security reasons
      anchor.setAttribute("rel", "noopener noreferrer");
      anchor.style.color = '#4f46e5';
      // Get the href attribute value
      let href = anchor.getAttribute("href");

      // Check if href is a valid URL and correct it if necessary
      if (href && !href.match(/^(?:f|ht)tps?:\/\//i)) {
        href = `http://${href}`;
        anchor.setAttribute("href", href);
      }
    });

    // Serialize the modified document back to HTML
    return doc.documentElement.outerHTML;
  }
  // #endregion
  const convertToMmSs = (seconds: number) => {
    const totalSeconds = Math.floor(seconds);
    const mm = Math.floor(totalSeconds / 60);
    const ss = totalSeconds % 60;
    return `${padNumber(mm)}:${padNumber(ss)}`;
  }

  const padNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  }


  const sumUpTracks = () => {
    let No_of_tracks: any = 0;
    if (sectionDisplay?.music && sectionDisplay?.music.length > 0) {
      sectionDisplay?.music.map((obj: any) => {
        if (
          obj.main_content &&
          obj.main_content.duration &&
          obj.status === "published"
        ) {
          No_of_tracks = No_of_tracks + 1;
        }
      });
    }

    return No_of_tracks;
  }

  const sumUpDownloads = () => {
    let No_of_downloads: any = 0;
    if (sectionDisplay?.downloads && sectionDisplay?.downloads.length > 0) {
      sectionDisplay?.downloads.map((obj: any) => {
        if (
          obj.main_content &&
          obj.main_content.duration &&
          obj.status === "published"
        ) {
          No_of_downloads = No_of_downloads + 1;
        }
      });
    }


    return No_of_downloads;
  }







  return (
    <div className="relative font-cabin h-[100svh] w-screen">

      {/* <Image
              style={{ transition: 'ease-in-out all 500ms' }}
              src={muzicardData?.muzicard?.image_url}
              height={430}
              width={430}
              alt="artist"
              className={`mx-auto rounded-md object-cover ${showGradient ? 'h-[100svh] w-screen' : 'h-[350px] w-[350px] relative'} `} />
            {hideGradient && (
              <>
                <div className={` transition-transform duration-1000 bg-black bg-opacity-50 p-2 left-[10%] sm:left-[43%] bottom-40 ${muzicardData?.muzicard?.show_artist === false ? 'hidden' : 'absolute'}  ${showAnimation ? '-translate-y-[500px]' : '-translate-y-[300px]'}  !font-barrow text-[14px] z-20`}>{muzicardData?.muzicard?.name}</div>
                <div className={` transition-transform duration-1000 bg-black bg-opacity-50 p-2 left-[10%] sm:left-[43%] bottom-20 ${muzicardData?.muzicard?.show_title === false ? 'hidden' : 'absolute'} ${showAnimation ? '-translate-y-[500px]' : '-translate-y-[300px]'}  !font-barrow text-[32px] z-20`}>{muzicardData?.muzicard?.title}</div>
              </>
            )

            }
          </div> */}
      {!isLoading ? <div>
        {muzicardData !== null ? <>
          {activeTab === 'Home' && (


            <>
              {
                showGradient && <div className="relative ">
                  <Image
                    src={muzicardData?.muzicard?.image_url}
                    height={430}
                    width={430}
                    alt="artist"
                    className={`mx-auto rounded-md object-cover ${showGradient ? 'h-[100svh] w-screen' : 'h-[300px] w-[300px]'} `}
                  />


                </div>
              }

            </>
          )}



          {!hideGradient && muzicardData?.muzicard?.show_title && <div className={`absolute text-center z-10 transition-transform duration-1000 ${showGradient ? 'transform-none' : 'translate-y-[100%]'} top-0 rounded-lg h-[100svh] w-screen bg-gradient-to-b from-transparent to-black`}>
            <div className={`absolute transition-transform duration-1000 left-1/2 -bottom-20 -translate-x-1/2 ${showAnimation ? '-translate-y-[500px]' : '-translate-y-[300px]'}  !font-abril text-7xl z-20`} dangerouslySetInnerHTML={{ __html: muzicardData?.muzicard?.title }} />
          </div>}


          <div className="relative">
            {hideGradient &&
              <>
                <div className={`h-[90svh] py-2 overflow-hidden`}>
                  <div className={`${activeTab !== 'Home' ? 'h-[5svh]' : ''} flex items-center px-2 justify-between bg-black`}>
                    {
                      activeTab !== 'Home' ? <h2 className="text-2xl mb-2 px-2">{activeTabDisplayName}</h2> : <></>
                    }

                    {activeTab === 'Album Art' &&
                      <div className="flex items-center gap-x-2 px-2">
                        <GridOnIcon height={30} onClick={() => setActiveStyle('grid')} className={` ${activeStyle !== 'large' ? 'text-primary-500' : 'text-white'}`} />
                        <PhotoSizeSelectActualIcon height={30} onClick={() => setActiveStyle('large')} className={` ${activeStyle === 'large' ? 'text-primary-500' : 'text-white'}`} />
                      </div>
                    }


                    {activeTab === 'Downloads' &&
                      <div className="flex items-center gap-x-4 px-2">
                        {
                          isDownloading ? (<div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent  rounded-full text-blue-500" role="status" aria-label="loading">
                          </div>) : (
                            <button type="button" onClick={() => { downloadAll() }}
                              className="border-violet-500 cursor-pointer border-[0.3px] rounded-md text-violet-500 p-2 flex gap-x-2 items-center justify-center">

                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                            </button>
                          )}

                      </div>
                    }
                  </div>
                  {
                    activeTab === 'Home' &&

                    <div className={`${playState === false ? 'h-[90svh] overflow-y-hidden overflow-x-hidden' : 'h-[79svh] overflow-y-hidden overflow-x-hidden'} `}>
                      <div className={`h-[34svh]`}>
                        <div className="relative max-w-[250px] h-auto max-h-[32svh] w-full mx-auto">
                          <Image
                            src={muzicardData?.muzicard?.image_url}
                            height={430}
                            width={430}
                            alt="artist"
                            className={`mx-auto rounded-md object-cover h-auto max-h-[250px] w-full `}
                          />

                          {
                            (muzicardData?.muzicard?.show_artist || muzicardData?.muzicard?.show_title) && (

                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-2 py-2">
                                <div className="flex flex-col justify-start items-center px-2">
                                  {
                                    muzicardData?.muzicard?.show_artist && (
                                      <span className="!leading-[1.75rem] !text-[14px]" dangerouslySetInnerHTML={{ __html: muzicardData?.muzicard?.artist_display_name }} />
                                    )
                                  }

                                  {
                                    muzicardData?.muzicard?.show_title && (
                                      <span className="!leading-[2.75rem] !text-[32px]" dangerouslySetInnerHTML={{ __html: muzicardData?.muzicard?.title }} />
                                    )}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>

                      <div className={`${playState === false ? 'h-[56svh]' : 'h-[47svh]'} mt-[20px] p-4  overflow-y-auto overflow-x-hidden`}>
                        {muzicardData?.muzicard?.generic_details?.year_of_release && muzicardData?.muzicard?.generic_details?.show_year_of_release ? (
                          <div className="text-white text-[14px] mb-1 !font-[400]">
                            Year of Release: {muzicardData?.muzicard?.generic_details?.year_of_release}
                          </div>) : (<></>)}

                        {muzicardData?.muzicard?.generic_details?.release_length && muzicardData?.muzicard?.generic_details?.show_release_length ? (
                          <div className="text-white text-[14px] mb-1 !font-[400]">
                            Length of Release: {muzicardData?.muzicard?.generic_details?.release_length ? convertToMmSs(muzicardData?.muzicard?.generic_details?.release_length) : 0}
                          </div>) : (<></>)
                        }


                        {muzicardData?.muzicard?.generic_details?.no_track && muzicardData?.muzicard?.generic_details?.show_no_track ? (
                          <div className="text-white text-[14px] mb-1 !font-[400]">
                            Tracks: {sumUpTracks()}
                          </div>) : (<></>)
                        }

                        {muzicardData?.muzicard?.generic_details?.no_downloads && muzicardData?.muzicard?.generic_details?.show_no_downloads ? (
                          <div className="text-white text-[14px] mb-1 !font-[400]">
                            Downloads: {sumUpDownloads()}
                          </div>) : (<></>)
                        }
                        {muzicardData?.muzicard?.description ?
                          (
                            <>
                              <div
                                className='text-white text-xl muzicard-bio'
                                dangerouslySetInnerHTML={{ __html: transformContent(muzicardData?.muzicard?.description) }}
                              />
                            </>
                          )
                          : (<></>)
                        }

                        {(sectionDisplay?.home) ? <Bio data={sectionDisplay[activeTab.toLowerCase()]} /> : <div className='text-2xl'>
                          No Blocks found!
                        </div>}
                      </div>

                    </div>
                  }

                  {
                    activeTab === 'Videos' &&
                    <div className={`${playState === false ? 'h-[85svh] overflow-y-hidden overflow-x-hidden' : 'h-[74svh] overflow-y-hidden overflow-x-hidden'} `}>
                      {sectionDisplay?.videos ? <MusicVideo data={sectionDisplay?.videos} playState={playState} /> : <div className='text-2xl'>
                        No Videos found!
                      </div>}
                    </div>
                  }
                  {
                    (activeTab === 'Bio' || activeTab === 'Contact' || activeTab === 'News' || activeTab === "Custom") &&
                    <div className={`px-2 ${playState === false ? 'h-[85svh] overflow-y-auto overflow-x-hidden' : 'h-[74svh] overflow-y-auto overflow-x-hidden'} `}>
                      {(sectionDisplay?.bio || sectionDisplay?.contact || sectionDisplay?.news || sectionDisplay?.custom) ? <Bio data={sectionDisplay[activeTab.toLowerCase()]} /> : <div className='text-2xl'>
                        No Blocks found!
                      </div>}
                    </div>
                  }
                  {
                    activeTab === 'Album Art' &&
                    <div className={`${playState === false ? 'h-[85svh] overflow-y-auto overflow-x-hidden' : 'h-[74svh] overflow-y-auto overflow-x-hidden'} `}>
                      {sectionDisplay["album-art"] ? activeStyle === 'grid' ? <Albumart data={sectionDisplay["album-art"][0]} updateGridStyle={updateGridStyle} /> : <AlbumartLarge data={sectionDisplay["album-art"][0]} activeTab={activeTab} /> : <div className='text-2xl'>
                        No Album Arts found!
                      </div>}
                    </div>
                  }

                  {
                    activeTab === 'Sponsors' &&
                    <div className={`${playState === false ? 'h-[85svh] overflow-y-auto overflow-x-hidden' : 'h-[74svh] overflow-y-auto overflow-x-hidden'} `}>
                      {sectionDisplay["sponsors"] ? <AlbumartLarge data={sectionDisplay["sponsors"][0]} activeTab={activeTab} /> : <div className='text-2xl'>
                        No Sponsors found!
                      </div>}
                    </div>
                  }
                  {
                    activeTab === 'Streaming' &&
                    <div className={`px-4 ${playState === false ? 'h-[85svh] overflow-y-auto overflow-x-hidden' : 'h-[74svh] overflow-y-auto overflow-x-hidden'} `}>
                      {sectionDisplay?.streaming ? <Listview data={sectionDisplay?.streaming?.[0]} /> : <div className='text-2xl'>
                        No Streamings found!
                      </div>}
                    </div>
                  }
                  {
                    activeTab === 'Socials' &&
                    <div className={`px-4 ${playState === false ? 'h-[85svh] overflow-y-auto overflow-x-hidden' : 'h-[74svh] overflow-y-auto overflow-x-hidden'} `}>
                      {sectionDisplay?.socials ? <Listview data={sectionDisplay?.socials[0]} /> : <div className='text-2xl'>
                        No Socials found!
                      </div>}
                    </div>
                  }
                  {
                    activeTab === 'Downloads' &&
                    <div className={`px-4 ${playState === false ? 'h-[85svh] overflow-y-auto overflow-x-hidden' : 'h-[74svh] overflow-y-auto overflow-x-hidden'} `}>
                      {sectionDisplay?.downloads ? <Musicdownload data={sectionDisplay?.downloads} /> : <div className='text-2xl'>
                        No Downloads found!
                      </div>}
                    </div>
                  }
                  {
                    activeTab === 'Shows' &&
                    <div className={`px-2 ${playState === false ? 'h-[85svh] overflow-y-auto overflow-x-hidden' : 'h-[74svh] overflow-y-auto overflow-x-hidden'} `}>
                      {sectionDisplay?.shows ? <BandsInTown data={sectionDisplay?.shows} /> : <div className='text-2xl'>
                        No Shows found!
                      </div>}
                    </div>
                  }



                  {
                    (activeTab === 'Extras') &&
                    <div className={`${playState === false ? 'h-[85svh] overflow-y-auto overflow-x-hidden' : 'h-[74svh] overflow-y-auto overflow-x-hidden'} `} >
                      {<Extras activeTab={activeTab} data={muzicardData.muzicard} true_card={false} />}
                    </div>
                  }

                  {
                    (activeTab === 'Newsletter Sign Up') &&
                    <div className={`${playState === false ? 'h-[85svh] overflow-y-auto overflow-x-hidden' : 'h-[74svh] overflow-y-auto overflow-x-hidden'} `} >

                      {sectionDisplay?.mailchimp ? <MailChimp activeTab={activeTab} data={sectionDisplay?.mailchimp} default_image={muzicardData?.muzicard?.image_url} /> : <div className='text-2xl'>
                        No MailChimp api connected!
                      </div>}
                    </div>
                  }

                  {
                    (activeTab === 'Music' || playState === true) &&
                    <div className={`${activeTab === 'Music' ? 'h-[85svh] overflow-hidden' : 'h-[16svh] overflow-hidden'} `} >
                      {sectionDisplay?.music ? <MusicTrack activeTab={activeTab} downloads={sectionDisplay?.downloads} data={sectionDisplay?.music} updatePlayState={updatePlayState} default_image={muzicardData?.muzicard?.image_url} /> : <div className='text-2xl'>
                        No Musics found!
                      </div>}
                    </div>
                  }
                </div>


              </>
            }

            {hideGradient && <div className={`text-sm z-50 font-bold w-screen h-[10svh] flex flex-nowrap items-center justify-around overflow-hidden bottom-0 py-2`}>
              <div onClick={() => { setActiveTab('Home'); setActiveTabDisplayName('Home') }} className={`flex flex-col  text-[10px] items-center gap-1 ${activeTab === 'Home' ? 'text-primary-100' : 'text-white'}`}
                style={{ fill: activeTab === 'Home' ? '#b247f5' : 'white' }}>

                <svg version="1.1" className="-mt-1 h-5 w-5" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                  <path transform="translate(1022,538)" d="m0 0 4 1 14 11 13 11 22 18 13 11 14 11 14 12 10 8 17 14 13 11 14 11 14 12 16 13 13 11 10 8 17 14 13 11 10 8 11 9 17 14 13 11 14 11 14 12 11 9 16 13 13 11 11 9 16 13 13 11 10 8 13 11 14 11 14 12 14 11 9 8 14 11 14 12 11 9 34 28 13 11 14 11 14 12 14 11 14 12 22 18 17 14 13 11 14 11 14 12 11 9 17 14 11 9 8 7 1 2v622l-2 13-5 14-8 14-12 13-10 8-16 8-15 4-8 1h-494l-1-17v-367l1-104h-324v486l-1 2h-495l-16-3-12-5-12-7-13-12-10-13-7-15-3-11-1-7-1-31v-587l1-7 8-8 9-7 13-11 22-18 17-14 11-9 17-14 13-11 10-8 17-14 13-11 14-11 14-12 33-27 13-11 10-8 13-11 10-8 13-11 9-7 13-11 10-8 13-11 10-8 13-11 10-8 17-14 13-11 14-11 14-12 10-8 17-14 13-11 14-11 14-12 33-27 13-11 10-8 13-11 10-8 13-11 9-7 13-11 10-8 13-11 10-8 13-11 10-8 17-14 13-11 14-11 14-12 11-9 16-13z" />
                  <path transform="translate(1021,208)" d="m0 0 21 1 14 2 19 5 13 5 15 8 16 11 16 13 13 11 11 9 14 12 11 9 13 11 11 9 14 12 11 9 13 11 11 9 13 11 11 9 14 12 11 9 26 22 11 9 13 11 11 9 13 11 11 9 13 11 22 18 3 2v-134l1-115 3-12 7-12 9-7 9-4 13-2h237l15 1 10 3 9 6 8 9 4 8 2 9 1 523 5 5 17 14 13 11 11 9 13 11 11 9 13 11 10 8 13 11 11 9 13 11 14 11 15 13 11 9 13 11 11 9 13 11 11 9 13 11 22 18 13 11 11 9 10 12 2 7 2 1v26l-3 3-6 10-8 10-11 13-9 11-22 26-9 11-12 14-7 8-8 7-10 5-7 2h-12l-11-2-14-9-14-12-11-9-14-12-11-9-13-11-11-9-13-11-11-9-13-11-11-9-13-11-11-9-13-11-11-9-13-11-17-14-14-12-10-8-14-12-10-8-14-12-14-11-10-9-14-11-10-9-14-11-10-9-11-9-13-11-11-9-13-11-11-9-13-11-11-9-13-11-11-9-13-11-11-9-14-12-10-8-14-12-10-8-14-12-10-8-14-12-10-8-14-12-10-8-14-12-10-8-14-12-10-8-14-12-10-8-14-12-10-8-14-12-10-8-14-12-10-8-14-12-10-8-14-12-10-8-14-12-10-8-14-12-10-8-14-12-10-8-14-12-10-8-5 1-13 11-11 9-13 11-11 9-13 11-11 9-13 11-11 9-26 22-10 8-14 12-10 8-14 12-10 8-14 12-10 8-14 12-10 8-14 12-10 8-14 12-10 8-14 12-10 8-14 12-10 8-14 12-11 9-13 11-11 9-14 12-10 8-14 12-10 8-14 12-10 8-14 12-10 8-14 12-10 8-14 12-11 9-13 11-11 9-13 11-11 9-13 11-11 9-13 11-11 9-13 11-11 9-13 11-11 9-13 11-11 9-13 11-11 9-13 11-11 9-13 11-11 9-13 11-11 9-13 11-11 9-13 11-11 9-13 11-11 9-13 11-11 8-13 6-6 1h-14l-12-5-9-7-7-7-11-14-10-11-11-14-9-10-9-11-11-13-13-16-8-14v-23l6-12 12-13 11-9 13-11 11-9 13-11 11-9 13-11 11-9 13-11 11-9 13-11 11-9 13-11 11-9 13-11 11-9 13-11 11-9 13-11 11-9 13-11 11-9 17-14 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 13-11 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 10-8 14-12 17-12 14-8 16-7 13-4 15-3z" />
                </svg>
                Home
              </div>




              {sections && sections.length > 0 && sections.slice(1, 4).map((section: any, index: number) => {
                return (
                  <div key={index}>

                    <div onClick={() => { setActiveTab(section.name); setActiveTabDisplayName(section.section_display_name ? section.section_display_name : section.name) }} className={`flex flex-col text-[10px] items-center cursor-pointer gap-1 ${activeTab == `${section.name}` ? 'text-primary-100' : 'text-white'}`}>
                      <div className="-mt-1 h-5 w-5 ">
                        {getSectionSVGComponent(section.section_type, activeTab, 'white')}
                      </div>

                      {section.section_display_name ? section.section_display_name : section.name}

                    </div>
                  </div>
                )

              })}

              {
                sections && sections.length < 4 && (

                  <div
                    onClick={() => { setActiveTab('Extras'); setActiveTabDisplayName('Extras') }} className={`flex flex-col text-[10px] items-center cursor-pointer gap-1 ${activeTab == `Extras` ? 'text-primary-100' : 'text-white'}`}>
                    <StarIcon className="-mt-1 h-5 w-5 " />
                    Extras
                  </div>

                )
              }
              {sections && sections.length >= 4 &&
                < Menu as="div" className="z-60 inline-block text-left">
                  <div>
                    <Menu.Button className="flex flex-col gap-1 text-[10px] items-center rounded-full text-white focus:outline-none">
                      <span className="sr-only">Open options</span>
                      <EllipsisHorizontalIcon className="-mt-1 h-5 w-5 " aria-hidden="true" />
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
                    <Menu.Items className="absolute bottom-16 right-4 z-50 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1 z-50">
                        {

                          <Menu.Item >
                            <div className={classNames(
                              activeTab === 'Extras' ? 'bg-gray-100 text-primary-200' : 'text-gray-700',
                              'px-2 py-2 text-[12px] flex items-center gap-1 cursor-pointer'
                            )} onClick={() => { setActiveTab('Extras'); setActiveTabDisplayName('Extras') }} >
                              <StarIcon className=" h-5 w-5" />
                              <p className="text-[10px]" >
                                Extras
                              </p>

                            </div>
                          </Menu.Item>

                        }
                        {sections && sections.slice(4).reverse().map((section: any, index: number) => (
                          section.name !== "Home" && (
                            <Menu.Item key={index}>
                              {({ active }) => (
                                <div onClick={() => { setActiveTab(section.name); setActiveTabDisplayName(section.section_display_name ? section.section_display_name : section.name) }}
                                  className={classNames(
                                    activeTab === section.name ? 'bg-gray-100 text-primary-200' : 'text-gray-700',
                                    'px-2 py-2 text-[14px] flex items-center gap-1 cursor-pointer'
                                  )}>
                                  <div className=" h-5 w-5">
                                    {getSectionSVGComponent(section.section_type, activeTab, '#64648B')}
                                  </div>
                                  <div className="w-[100px] ">
                                    <span className="text-[10px]">{section.section_display_name ? section.section_display_name : section.name}</span>
                                  </div>

                                </div>
                              )}
                            </Menu.Item>
                          )
                        ))}


                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              }
            </div>}
          </div>
        </> : <>
          {errMsg ? (
            <div className="flex flex-col h-full min-h-screen px-4 gap-6">
              <div className="flex justify-center">
                <img src="/icons/tappi.png" className="h-[50px] object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-y-2 justify-center items-center">
                <div className="text-center" dangerouslySetInnerHTML={{ __html: errMsg }} />

                <img src="/icons/favicon.svg" className="h-[50px] w-[50px]" />

              </div>
            </div>
          ) : (
            <div className="flex min-h-[550px] justify-center items-center">
              {'Your Token Expired!'}
            </div>
          )}

        </>}
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

export default MuzicardDetails;