import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Tweet } from 'react-tweet';
import YouTube from 'react-youtube';
import Quote from '../../stories/components/quote/quote';
import Wikipedia from '../../stories/components/wikipedia/wikipedia';
import GoogleMap from '../../stories/components/google-map/google-map';
import Number from "../../stories/components/number/number";
import Text from "../../stories/components/text/text";
import Polls from '../../stories/components/polls/polls';
const Bio = ({ data }: any) => {
    const [playerSize, setPlayerSize] = useState({ width: '100%', height: '320' });
    const opts = {
        height: window.innerWidth >= 600 ? playerSize.height : '200',
        width: window.innerWidth >= 600 ? playerSize.width : window.innerWidth - 50,
        playerVars: {
            autoplay: 0,
        },
    };

    const [imageContainerHeight, setimageContainerHeight] = useState<any>(750)
    useEffect(() => {
        const updatePlayerSize = () => {
            const screenWidth = window.innerWidth;
            let newWidth = '550';
            let newHeight = '390';
            if (screenWidth < 550 && screenWidth > 270) {
                setimageContainerHeight(700)
                newWidth = `${screenWidth - 100}`;
                newHeight = `${(screenWidth - 100) * (390 / 550)}`;
            }
            if (screenWidth < 550 && screenWidth > 350) {
                setimageContainerHeight(570)
                newWidth = `${screenWidth - 100}`;
                newHeight = `${(screenWidth - 100) * (390 / 550)}`;
            }
            if (screenWidth < 550 && screenWidth > 400) {
                setimageContainerHeight(750)
                newWidth = `${screenWidth - 100}`;
                newHeight = `${(screenWidth - 100) * (390 / 550)}`;

            }

            if (screenWidth > 550) {
                setimageContainerHeight(750)
            }
            setPlayerSize({ width: newWidth, height: newHeight });
        };
        updatePlayerSize();
        window.addEventListener('resize', updatePlayerSize);
        return () => {
            window.removeEventListener('resize', updatePlayerSize);
        };
    }, [imageContainerHeight]);





    const embed_youtube_link = (url: string) => {
        let videoID;
        if (url.includes('/watch?v=')) {
            videoID = url?.split('/watch?v=').pop();
        } else {
            videoID = url?.split('/').pop();
        }

        // this.safeSrc= this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + videoID+'?feature=oembed')
        // let safeSrc =
        //   'https://www.youtube.com/embed/' + videoID + '?feature=oembed';
        // // return this.safeSrc;

        return videoID;
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


    // Separate main_text from the rest of the elements
    const mainTextElement = data.find((element: any) => element.type === 'main_text');

    // Filter out main_text element from data
    const otherElements = data.filter((element: any) => element.type !== 'main_text' && element.status === 'published');
    return (
        <div className="flex w-full justify-center pt-2 mb-8">
            <div className="flex flex-col  justify-center sm:w-[99%] w-full">
                {/* Render main_text element separately */}
                {mainTextElement && (
                    <div className="flex justify-start ">
                        <div
                            className='text-white text-md muzicard-bio px-2 py-2'
                            dangerouslySetInnerHTML={{ __html: transformContent(mainTextElement?.main_content?.text) }}
                        />
                    </div>
                )}
                {otherElements.map((element: any, index: number) => (
                    <div key={index} id={`${index}`}>
                        {element.status === 'published' && (
                            <div className="flex flex-col justify-center mx-auto sm:w-[99%] w-full xs:max-w-[550px] md:max-w-[600px]  rounded-2xl px-2  sm:px-2">
                                {element.type === 'twitter' && <>
                                    <div className="flex flex-col items-center justify-center w-full border-dashed gap-y-2 border-2 bg-[#0F172A] border-violet-500 rounded-2xl  px-2 sm:px-5 py-5">
                                        {element?.is_title && element.title && element.title !== "null" && (<span className='text-white text-center capitalize text-[20px]  px-[10px] py-[10px]' style={{ overflowWrap: 'anywhere' }} dangerouslySetInnerHTML={{ __html: element.title }} />)}

                                        <Tweet id={`${element?.main_content?.id}`} />

                                        {
                                            element.is_text &&
                                            <div
                                                className={`text-md text-base`}
                                                dangerouslySetInnerHTML={{ __html: element?.display_text }}
                                            />
                                        }
                                    </div>
                                    {
                                        index !== otherElements?.length - 1 &&
                                        <div className="h-8 w-[1px] mx-auto border-l-2 border-dashed border-violet-500"></div>
                                    }</>}
                                {element?.type === 'video' && (
                                    <>
                                        <div className="flex flex-col items-center justify-center w-full border-dashed gap-y-2 border-2 bg-[#0F172A] border-violet-500 rounded-2xl  px-2 sm:px-5 py-5">
                                            {element?.is_title && element.title && element.title !== "null" && (<span className='text-white text-center capitalize text-[20px]  px-[10px] py-[10px]' style={{ overflowWrap: 'anywhere' }} dangerouslySetInnerHTML={{ __html: element.title }} />)}
                                            <YouTube videoId={`${embed_youtube_link(element?.url)}`} opts={opts} />
                                            {
                                                element.is_text &&
                                                <div
                                                    className={`text-md text-base`}
                                                    dangerouslySetInnerHTML={{ __html: element?.display_text }}
                                                />
                                            }
                                        </div>
                                        {
                                            index !== otherElements?.length - 1 &&
                                            <div className="h-8 w-[1px] mx-auto border-l-2 border-dashed border-violet-500"></div>
                                        }
                                    </>
                                )}

                                {element.type === 'quote' &&
                                    <>
                                        <div className="flex flex-col items-center justify-center w-full border-dashed gap-y-2 border-2 bg-[#0F172A] border-violet-500 rounded-2xl  px-2 sm:px-5 py-5">
                                            <Quote data={element} />
                                        </div>
                                        {
                                            index !== otherElements?.length - 1 &&
                                            <div className="h-8 w-[1px] mx-auto border-l-2 border-dashed border-violet-500"></div>
                                        }
                                    </>
                                }
                                {
                                    element?.type === 'number' &&
                                    <>
                                        <div className="flex flex-col items-center justify-center w-full border-dashed gap-y-2 border-2 bg-[#0F172A] border-violet-500 rounded-2xl  px-2 sm:px-5 py-5">
                                            {element?.is_title && element.title && element.title !== "null" && (<span className='text-white text-center capitalize text-[20px]  px-[10px] py-[10px]' style={{ overflowWrap: 'anywhere' }} dangerouslySetInnerHTML={{ __html: element.title }} />)}
                                            <Number data={element} />
                                        </div>
                                        {
                                            index !== otherElements?.length - 1 &&
                                            <div className="h-8 w-[1px] mx-auto border-l-2 border-dashed border-violet-500"></div>
                                        }
                                    </>
                                }
                                {element.source === 'wikipedia' &&
                                    <>
                                        <div className="flex flex-col items-center justify-center w-full border-dashed gap-y-2 border-2 bg-[#0F172A] border-violet-500 rounded-2xl  px-2 sm:px-5 py-5">
                                            {element?.is_title && element.title && element.title !== "null" && (<span className='text-white text-center capitalize text-[20px]  px-[10px] py-[10px]' style={{ overflowWrap: 'anywhere' }} dangerouslySetInnerHTML={{ __html: element.title }} />)}
                                            <Wikipedia data={element} />
                                        </div>
                                        {
                                            index !== otherElements?.length - 1 &&
                                            <div className="h-8 w-[1px] mx-auto border-l-2 border-dashed border-violet-500"></div>
                                        }
                                    </>
                                }
                                {
                                    element?.type === 'text' &&
                                    <>
                                        <div className="flex flex-col items-center justify-center w-full border-dashed gap-y-2 border-2 bg-[#0F172A] border-violet-500 rounded-2xl  px-2 sm:px-5 py-5">
                                            {element?.is_title && element.title && element.title !== "null" && (<span className='text-white text-center capitalize text-[20px]  px-[10px] py-[10px]' style={{ overflowWrap: 'anywhere' }} dangerouslySetInnerHTML={{ __html: element.title }} />)}
                                            <Text data={element} />
                                        </div>
                                        {
                                            index !== otherElements?.length - 1 &&
                                            <div className="h-8 w-[1px] mx-auto border-l-2 border-dashed border-violet-500"></div>
                                        }
                                    </>
                                }
                                {
                                    element?.type === 'polls' &&
                                    <>
                                        <div className="flex flex-col items-center justify-center w-full border-dashed gap-y-2 border-2 bg-[#0F172A] border-violet-500 rounded-2xl  px-2 sm:px-5 py-5">

                                            <Polls data={element?.main_content} element={element} />
                                            {
                                                element.is_text &&
                                                <div
                                                    className={`text-md text-base`}
                                                    dangerouslySetInnerHTML={{ __html: element?.display_text }}
                                                />
                                            }
                                        </div>
                                        {
                                            index !== otherElements?.length - 1 &&
                                            <div className="h-8 w-[1px] mx-auto border-l-2 border-dashed border-violet-500"></div>
                                        }
                                    </>
                                }
                                {
                                    element?.type === 'map' &&
                                    <>
                                        <div className="flex flex-col items-center justify-center w-full  border-dashed gap-y-2 border-2 bg-[#0F172A] border-violet-500 rounded-2xl  px-2 sm:px-5 py-5">
                                            {element?.is_title && element.title && element.title !== "null" && (<span className='text-white text-center capitalize text-[20px]  px-[10px] py-[10px]' style={{ overflowWrap: 'anywhere' }} dangerouslySetInnerHTML={{ __html: element.title }} />)}

                                            <div className='flex flex-col items-center justify-center sm:w-[99%] max-w-[250px]  xs:max-w-[550px] md:max-w-[600px]'>
                                                <GoogleMap data={{
                                                    lat: element?.main_content?.latitude,
                                                    lng: element?.main_content?.longitude,
                                                    zoom: element?.main_content.zoom
                                                }} />
                                            </div>

                                            {
                                                element.is_text &&
                                                <div
                                                    className={`text-md text-base`}
                                                    dangerouslySetInnerHTML={{ __html: element?.display_text }}
                                                />
                                            }

                                        </div>

                                        {
                                            index !== otherElements?.length - 1 &&
                                            <div className="h-8 w-[1px] mx-auto border-l-2 border-dashed border-violet-500"></div>
                                        }
                                    </>}

                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Bio;