import React, { useState } from 'react';
import MuxVideoPlayer from './VideoPlayer';
import MuxAudioPlayer from './AudioPlayer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Musicdownload = ({ data }: any) => {
    const [isDownloadLoading, setIsDownloadLoading] = useState(false);

    // #region FUNCTIONS

    const notify = (message: string) => toast(message);


    async function downloadVideo(video: any) {
        const token = localStorage.getItem('token');

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
            notify('Track Downloaded Successfuly')
        } catch (err) {
            console.error("Error downloading video:", err);
            notify('Error occured while downloading the track')

        }
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

    function decodeSpecialCharacters(encodedString: string): string {
        return decodeURIComponent(encodedString);
    }

    function extractFileNameFromUrl(url: string): string {

        const segments = url.split("/");

        return decodeSpecialCharacters(segments[segments.length - 1]);
    }

    // #endregion 

    return (
        <div>
            {!isDownloadLoading ? <div className="mt-5 w-full">
                {data && data?.length > 0 ?
                    data?.map((item: any, index: number) => (
                        <div key={index}>
                            {item?.main_content !== null && <div className="my-2">
                                <h2 id={`accordion-arrow-icon-heading-${index + 1}`}>
                                    <button
                                        type="button"
                                        className={`flex cursor-pointer items-center justify-between w-full py-2 pr-5 pl-6 font-medium rtl:text-right  border border-b-0  rounded-lg
                                         border-gray-700 text-white bg-gray-800  hover:bg-gray-800 gap-3`}
                                    >

                                        <div className="flex flex-row gap-x-8 items-center">

                                            <div className={`text-[14px] truncate font-medium rtl:text-right text-white capitalize`}
                                                dangerouslySetInnerHTML={{
                                                    __html: (item?.main_content?.name.length
                                                        > 30
                                                        ?
                                                        item?.main_content?.name.slice(0, 30) + '...' :
                                                        item?.main_content?.name)
                                                }} />
                                        </div>
                                        <div className='flex flex-row gap-x-2 items-center'>

                                            <button type="button" onClick={() => { downloadVideo(item) }}
                                                className="border-violet-500 border-[0.3px] rounded-md text-violet-500 p-2 flex gap-x-2 items-center justify-center">
                                                {item?.main_content?.format && (
                                                    <>
                                                        <span className="!text-[14px]"
                                                        >{item?.main_content?.format}</span>
                                                    </>
                                                )}
                                                <svg onClick={() => { downloadVideo(item) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </button>
                                </h2>
                                {/* <div
                                    id={`accordion-arrow-icon-body-${index + 1}`}
                                    className="border bg-black border-gray-700 rounded-b-xl p-5"
                                >
                                    {item?.main_content?.file_type === 'music_video' ? <MuxVideoPlayer data={item} index={index} /> : <MuxAudioPlayer data={item} index={index} />}
                                </div> */}
                            </div>}
                        </div>
                    )) :
                    <></>
                }
            </div> :
                <div className="flex flex-col justify-center items-center p-4">
                    <div className="flex justify-center">
                        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent  rounded-full text-blue-500" role="status" aria-label="loading"></div>
                    </div>
                    <p className="text-center mt-2  text-gray-400">Downloading track</p>
                </div>
            }

            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick={true}
                    onClick={() => toast.dismiss()}
                    rtl={false}
                    draggable
                    theme="dark"
                    limit={1}
                />
            </div>
        </div>
    );
};

export default Musicdownload;