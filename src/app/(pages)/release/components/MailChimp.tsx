'use client';

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MailChimp = ({ data }: any) => {

    const notify = (message: string) => toast(message);
    const [mail_chimp_email, setMail] = useState<any>('')
    const [mail_chimp_loading, setMailLoading] = useState<any>(false)
    const [user_id, SetUserID] = useState<any>("")
    const userInfo: any = localStorage.getItem('userInfo')



    useEffect(() => {


        if (userInfo) {
            let userInf: any = JSON.parse(userInfo)
            SetUserID(userInf.id)
        }

    }, [])
    const subscribe_mail_chimp_email = async () => {

        if (mail_chimp_email) {
            setMailLoading(true)
            let body = {
                user_id: user_id, //whoever is creating the muzicard
                artist_id: data[0].main_content.artist_id, //artist tagged with muzicard
                email: mail_chimp_email, //user email
                mailchimp: true,
            };

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_URL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                });

                if (!response.ok) {
                    setMailLoading(false)
                    throw new Error('Unable to subscribe please try again!');
                } else {
                    const data = await response.json();
                    notify(`${data.message}`)
                    setMail('');
                    setMailLoading(false)
                }
            } catch (error) {
                console.error('Unable to subscribe please try again!', error);
                notify('Unable to subscribe please try again!')
                setMailLoading(false)
            }
        } else {

        }
    }
    return (
        <div>
            {data && data?.length > 0 ?
                data?.map((item: any, index: number) => (
                    <div key={index}>
                        {item?.main_content !== null && <div className="my-2 grid grid-cols-12">
                            {item?.main_content?.api_key && item?.main_content?.list_id && (
                                <div className="col-span-12 bg-white w-full rounded-md flex flex-col items-center justify-center p-2">
                                    <img src="/musaic-icons/mailchimp.png" className="h-[50px] w-[50px]" />
                                    <label>Type the email here , which you want to send!</label>
                                    <input placeholder="Enter Your Email Here.." type="text" value={mail_chimp_email} onChange={(event) => { setMail(event.target.value) }}
                                        className="w-full  h-full text-black border-gray-200 border-[0.5px] p-2 rounded-lg" />
                                    {
                                        mail_chimp_loading ? (<div className="flex items-center justify-center my-2" >

                                            <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent  rounded-full text-blue-500" role="status" aria-label="loading">
                                            </div>

                                        </div>) : (
                                            <>
                                                <button type="button"
                                                    className="bg-violet-500 text-white px-3 my-2  py-1 rounded-lg"
                                                    onClick={subscribe_mail_chimp_email}
                                                >Subscribe</button>
                                            </>)
                                    }



                                </div >)}
                        </div >
                        }
                    </div>

                )) :
                <div className="mt-2 text-base text-gray-500">
                    No NewsLetters found!
                </div>
            }

        </div >
    )
}

export default MailChimp;