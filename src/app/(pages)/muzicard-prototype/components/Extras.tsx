'use client';

import { MutableRefObject, useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
const Extras = ({ activeTab, data, true_card }: any) => {
    console.log('data', data)
    const ref = useRef<any>(null)

    const url = "https://musaics-consumer.vercel.app/i/";
    let secret_id: any;
    if (typeof window !== 'undefined') {
        secret_id = localStorage.getItem('secret_id')
    }
    const AddBookMark = () => {

        if (typeof window !== 'undefined') {
            let url = `${window.location.origin}/scanned-releases/${secret_id}`
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }


    const DownloadQrCodeImage = () => {
        const canvas: any = document.getElementById("qr-code");
        if (canvas) {
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl
            downloadLink.download = `qrcode.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }


    return (
        <div className='px-2'>


            <div className="flex flex-col items-center justify-start gap-2 border-t-gray-200 border-t-2 p-2">
                <div className="w-full basis[100%]">
                    <h4 className="text-white font-semibold text-2xl basis-[100%] w-[100%]">
                        Save Bookmark
                    </h4>
                </div>

                <div className="flex w-full flex-col items-center justify-center">


                    <p className="text-white w-full text-left">
                        You can bookmark this release by clicking this button
                    </p>
                    <button type="button" className={`${true_card ? 'bg-violet-500' : 'bg-gray-500'} text-white px-4 py-2 rounded-full max-w-[200px] w-full`} onClick={AddBookMark} disabled={true_card ? false : true}>Save Album Release</button>
                </div>
            </div>

            <div className="flex flex-col items-center justify-start gap-2 border-t-gray-200 border-t-2 p-2">
                <div className="w-full basis[100%]">
                    <h4 className="text-white font-semibold text-2xl basis-[100%] w-[100%]">
                        Device Remaining For Scan
                    </h4>
                </div>
                <div className="flex w-full flex-row gap-x-2 items-center justify-start">
                    <p className="text-white ">
                        Device Scans Remaining :
                    </p>
                    <span>{data.access_limit == -1 ? 'Unlimited' : data.access_difference}</span>
                </div>
            </div>
            <div className="flex flex-col items-center justify-start gap-2 border-t-gray-200 border-t-2 p-2">
                <div className="w-full basis[100%]">
                    <h4 className="text-white font-semibold text-2xl basis-[100%] w-[100%]">
                        Share QR Code
                    </h4>
                    {!true_card && <p>No QR Code Available for this view</p>}

                </div>
                <div className="flex w-full gap-3 flex-col items-center justify-center">
                    {true_card && <>
                        <QRCode id='qr-code' value={url + secret_id} fgColor="#3F51B5" qrStyle="fluid" />

                        <button type="button" className="bg-violet-500 text-white px-4 py-2 rounded-full max-w-[200px] w-full" onClick={DownloadQrCodeImage}>Download</button>
                    </>}

                </div>
            </div>
            <div className="flex flex-col  justify-start gap-2 border-t-gray-200 border-t-2 p-2">
                <h4 className="text-white font-semibold text-2xl basis-[100%] w-[100%]">
                    About Tappi
                </h4>
                <p className="text-[16px] font-400 leading-[1.5] py-2 text-left">Tappi was born from a simple idea: to revolutionize the way artists and fans connect. Founded by a group of musicians and tech enthusiasts, we&apos;ve experienced firsthand the challenges and rewards of sharing music in the digital age.
                </p>
                <p className="text-[16px] font-400 leading-[1.5]  py-2 text-left">Our journey is about more than just building a platform; it&apos;s about creating a community where every note tells a story, and every story brings us closer.</p>
                {/* <a href={`/about-us`} target="_blank" className="text-violet-500 opacity-[0.5] hover:opacity-[1]">See More</a> */}
            </div>

        </div>
    )
}

export default Extras;