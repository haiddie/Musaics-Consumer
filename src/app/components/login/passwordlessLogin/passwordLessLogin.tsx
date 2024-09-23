import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { isUserRegisteredInDb, registerUserwithEmail, sendEmailLink } from '@/app/Util/login';
import { getAuth } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorIcon from '@mui/icons-material/Error';
const Passwordlesslogin = ({ onclose, role, type, socialLogin, openSignupModal }: any) => {

    const firebaseConfig = {
        apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
        authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
        projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
        messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`,
        appId: `${process.env.NEXT_PUBLIC_APP_ID}`,
    };

    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(email);
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);


    // #region FUNCTIONS

    const onCloseEvent = () => {
        onclose(true)
    };

    const notify = (message: string) => toast(message);

    const submit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const isUserRegistered = await isUserRegisteredInDb({ email });
            if (isUserRegistered.success === true) {
                if (type === 'signup') {
                    const roles = role.split(',').map((item: any) => item.trim())
                    let registerObj = {
                        email: email,
                        username: email.substring(0, email.indexOf('@')),
                        register_passwordless: true,
                        sign_up_page: window.origin + location.pathname,
                        role: roles,
                        "platform": "musaics"
                    };
                    await registerUserwithEmail(registerObj);
                } else {
                    showToast('User not signed up. Please sign up the user to continue');
                    setIsLoading(false);
                    return;
                }
            }
            await sendEmailLink(email, auth);
            setSuccess(true);
        } catch (error) {
            showToast('An error occurred. Please try again later.');
            setSuccess(false);
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    // #endregion
    const [errMessage, setErrMessage] = useState<any>('')
    const [showErr, setShowErr] = useState<boolean>(false)

    const showToast = (msg: string) => {
        setErrMessage(msg);
        setShowErr(true);
    };


    useEffect(() => {
        setErrMessage('');
        setShowErr(false);
    }, [])


    const reset_error = () => {
        setErrMessage('')
        setShowErr(false)
    }


    return (
        <div>
            {showErr ? (<div>

                <div className="m-3 flex justify-end">
                    <button onClick={() => { onclose(); reset_error() }} className="flex justify-end text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className='flex flex-col h-full gap-x-4 gap-y-6 justify-center items-center'>
                    <div className='flex justify-center items-center gap-x-2'>
                        <ErrorIcon className='text-[34px]' />
                        <h1 className="text-[32px] leading-[36px] font-semibold">

                            Error
                        </h1>

                    </div>

                    <p className=' text-white text-[17px]  text-center'>{errMessage}</p>

                    <div className='flex justify-center items-center gap-x-4 mt-[40px]'>
                        <button type="button" className='text-white bg-violet-500 p-2 rounded-lg' onClick={() => { openSignupModal('login'); reset_error(); }}>Login using a different Account</button>

                        <button type="button" className='text-white bg-violet-500 p-2 rounded-lg' onClick={() => { openSignupModal('signup'); reset_error(); onclose() }}>Sign up to Tappi</button>
                    </div>
                </div>

            </div>) : (
                <>
                    <div className="flex flex-col">
                        <div className="m-3 flex justify-end">
                            <button onClick={onCloseEvent} className="flex justify-end text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {!isLoading && !success ? <div className="flex w-full flex-col items-center">
                            <div className="m-5 items-center flex w-fit justify-center flex-col">
                                <span className="m-8 text-center text-3xl text-primary-100 font-semibold"> {type == "signup" ? <span>Sign Up</span> : <span>Sign In</span>} With Email </span>
                                {socialLogin ? <span className="flex text-white text-center m-3"> Enter the email address associated to your Facebook account, and we&lsquo;ll send a magic link to your inbox. </span> : <span className="flex text-white text-center m-3"> Enter the email address associated with your account, and we&lsquo;ll send a magic link to your inbox. </span>}

                                <form onSubmit={submit} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm m-3 text-center font-medium text-white"> Your Email </label>
                                        <div className="mt-1">
                                            <input
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="block w-full appearance-none rounded-md border text-center border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary-base focus:outline-none focus:ring-secondary-base sm:text-sm text-black"
                                            />
                                            <p className="text-red-500 text-xs" style={{ display: email ? 'none' : 'block' }}> *Email is required</p>
                                            <p className="text-red-500 text-xs" style={{ display: email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'block' : 'none' }}> *Email is not valid. Please enter a valid email.</p>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className={`bg-primary-100 flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm ${isEmailValid ? 'bg-green-600' : 'bg-gray-500'
                                                } focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2`}
                                            disabled={!isEmailValid}
                                        >

                                            {type == "signup" ?
                                                <span style={{ display: isLoading ? 'none' : 'block' }}>
                                                    Sign Up</span> :
                                                <span style={{ display: isLoading ? 'none' : 'block' }}>
                                                    Log In</span>}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div> :
                            <div>
                                {!success ? <div className="flex flex-col min-h-[550px] justify-center items-center p-4">
                                    <div className="flex justify-center">
                                        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent  rounded-full text-blue-500" role="status" aria-label="loading">
                                        </div>
                                    </div>
                                </div> :
                                    <div className="flex flex-col items-center justify-center px-10 my-10 align-middle">
                                        <div className="mb-8 mx-8 text-3xl text-primary-base font-semibold text-center text-primary-100">Check Your Inbox!</div>
                                        <div className="text-white text-left">
                                            <p>Click the link we sent to {email} to complete your sign in and view this page</p>
                                            <p className="text-center my-10 text-white"> Didn&lsquo;t get the link? <a onClick={onCloseEvent} href="#" className="cursor-pointer text-primary-100"> Try again</a></p>
                                        </div>
                                    </div>}
                            </div>
                        }
                    </div>
                    <div>

                    </div>
                </>)}
        </div>
    )
}
export default Passwordlesslogin;