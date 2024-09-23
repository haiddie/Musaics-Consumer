'use client'

import { useEffect, useRef, useState } from "react";
import { getInitials } from '@/app/Util/errorImage';
import Image from 'next/image';
import "./archive.css"
import useIntersectionObserver from './useIntersectionObserver'; // Adjust the path if necessary
const ArtistDetailsContainer = () => {
    const [musaics, setMusaicData] = useState<any[]>([])
    const [loader, setLoader] = useState(false)
    const [size, setSize] = useState(16)
    const [page, setPage] = useState(1)
    const [rownumber, setRowNumber] = useState(1)
    const [totalRecords, setTotalRecords] = useState(0)
    const [pages, setPages] = useState<any>([])
    const [imageContainerHeight, setimageContainerHeight] = useState<any>(500)
    const lastDivRef = useRef<HTMLDivElement | null>(null);
    const getMusaicsData = async (append = false) => {

        let query = `?article=true&type=content&size=${size}&page=${page}&status=published`;
        setLoader(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer${query}`,
                { next: { revalidate: 3600 } }
            );
            const albumsRes = await res.json();


            if (append) {
                const newMusaicsData = albumsRes.data.filter((album: any) => {
                    return !musaics.some((existingAlbum: any) => existingAlbum.id === album.id);
                });

                setMusaicData((prevMusaics) => [...prevMusaics, ...newMusaicsData]);
            } else {
                setMusaicData(albumsRes.data);
            }



            setTotalRecords(parseInt(albumsRes.totalRecords));
            setRowNumber(albumsRes.page * albumsRes.size);
            const totalPages = calculateNumberOfPages(albumsRes.totalRecords, albumsRes.size);
            setPages(generatePageArray(totalPages));
            setLoader(false);
        } catch (error) {
            console.error('ERROR: >>>', error);
            setLoader(false);
        }
    }


    const getStories = (param: string) => {
        if (param === 'prev') {
            const pg = page - 1;
            setPage(pg)

        }
        else {
            const pg = page + 1;
            setPage(pg)

        }

    }

    useEffect(() => {

        if (rownumber < totalRecords) {
            getMusaicsData(true)
        }
    }, [page, rownumber, totalRecords])



    const calculateNumberOfPages = (totalRecords: number, pageSize: number) => {
        return Math.ceil(totalRecords / pageSize);
    }

    const generatePageArray = (numberOfPages: number): number[] => {
        return Array.from({ length: numberOfPages }, (_, index) => index + 1);
    }



    useEffect(() => {
        getMusaicsData(false)
    }, [])


    useEffect(() => {
        const updatePlayerSize = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth < 290) {
                setimageContainerHeight(500)

            }

            if (screenWidth < 500 && screenWidth > 290) {
                setimageContainerHeight(650)

            }
            if (screenWidth < 576 && screenWidth > 500) {
                setimageContainerHeight(850)

            }


            if (screenWidth >= 576) {
                setimageContainerHeight(434)
            }

        };
        updatePlayerSize();
        window.addEventListener('resize', updatePlayerSize);
        return () => {
            window.removeEventListener('resize', updatePlayerSize);
        };
    }, [imageContainerHeight]);





    const handleScrollToLastDiv = () => {


        setPage((prevPage) => prevPage + 1); // Increment the page number



    };

    const { observe } = useIntersectionObserver(handleScrollToLastDiv);

    useEffect(() => {
        if (lastDivRef.current) {
            observe(lastDivRef.current);
        }
    }, [observe]);
    return (
        <div className='bg-black mt-0 md:mt-6 xl:mt-10 text-white font-cabin '>
            <div className="grid grid-rows-1 py-[100px] grid-cols-12 gap-5  w-full  lg:max-w-[1000px] xl:max-w-[1240px] 2xl:max-w-[1380px] mx-auto md:px-6 lg:px-8">
                <div className="col-span-12">

                    <h1 className="text-3xl md:text-4xl xl:text-6xl text-white my-4 px-6 md:px-20 xl:px-16">Immersive Stories</h1>
                    <div className="mx-auto xl:px-16">
                        <div className="grid grid-cols-12 xs:gap-x-2">
                            {musaics && musaics.length > 0 && musaics.map((news: any) => (
                                <div key={news.id} className=" pl-2 pr-2 pt-8 mx-auto pb-8 col-span-12 xs:col-span-12 w-full sm:col-span-12 sm:px-0 md:col-span-6 lg:col-span-6 xl:col-span-3">
                                    <div className="flex justify-center items-center">
                                        <div className=" w-full xs:w-[280px] md:w-[280px] lg:w-[280px] xl:w-[256px] relative" style={{ height: imageContainerHeight + 'px' }}>
                                            <a href={`/stories/${news?.slug}`}>
                                                <div style={{ height: imageContainerHeight + 'px' }} className="relative w-full max-w-full rounded-lg cursor-pointer xs:max-w-[280px]">

                                                    {news?.thumbnail ? <Image
                                                        style={{ height: imageContainerHeight + 'px' }}
                                                        className={`rounded-lg img-card mr-auto ml-auto object-cover  w-full xs:!w-[280px] sm:!w-[280px]  md:!w-[280px] lg:!w-[280px] xl:!w-[256px]`}
                                                        width={320}
                                                        height={450}
                                                        src={news?.thumbnail}
                                                        alt='Musaic'

                                                    /> :
                                                        <div style={{ height: imageContainerHeight + 'px' }} className={`w-full xs:max-w-[280px] bg-gray-400 rounded-lg text-8xl text-gray-700 items-center flex justify-center`}>
                                                            {getInitials(news?.title)}
                                                        </div>
                                                    }
                                                    <div style={{ height: imageContainerHeight + 'px' }} className={` absolute top-0  w-full xs:!w-[280px] sm:!w-[280px]  md:!w-[280px] lg:!w-[280px] xl:!w-[256px] left-0 z-5 h-full bg-gradient-to-b from-[rgba(17,17,17,.09)] via-[rgba(17,17,17,.70)] to-[rgba(17,17,17,.75)] rounded-lg`}>
                                                    </div>
                                                    <div className="absolute bottom-0 font-poppins !font-[800]   w-full z-10 overflow-hidden p-[25px]">
                                                        <div className='flex flex-col gap-y-1 mt-2 w-full'>
                                                            <span className='text-violet-400 text-sm font-[700] mb-2'

                                                            >{new Date(news?.published_date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: '2-digit',
                                                            })}</span>
                                                        </div>
                                                        <div dangerouslySetInnerHTML={{ __html: news?.title }} className=' font-[700]  text-base'></div>
                                                        {
                                                            news?.organization ? <div dangerouslySetInnerHTML={{ __html: news?.organization }} className='text-base font-semibold line-clamp-3 text-white text-right' /> : <></>
                                                        }

                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="col-span-12">
                                {loader ? <div className="flex justify-center">
                                    <div className="animate-spin inline-block w-12 h-12 border-[3px] border-current border-t-transparent  rounded-full text-violet-500" role="status" aria-label="loading"></div>
                                </div> : <></>}
                            </div>

                        </div>


                        {/* <div className="flex items-start justify-between px-6 md:px-20 xl:px-16">
                            <div>
                                {
                                    page > 1 &&
                                    <button type="button" onClick={() => { getStories('prev') }} className="bg-violet-500 text-white text-xl font-bold px-3 py-2 rounded-lg">Prev</button>
                                }

                            </div>
                            <div className="flex  items-center justify-center">
                                <div className="page-numbers flex flex-wrap justify-center">
                                    {pages && pages.map((pge: any) => (
                                        <p
                                            key={pge}
                                            onClick={() => { setPage(pge); }}
                                            className={`page-number px-3 text-[20px] cursor-pointer ${pge === page ? 'active-page' : ''}`}
                                        >
                                            {pge}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div>
                                {
                                    rownumber < totalRecords &&
                                    <button type="button" onClick={() => { getStories('next') }} className="bg-violet-500 text-white text-xl font-bold px-3 py-2 rounded-lg">Next</button>

                                }
                            </div>
                        </div> */}

                        <div ref={lastDivRef} id="last_div" className="h-1"></div>
                    </div>



                </div>
            </div>
        </div >
    )
}


export default ArtistDetailsContainer;