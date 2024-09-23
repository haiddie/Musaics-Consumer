'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GenericModal from "./modal/modal";
import Login from "./login/login";
import { initializeApp } from "firebase/app";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { getCreatorToken, getUserData, isUserRegisteredInDb, registerUserInDb } from "../Util/login";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
  const notify = (message: string) => toast(message);
  const [signInModalIsOpen, setSignupModalIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [type, setType] = useState('');
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const [userData, setUserData] = useState<any>(null)
  const [showFooter, setShowFooter] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  let userObject: any = {}
  // #region LIFEYCLE

  const checkIsLoggedIn = () => {
    setIsLoading(true)
    const userDataFromStorage = localStorage.getItem('userInfo');
    const parsedUserData = userDataFromStorage ? (JSON.parse(userDataFromStorage)) : null;
    if (userDataFromStorage) {
      setIsLoggedIn(true)
      setUserData(parsedUserData);

    }
    setIsLoading(false)
  }

  const checkLogin = () => {
    const userDataFromStorage = localStorage.getItem('userInfo');

    if (userDataFromStorage) {


    }
    else {
      openSignupModal('signup')
    }
  }
  useEffect(() => {
    if (pathname.includes('muzicard-prototype') || pathname.includes('/i/') || pathname.includes('/release') || pathname.includes('scanned-releases')) {
      setShowFooter(false)
    }
  }, [pathname]);

  const openSignupModal = (type: string) => {
    setType(type)
    setSignupModalIsOpen(true);
  };


  const signInFromLink = () => {
    setIsLoading(true);
    let token = '';
    const firebaseConfig = {
      apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
      projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
      messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`,
      appId: `${process.env.NEXT_PUBLIC_APP_ID}`,
    };

    try {
      const firebaseApp = initializeApp(firebaseConfig);
      const auth = getAuth(firebaseApp);

      const url = `${window?.origin}/?email=${searchParams.get(
        'email'
      )}&apiKey=${searchParams.get('apiKey')}&oobCode=${searchParams.get(
        'oobCode'
      )}&mode=${searchParams.get('mode')}&lang=${searchParams.get('lang')}`;

      let email = searchParams.get('email');

      if (isSignInWithEmailLink(auth, url)) {
        if (email === null) {
          email = localStorage.getItem('emailForSignIn');
        }

        signInWithEmailLink(auth, email as string, url)
          .then(async (result: any) => {
            const user = result.user;
            const resp = await isUserRegisteredInDb(user);
            if (resp.success === true) {
              await registerUserInDb(user);
            }
            token = user.stsTokenManager.accessToken;
            const data = await getUserData(token, auth);
            userObject = data.data[0];
            const creatorToken: any = await getCreatorToken(token);
            localStorage.setItem('creatorToken', creatorToken?.data);
            setIsLoading(false);
            localStorage.setItem('token', token);
            localStorage.setItem('userInfo', JSON.stringify(userObject));
            checkIsLoggedIn();
            window.location.reload()
            notify('User Logged in Successfuly!');

          })
          .catch((error) => {
            console.error('Error signing in:', error);
            setIsLoading(false);
          });
      }
    } catch (error) {
      console.error('Firebase initialization error:', error);
      setIsLoading(false);
    }
  };

  // #endregion

  useEffect(() => {
    checkIsLoggedIn();
  }, [])

  useEffect(() => {
    const search = searchParams.get('email')
    const apiKey = searchParams.get('apiKey')

    if (search && apiKey) {
      signInFromLink();
    }
  }, [searchParams])

  return (
    <div>
      {showFooter ? <footer data-testid="footer" className="font-cabin border-t border-t-white/15 md:border-none">
        <div className=" pt-7  mb-7 grid grid-cols-12 md:px-10  md:mb-30">
          <div className="flex items-center  justify-center sm:justify-between col-span-12 md:col-span-4 mb-10 md:mb-0  lg:col-span-6">

            <Link href="/" aria-label="Home">
              <div className="flex items-center w-full h-full px-4">
                <img className="w-full max-h-[80px]" src="/icons/tappi-logo-color-white.svg" alt="Tappi" />

                {/* <div className="font-varelaRound font-bold text-2xl leading-[1]">musaics</div> */}
              </div>
            </Link>

          </div>

          <div className=" col-span-12 xs:col-span-6 md:col-span-4   lg:col-span-2">
            <section className="border-t border-white/15 sm:border-0 p-4" data-testid="accordion_links">
              <h1 className="uppercase font-[600] text-[20px] leading-[54px]">
                Explore

              </h1>
              <div className="grid transition-[grid-template-rows] sm:transition-none sm:block sm:pb-0 grid-rows-0" id="section_0" role="region" aria-labelledby="section_0_trigger">
                <ul className="font-montserrat overflow-hidden">
                  {/* <li>
                  <a href="#" target="_self" className="inline-block transition-colors text-white/50 hover:text-white">
                    About
                  </a>
                </li> */}
                  <li>
                    <a href="/about-us" target="_self" className={`inline-block transition-colors leading-[32px]  ${pathname.includes('about-us') ? 'text-white' : 'text-white/50'} hover:text-white`}>
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/music-fans" target="_self" className={`inline-block transition-colors leading-[32px]  ${pathname.includes('music-fans') ? 'text-white' : 'text-white/50'} hover:text-white`}>
                      Music Fans
                    </a>
                  </li>
                  <li>
                    <a href="/merch-tools" target="_self" className={`inline-block transition-colors leading-[32px]  ${pathname.includes('tools') ? 'text-white' : 'text-white/50'} hover:text-white`}>
                      Artists and Labels
                    </a>
                  </li>
                  <li>
                    <a href="/pricing" target="_self" className={`inline-block transition-colors leading-[32px]  ${pathname.includes('pricing') ? 'text-white' : 'text-white/50'} hover:text-white`}>
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_self" className={`inline-block transition-colors leading-[32px]  ${pathname.includes('help') ? 'text-white' : 'text-white/50'} hover:text-white`}>
                      Help
                    </a>
                  </li>
                  <li>
                    <a href="/contact-us" target="_self" className={`inline-block transition-colors leading-[32px]  ${pathname.includes('contact-us') ? 'text-white' : 'text-white/50'} hover:text-white`}>
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          <div className="col-span-12 xs:col-span-6 md:col-span-4   lg:col-span-4 md:py-9">

            <section className="border-t border-white/15 sm:border-0 p-4" data-testid="accordion_links">
              <h1 className="capitalize text-[16px] lg:text-[18px] leading-[42px] font-[700] sm:mb-4 pb-2">
                © 2024 Tappi. All rights reserved </h1>

              <h1 className="capitalize sm:mb-4 pb-2 md:pb-2">
                Stay Connected Join Tappi </h1>
              {isLoggedIn === false ?
                (
                  <button type="button" onClick={checkLogin} className="cursor-pointer bg-gradient-to-r from-[#777FF7] to-[#604AF5] text-white w-full text-center px-4 py-2 mt-2 rounded-md">Join</button>
                ) : <button type="button" onClick={checkLogin} className="cursor-pointer bg-gradient-to-r from-[#777FF7] to-[#604AF5] text-white w-full text-center px-4 py-2 mt-2 rounded-md">Join</button>}


            </section>
          </div>


          <div className="px-5 mt-[40px] col-span-6 border-t border-t-white/15 gap-x-10 text-white/50 py-4 md:py-9">

            <ul className="grid grid-cols-12  py-7 md:py-0 md:border-none" data-testid="footer_links">

              <li className="col-span-12 md:col-span-3">
                <Link href="/privacy-policy" target="_blank" className={`inline-block transition-colors leading-[32px]  ${pathname.includes('privacy-policy') ? 'text-white' : 'text-white/50'} hover:text-white`}>
                  Privacy Policy
                </Link>
              </li>
              <li className="col-span-12 md:col-span-3">
                <Link href="/terms-of-service" className={`inline-block transition-colors leading-[32px]  ${pathname.includes('terms-of-service') ? 'text-white' : 'text-white/50'} hover:text-white`}>
                  Terms of Service
                </Link>
              </li>
              <li className="col-span-12 md:col-span-3">
                <Link href="#" target="_blank" className="inline-block transition-colors leading-[32px] text-white/50 hover:text-white">
                  Cookies Settings
                </Link>
              </li>
              <li className="col-span-12 md:col-span-3">
                <Link href="#" target="_blank" className="inline-block transition-colors leading-[32px] text-white/50 hover:text-white">
                  Cookies Policy
                </Link>
              </li>
              <li>


              </li>
            </ul>

          </div>


          <div className="px-5 mt-[40px] col-span-6 border-t border-t-white/15 gap-x-10 text-white/50 py-9">

            <div className="flex gap-x-2 items-center justify-end">
              <a target="_blank" href="#" className="bg-gradient-to-r from-[#777FF7] to-[#604AF5] h-[30px] w-[30px] px-2 py-0 flex items-center justify-center rounded-full">
                <img src={'/icons/facebook.png'} className="h-[15px] w-[15px]" />
              </a>
              <a target="_blank" href="#" className="bg-gradient-to-r from-[#777FF7] to-[#604AF5] h-[30px] w-[30px] px-2 py-0 flex items-center justify-center rounded-full">
                <img src={'/icons/youtube.png'} className="h-[15px] w-[15px]" />
              </a>
              <a target="_blank" href="#" className="bg-gradient-to-r from-[#777FF7] to-[#604AF5] h-[30px] w-[30px] px-2 py-0 flex items-center justify-center rounded-full">
                <img src={'/icons/twitter.png'} className="h-[15px] w-[15px]" />
              </a>
              <a target="_blank" href="#" className="bg-gradient-to-r from-[#777FF7] to-[#604AF5] h-[30px] w-[30px] px-2 py-0 flex items-center justify-center rounded-full">
                <img src={'/icons/instagram.png'} className="h-[15px] w-[15px]" />
              </a>
            </div>
          </div>

        </div>



      </footer> : <div></div>}

      <GenericModal
        isOpen={signInModalIsOpen}
        onRequestClose={() => setSignupModalIsOpen(false)}
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

      >
        <Login type={type} loginTrigger={checkIsLoggedIn} onclose={() => setSignupModalIsOpen(false)}></Login>
      </GenericModal>
      {/* <div className="z-[9999]">
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
      </div> */}
    </div>
  )
}

export default Footer


