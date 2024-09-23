'use client'

import { classNames } from "@/app/Util/styling";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { renderSkeletons } from "@/app/Util/skeleton";



const NewsDetails = () => {

    const params = useParams();
    const [newsData, setNewsData] = useState<any>();

    // #region API

    const getNewsData = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer?article=true&type=articles&slug=${params.id}`,
                { next: { revalidate: 3600 } }
            )
            const albumsRes = await res.json();
            setNewsData(albumsRes.data);
        } catch (error) {
            console.log('ERROR: >>>', error);
        }
    }

    // #endregion

    // #region LIFECYCLE

    useEffect(() => {
        getNewsData()
    }, [])

    // #endregion

    return (
        <div className={classNames('bg-black', 'mt-36', 'text-white', 'font-cabin')}>
            <div className={classNames('pt-6')}>
                <div className={classNames('mx-auto', 'max-w-7xl', 'px-4', 'sm:px-6', 'lg:px-8',)}>
                    <div className={classNames('lg:grid', 'lg:auto-rows-min', 'lg:grid-cols-12', 'lg:gap-x-16')}>


                        <div className={classNames('lg:col-span-12', 'mt-4', 'lg:mt-0')}>
                            {newsData && newsData?.content[0]?.title ?
                                <div className={classNames('flex', 'justify-between', 'flex-col', 'gap-y-5', 'my-4')}>

                                    <h1 className={classNames('text-3xl', 'font-medium')}>{newsData?.content[0]?.title}</h1>
                                </div> :
                                <div role="status" className="animate-pulse flex flex-col xl:flex-row items-center gap-x-4 mb-2">
                                    <div className="h-[40px] mt-3 w-full  rounded-lg bg-gray-700"></div>
                                </div>
                            }
                        </div>

                        <div className={classNames('lg:col-span-12', 'mt-4', 'lg:mt-8')}>
                            {newsData && newsData?.content[0]?.title ? (
                                <Image
                                    src={newsData?.content[0]?.image}
                                    alt="Tappi"
                                    width={734}
                                    height={734}
                                    className={classNames('lg:col-span-2 lg:row-span-2', 'rounded-md')}
                                />
                            ) :
                                <div className="flex gap-x-4 mt-3">
                                    {renderSkeletons(1, '834')}
                                </div>
                            }
                        </div>

                        <div className={classNames('lg:col-span-12', 'mt-16')}>
                            {newsData && newsData?.content[0]?.post ? <div>
                                <div
                                    className={`hs-collapse w-full overflow-hidden transition-[height] duration-300`}
                                >
                                    <div
                                        className={classNames('prose', 'prose-lg', 'mt-4', 'text-gray-400', 'text-xl', 'news-post')}
                                        dangerouslySetInnerHTML={{ __html: newsData?.content[0]?.post }}
                                    />
                                </div>
                            </div> :
                                <div className="mt-5">
                                    {renderSkeletons(22, '25')}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NewsDetails;