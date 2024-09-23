'use client';



import SubHeader from "../SubHeader";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination } from 'swiper/modules';
import Image from 'next/image';
import GoogleMap from "@/app/(pages)/stories/components/google-map/google-map";
import { useState } from "react";
import useForm from "./useForm";





const ContactUs = () => {



    const { formData, errors, handleChange, handleSubmit, validateForm, resetForm } = useForm();

    const [loading, setLoading] = useState<boolean>(false);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            await handleSubmit();
            setLoading(false);
        }
    };





    return (
        <>

            <div className=" bg-[#060B28]">
                <div className="bg-[url('/images/contact-us-banner.jpg')] bg-cover bg-center min-h-[500px]">
                    <div className="grid grid-cols-12 py-[150px] bg-gray-800 bg-opacity-50 h-full min-h-[500px] gap-6 p-10 xl:p-[130px]">
                        <div className="col-span-12">
                            <div className='h-full flex justify-center items-center'>
                                <div>
                                    <h1 className="text-[32px] xl:text-[48px] font-[600] text-left lg:text-center leading-[57.6px]">Contact Us</h1>
                                    <p className="text-[16px] xl:text-[24px] max-w-[744px] font-[600] py-2  font-inter  leading-[36px] text-left lg:text-center">Reach out to us today to discuss how Tappi can support your musical aspirations or enrich your music discovery journey!</p>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <div className='grid grid-cols-12 bg-white bg-opacity-[0.1] lg:bg-transparent   w-full  p-4 sm:p-6 xl:px-[200px] lg:py-[150px] gap-4'>
                    <div className="col-span-12">
                        <div className="w-full flex justify-center items-center pb-10">
                            <h1 className="text-white font-[600] text-[32px] xl:text-[48px]  w-full leading-[57.6px]  max-w-[913px]  py-2 text-center">
                                Let&apos;s Start a Conversation!
                            </h1>
                        </div>

                        <form onSubmit={onSubmit} className="relative">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 lg:col-span-6">
                                    <input type="text" name="name" value={formData.name} disabled={loading} onChange={handleChange} placeholder="Your Name" className="p-2 w-full rounded-lg bg-white text-black" />
                                    {errors.name && <span className="text-red-500">{errors.name}</span>}
                                </div>

                                <div className="col-span-12 lg:col-span-6">
                                    <input type="email" name="email" value={formData.email} disabled={loading} onChange={handleChange} placeholder="Your Email" className="p-2 w-full rounded-lg bg-white text-black" />
                                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                                </div>

                                <div className="col-span-12 lg:col-span-6">
                                    <input type="text" name="phone_number" value={formData.phone_number} disabled={loading} onChange={handleChange} placeholder="Phone Number" className="p-2 w-full rounded-lg bg-white text-black" />
                                    {/* {errors.phone_number && <span className="text-red-500">{errors.phone_number}</span>} */}
                                </div>

                                <div className="col-span-12 lg:col-span-6">
                                    <input type="text" name="subject" value={formData.subject} disabled={loading} onChange={handleChange} placeholder="Subject" className="p-2 w-full rounded-lg bg-white text-black" />
                                    {errors.subject && <span className="text-red-500">{errors.subject}</span>}
                                </div>

                                <div className="col-span-12">
                                    <textarea name="body" value={formData.body} onChange={handleChange} disabled={loading} placeholder="Message ..." className="p-2 w-full rounded-lg min-h-[222px] bg-white text-black"></textarea>
                                    {errors.body && <span className="text-red-500">{errors.body}</span>}
                                </div>

                                <div className="col-span-12">
                                    <div className="g-recaptcha" data-sitekey="YOUR_SITE_KEY" data-callback="handleRecaptchaChange"></div>
                                    {errors.recaptcha && <span>{errors.recaptcha}</span>}
                                    <div className="flex justify-center items-center ">
                                        {loading === true ? (
                                            <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent  rounded-full text-violet-500" role="status" aria-label="loading">
                                            </div>
                                        ) : (<button type="submit" className="cursor-pointer bg-gradient-to-r from-[#6960F5] to-[#757BF6] text-white px-4 py-2 mx-auto   rounded-md">
                                            Submit Message
                                        </button>)}

                                    </div>
                                </div>
                            </div>

                            {/* <ToastContainer
                                bodyClassName={`!bg-transparent !text-white !text-[24px] !p-0 !shadow-none`}
                                toastClassName={`!bg-transparent !shadow-none`}

                                className={`!bg-green-600  absolute  !p-2 !top-1/2 !left-[0%] sm:!left-[30%]`}
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={true}
                                closeOnClick={true}
                                onClick={() => toast.dismiss()}
                                rtl={false}
                                theme="colored"
                                limit={1}
                            /> */}
                        </form>



                    </div>




                </div>

                <div className='grid grid-cols-12 bg-white bg-opacity-[0.1] lg:bg-transparent   w-full  p-4 sm:p-6 xl:px-[200px] gap-4'>
                    <div className="col-span-12">
                        <div className="w-full flex justify-center items-center">
                            <h1 className="text-white font-[600] text-[24px] xl:text-[32px]  w-full leading-[30x]  max-w-[913px]  py-2 text-left lg:text-center">
                                Locations
                            </h1>
                        </div>

                    </div>


                    <div className="col-span-12 lg:col-span-6">
                        <div className="w-full flex justify-start items-center">
                            <h1 className="text-white font-[600] text-[20px] xl:text-[24px]   w-full leading-[30px]  py-2 text-left ">
                                Nashville
                            </h1>


                        </div>
                        <div className="w-full flex justify-start items-center">
                            <GoogleMap data={{ lat: 36.174465, lng: -86.767960, zoomLevel: 2, width: '600px', height: '600px' }} />
                        </div>

                    </div>


                    <div className="col-span-12 lg:col-span-6">
                        <div className="w-full flex justify-start items-center">
                            <h1 className="text-white font-[600] text-[20px] xl:text-[24px]   w-full leading-[30px]  py-2 text-left ">
                                Cleveland
                            </h1>


                        </div>
                        <div className="w-full flex justify-start items-center">
                            <GoogleMap data={{ lat: 41.505493, lng: -81.681290, zoomLevel: 2, width: '600px', height: '600px' }} />
                        </div>
                    </div>
                </div>





            </div>
        </>
    )
}

export default ContactUs;