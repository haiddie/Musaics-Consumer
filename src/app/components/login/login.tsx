import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    signInWithPopup,
    linkWithPopup,
    fetchSignInMethodsForEmail,
    signInWithCustomToken,
    getAuth,
    FacebookAuthProvider,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { isUserRegisteredInDb, getUserData, registerUserInDb, getCreatorToken } from '@/app/Util/login';
import Passwordlesslogin from './passwordlessLogin/passwordLessLogin';
import GenericModal from '../modal/modal';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import ErrorIcon from '@mui/icons-material/Error';

const Login = ({ onclose, loginTrigger, type, openSignupModal }: any) => {

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


    const firebaseConfig = {
        apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
        authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
        projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
        messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`,
        appId: `${process.env.NEXT_PUBLIC_APP_ID}`,
    };
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userRole, setUserRole] = useState<any>()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isLoggedIn, setIsloggedIn] = useState(false);

    const isMobileScreen = windowWidth < 768;
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    let userObject: any = {}


    // #region FUNCTIONS

    const [facebookLogin, setFacebookLogin] = useState<boolean>(false);

    const openModal = (param?: any) => {
        setModalIsOpen(true);
        if (param) {
            setFacebookLogin(true)
        }
        else {
            setFacebookLogin(false)
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setFacebookLogin(false)
    };

    const notify = (message: string) => toast(message);


    const SocialSignUp = async (providerName: string) => {
        setIsLoading(true);
        let platform = 'cordovaa';

        try {
            if (platform === 'cordova') {
                setIsLoading(false);
                try {
                    let provider: any;
                    if (providerName === 'google') {
                        provider = new GoogleAuthProvider();
                    } else if (providerName === 'facebook') {
                        provider = new FacebookAuthProvider();
                    }

                    const result = await signInWithPopup(auth, provider);
                    const credential = providerName === 'google' ?
                        GoogleAuthProvider.credentialFromResult(result) :
                        FacebookAuthProvider.credentialFromResult(result);
                    const user: any = result.user;

                    const resp = await isUserRegisteredInDb(user);
                    if (resp.success === true) {
                        const roles = userRole.split(',').map((item: any) => item.trim());
                        console.log('roles', roles);
                        await registerUserInDb(user, roles);
                    }

                    const token = user.stsTokenManager.accessToken;

                    setTimeout(async () => {
                        const data = await getUserData(token, auth);
                        userObject = data.data[0];

                        setIsLoading(false);
                        return;
                    }, 1000)

                } catch (error) {
                    console.error(`Error from ${providerName} login:`, error);
                    setIsLoading(false);
                    return;
                }
            }

            let provider: any;
            if (providerName === 'google') {
                provider = new GoogleAuthProvider();
            } else if (providerName === 'facebook') {
                provider = new FacebookAuthProvider();
            }

            let token = '';
            try {
                const result = await signInWithPopup(auth, provider);

                const credential = providerName === 'google' ?
                    GoogleAuthProvider.credentialFromResult(result) :
                    FacebookAuthProvider.credentialFromResult(result);

                const user: any = result.user;

                if (providerName === 'facebook' && !result.user.email) {
                    showToast('Unable to sign up with Facebook. Please ensure email sharing permission is enabled in your Facebook account settings.')
                    setIsLoading(false);
                    return;
                }
                const signInMethods = await fetchSignInMethodsForEmail(auth, result.user.email as string);

                // if (signInMethods.indexOf(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) === -1) {
                if (providerName === 'google' && signInMethods.indexOf(FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD) !== -1) {
                    const fbProvider = new FacebookAuthProvider();
                    await linkWithPopup(user, fbProvider);
                } else if (providerName === 'facebook' && signInMethods.indexOf(GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD) !== -1) {
                    const fbProvider = new FacebookAuthProvider();
                    await linkWithPopup(user, fbProvider);
                }
                const resp = await isUserRegisteredInDb(user);
                let newToken: string = '';
                if (resp.success === true) {
                    if (type === 'signup') {
                        const roles = userRole.split(',').map((item: any) => item.trim())
                        console.log('roles', roles);
                        const registeredUser = await registerUserInDb(user, roles);
                        console.log('registeredUser', registeredUser)
                        await signInWithCustomToken(auth, registeredUser?.data);
                        const loggedInUserToken = await auth.currentUser?.getIdToken();
                        if (loggedInUserToken) newToken = loggedInUserToken
                    }
                    else {
                        showToast("Oops! It doesn't appear that a user exists using the selected account.")
                        setIsLoading(false);
                        return;
                    }
                }
                type === 'signup' && !resp.success ? token = newToken : token = user.stsTokenManager.accessToken;
                if (!token) {
                    token = user.stsTokenManager.accessToken
                }


                const data = await getUserData(token, auth);
                userObject = data.data[0];

                const creatorToken: any = await getCreatorToken(token);
                localStorage.setItem('creatorToken', creatorToken?.data);
                // }
                setIsloggedIn(true);
                setIsLoading(false);
                // onclose(true);
                localStorage.setItem('token', token);
                localStorage.setItem('userInfo', JSON.stringify(userObject));
                loginTrigger();
                setTimeout(() => {
                    window.location.reload()
                }, 1000)

            } catch (error) {
                console.error(`Error from ${providerName} login:`, error);
                setIsLoading(false);
                showToast("Oops! It doesn't appear that a user exists using the selected account.")
            }
        } catch (err) {
            console.error('Error:', err);
            setIsLoading(false);
        }
    };


    // #endregion



    // #region LIFECYCLES

    useLayoutEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // #endregion

    const reset_error = () => {
        setErrMessage('')
        setShowErr(false)
    }

    return (
        <div>
            {
                !isLoading ? <div>
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
                                <button type="button" className='text-white bg-violet-500 p-2 rounded-lg' onClick={() => { openSignupModal('login'); reset_error() }}>Login using a different Account</button>

                                <button type="button" className='text-white bg-violet-500 p-2 rounded-lg' onClick={() => { openSignupModal('signup'); reset_error() }}>Sign up to Tappi</button>
                            </div>
                        </div>

                    </div>) : (
                        <div>
                            <div className="m-3 flex justify-end">
                                <button onClick={onclose} className="flex justify-end text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {
                                type === 'signup' && !userRole && <div className='flex flex-col gap-3 justify-center'>

                                    <span className="mx-8 mb-8 mt-2 text-center text-3xl text-white font-semibold"> Please select user role </span>

                                    <div className='flex md:flex-row flex-col  gap-3 w-full justify-center items-center md:justify-around'>

                                        <div onClick={() => { setUserRole('consumer'); }} className="relative cursor-pointer overflow-hidden transition duration-300 transform hover:scale-105">


                                            <Image
                                                className={`rounded-lg z-0 object-cover ${isMobileScreen ? 'min-w-[390px]  h-[200px] max-h-[200px]' : 'min-w-[190px] h-auto min-h-[350px] max-h-[350px]'}}`}
                                                width={190}
                                                height={190}
                                                src="https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 387w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 687w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 774w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 987w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1287w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1374w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1587w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1887w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1974w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 2187w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 2487w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 2574w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 2787w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 3087w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 3174w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 3387w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 3687w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 3774w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 3987w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=4287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 4287w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=4374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 4374w, https://plus.unsplash.com/premium_photo-1661668381760-c25cea629221?q=80&w=4393&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 4393w"
                                                alt='Musaic'
                                            />
                                            <div className={`absolute top-0 left-0 z-5 ${!isMobileScreen ? 'min-w-[190px]' : 'min-w-[390px]'} h-full bg-gradient-to-b from-transparent to-black rounded-lg`}>
                                            </div>
                                            <div className={`absolute bottom-[10px] ${!isMobileScreen ? 'left-[60px]' : 'left-[160px]'} w-full z-10 overflow-hidden px-3`}>
                                                <div dangerouslySetInnerHTML={{ __html: 'Fan' }} className='text-3xl line-clamp-3 text-white mb-6'></div>
                                            </div>
                                        </div>
                                        <div onClick={() => { setUserRole('artist'); }} className="relative cursor-pointer overflow-hidden transition duration-300 transform hover:scale-105">

                                            <Image
                                                className={`rounded-lg z-0  object-cover ${isMobileScreen ? 'min-w-[390px] h-auto min-h-[200px] max-h-[200px]' : 'min-w-[190px] h-auto min-h-[350px] max-h-[350px]'}`}
                                                width={190}
                                                height={190}
                                                src="https://images.unsplash.com/photo-1504960868016-9a59a5172321?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                alt='Musaic'
                                            />

                                            <div className={`absolute top-0 left-0 z-5 ${!isMobileScreen ? 'min-w-[190px]' : 'min-w-[390px]'} h-full bg-gradient-to-b from-transparent to-black rounded-lg`}></div>

                                            <div className={`absolute bottom-[10px] ${!isMobileScreen ? 'left-[48px]' : 'left-[150px]'} w-full z-10 overflow-hidden px-3`}>
                                                <div dangerouslySetInnerHTML={{ __html: 'Artist' }} className='text-3xl line-clamp-3 text-white mb-6'></div>
                                            </div>

                                        </div>
                                        <div onClick={() => { setUserRole('band,artist'); }} className="relative cursor-pointer overflow-hidden transition duration-300 transform hover:scale-105">


                                            <Image
                                                className={`rounded-lg z-0 object-cover ${isMobileScreen ? 'min-w-[390px] h-auto min-h-[200px] max-h-[200px]' : 'min-w-[190px] h-auto min-h-[350px] max-h-[350px]'}
                          }`}
                                                width={190}
                                                height={190}
                                                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                alt='Musaic'

                                            />
                                            <div className={`absolute top-0 left-0 z-5 ${!isMobileScreen ? 'min-w-[190px]' : 'min-w-[390px]'} h-full bg-gradient-to-b from-transparent to-black rounded-lg`}>
                                            </div>
                                            <div className={`absolute bottom-[10px] ${!isMobileScreen ? 'left-[48px]' : 'left-[150px]'} w-full z-10 overflow-hidden px-3`}>
                                                <div dangerouslySetInnerHTML={{ __html: 'Label' }} className='text-3xl line-clamp-3 text-white mb-6'></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }



                            {(type === 'login' || (type === 'signup' && userRole)) && !isLoggedIn && <div className="flex flex-col">

                                <div className=" flex w-full flex-col items-center">
                                    <div className="m-5 items-center flex w-fit justify-center flex-col">
                                        {type === 'signup' && userRole && (
                                            <span className="text-center leading-[48px] text-[30px] text-white font-semibold capitalize">
                                                Complete your sign up as  {userRole === 'consumer' ? 'a Fan' : userRole === 'artist' ? 'an Artist' : 'a Label'}
                                            </span>
                                        )}
                                        {type === 'login' && (
                                            <>
                                                <span className=" text-center leading-[48px] text-[30px] text-white font-semibold"> Welcome Back! </span>

                                            </>
                                        )}
                                        <span className=" text-center text-[14px] leading-[36px] text-white font-semibold"> Login to continue to Tappi </span>
                                        <div className="flex flex-col">
                                            <button className="m-2 flex rounded-md border items-center gap-2 border-[#a8a8a8] hover:border-gray-500 p-2 px-6" onClick={() => { SocialSignUp('google') }}>

                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                                </svg>
                                                <span className="text-white">Continue with Google</span>
                                            </button>
                                            {/* <button className="m-2 flex rounded-md border items-center gap-2 border-[#a8a8a8] hover:border-gray-500 p-2 px-6" onClick={() => { openModal('facebook') }}>

                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                                    <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                                                </svg>

                                                <span className="text-white">Continue with Facebook</span>
                                            </button> */}
                                            <button className="text m-2 flex items-center gap-2 rounded-md border border-[#a8a8a8] hover:border-gray-500 p-2 px-6" onClick={() => { openModal(null) }}>

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-7 h-7">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                                </svg>

                                                <span className="text-white">Continue with Email</span>
                                            </button>
                                        </div>
                                        <div className="flex mt-10 mx-3 px-3 items-center relative top-[-20px] ">
                                            <div className="text-xs text-white text-center "> Click “Sign In” to agree to Tappi <a className='cursor-pointer text-violet-500 hover:opacity-[0.5]' target="_blank" href="/terms-of-service">Terms of Service</a> and acknowledge that Tappi <a className='cursor-pointer text-violet-500 hover:opacity-[0.5]' target="_blank" href="/privacy-policy">Privacy Policy</a> applies to you.</div>
                                        </div>
                                        <hr className="w-full h-[2px] mx-auto my-0  border-0 rounded md:my-5 bg-gray-200" />

                                        {type === 'login' && (
                                            <div className="text-[16px] text-white text-center "> Not registered yet?
                                                <a className='cursor-pointer text-violet-500 hover:opacity-[0.5]' onClick={() => { openSignupModal('signup') }}> Sign Up Here.</a>
                                            </div>)}

                                        {type === 'signup' && userRole && (
                                            <div className="text-[16px] text-white text-center "> Need to change your sign up role?
                                                <a className='cursor-pointer text-violet-500 hover:opacity-[0.5]' onClick={() => { setUserRole('') }}> Go Here.</a>
                                            </div>)}


                                    </div>
                                </div>
                            </div>}

                            {
                                isLoggedIn && <div className='w-full flex flex-col justify-center items-center mt-[200px]'>
                                    <div className="mb-8 mx-8 text-3xl text-primary-base font-semibold text-center text-primary-100">
                                        User Logged In Successfully
                                    </div>
                                    <button onClick={onclose}
                                        className="w-[150px] items-center justify-center px-6 py-2 border border-transparent rounded-full text-base font-medium text-white bg-primary-100"
                                    >OK</button>
                                </div>

                            }
                        </div>
                    )}

                </div> :
                    <div className="flex flex-col min-h-[550px] justify-center items-center p-4">
                        <div className="flex justify-center">
                            <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent  rounded-full text-blue-500" role="status" aria-label="loading">
                            </div>
                        </div>
                    </div>
            }

            <GenericModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                customStyles={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    },
                }}
                width="650"
                background='0'
            >
                <Passwordlesslogin type={type} role={userRole} socialLogin={facebookLogin} openSignupModal={openSignupModal} onclose={closeModal}></Passwordlesslogin>
            </GenericModal>
            <div>
                {/* <ToastContainer
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
                /> */}
            </div>
        </div >
    )
}
export default Login;