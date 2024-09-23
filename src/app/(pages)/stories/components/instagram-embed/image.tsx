'use client';
import './instagram-embed.css'
const InstagramEmbed = ({ data }: any) => {
    return (

        <div className="w-full">
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
                    <div className="grid grid-cols-12 w-full">

                        <div className='col-span-12 w-full instagram-embed'>
                            <iframe
                                title={data?.title}
                                srcDoc={data?.main_content?.embed}
                                className='min-h-[650px] sm:min-h-[700px] lg:min-h-[770px]'
                                style={{ width: '100%', border: 'none' }}
                            />
                        </div>

                        <div className="col-span-12 my-2">
                            {data.is_text &&
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

export default InstagramEmbed;