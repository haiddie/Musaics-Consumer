'use client';
import './instagram.css'
const Instagram = ({ data }: any) => {
    return (

        <div className="">
            {(
                <>

                    <div className="flex items-center justify-start gap-x-2">
                        <img src="/musaic-icons/instagram.png" className="h-[30px] w-[30px]" />


                        {
                            data?.is_title && data?.title && (
                                <>
                                    <div
                                        className='text-white text-center capitalize text-xl font-bold  py-[10px]' style={{ overflowWrap: 'anywhere' }}
                                        dangerouslySetInnerHTML={{ __html: data?.title }}
                                    />
                                </>
                            )
                        }
                    </div>
                    <div className="grid grid-cols-12">
                        {data?.main_content?.img_arr?.map((img: any, index: number) => (
                            <div key={index} className={data.main_content?.img_arr?.length === 1 ? 'col-span-12' : 'col-span-6 sm:col-span-4 md:col-span-4 xl:col-span-3'}>
                                {img.media_type !== 'VIDEO' && (
                                    <img
                                        loading="lazy"
                                        className=" h-full w-full object-cover my-2"
                                        src={img.media_url}
                                    />
                                )}
                                {
                                    img.media_type === 'VIDEO' && (
                                        <div className="my-2">
                                            <video height="100%" width="100%" controls>
                                                <source src={img.media_url} type="video/mp4" />

                                            </video>
                                        </div>
                                    )
                                }




                                {/* {img.description && data?.main_content?.image.showCaptions && (
                <div
                  style={{
                    textShadow: '2px 2px 4px #000000',
                    borderBottomRightRadius: '8px',
                    borderBottomLeftRadius: '8px',
                  }}
                  className="p-2 opacity-0 leading-3 group-hover:opacity-60 duration-300 absolute left-0 bottom-0 right-0 z-10 flex justify-center items-end text-[8px] bg-gray-700 text-white font-semibold"
                >
                  <span dangerouslySetInnerHTML={{ __html: img.description }} />
                </div>
              )} */}

                            </div>
                        ))}
                        <div className="col-span-12 my-2">
                            {data.main_content?.img_arr?.length > 0 && data.is_text &&
                                <div
                                    className={`instagram text-md text-base text-white `}
                                    dangerouslySetInnerHTML={{ __html: data?.display_text }}
                                />
                            }
                        </div>
                    </div>
                </>
            )
            }
        </div >

    )
}

export default Instagram;