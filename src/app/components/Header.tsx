'use client';
import Link from "next/link";
import { Container } from "./Container";
import Navigation from "./Navigation";
import { Popover } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./Button";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import GenericModal from '../components/modal/modal';
import Login from "./login/login";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getCreatorToken, getUserData, isUserRegisteredInDb, registerUserInDb } from "../Util/login";
import Profile from "./profile/profile";
import "react-toastify/dist/ReactToastify.css";
import { refreshFirebaseToken } from "../Util/firebase";
import Dropdown from "./Dropdown";

import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';





function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#ffffff"
      />
    </svg>
  )
}

function ChevronUpIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#ffffff"
      />
    </svg>
  )
}

export function Logomark(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 40C8.954 40 0 31.046 0 20S8.954 0 20 0s20 8.954 20 20-8.954 20-20 20ZM4 20c0 7.264 5.163 13.321 12.02 14.704C17.642 35.03 19 33.657 19 32V8c0-1.657-1.357-3.031-2.98-2.704C9.162 6.68 4 12.736 4 20Z"
      />
    </svg>
  )
}

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 106 40" aria-hidden="true" {...props}>
      <Logomark width="40" height="40" className="fill-cyan-500" />
      <path
        className="fill-gray-900"
        d="M53.1477 26V14.3636H57.5114C58.4053 14.3636 59.1553 14.5303 59.7614 14.8636C60.3712 15.197 60.8314 15.6553 61.142 16.2386C61.4564 16.8182 61.6136 17.4773 61.6136 18.2159C61.6136 18.9621 61.4564 19.625 61.142 20.2045C60.8277 20.7841 60.3636 21.2405 59.75 21.5739C59.1364 21.9034 58.3807 22.0682 57.483 22.0682H54.5909V20.3352H57.1989C57.7216 20.3352 58.1496 20.2443 58.483 20.0625C58.8163 19.8807 59.0625 19.6307 59.2216 19.3125C59.3845 18.9943 59.4659 18.6288 59.4659 18.2159C59.4659 17.803 59.3845 17.4394 59.2216 17.125C59.0625 16.8106 58.8144 16.5663 58.4773 16.392C58.1439 16.214 57.714 16.125 57.1875 16.125H55.2557V26H53.1477ZM67.0355 26.1705C66.1832 26.1705 65.4446 25.983 64.8196 25.608C64.1946 25.233 63.7098 24.7083 63.3651 24.0341C63.0241 23.3598 62.8537 22.572 62.8537 21.6705C62.8537 20.7689 63.0241 19.9792 63.3651 19.3011C63.7098 18.6231 64.1946 18.0966 64.8196 17.7216C65.4446 17.3466 66.1832 17.1591 67.0355 17.1591C67.8878 17.1591 68.6264 17.3466 69.2514 17.7216C69.8764 18.0966 70.3594 18.6231 70.7003 19.3011C71.045 19.9792 71.2173 20.7689 71.2173 21.6705C71.2173 22.572 71.045 23.3598 70.7003 24.0341C70.3594 24.7083 69.8764 25.233 69.2514 25.608C68.6264 25.983 67.8878 26.1705 67.0355 26.1705ZM67.0469 24.5227C67.509 24.5227 67.8954 24.3958 68.206 24.142C68.5166 23.8845 68.7476 23.5398 68.8991 23.108C69.0545 22.6761 69.1321 22.1951 69.1321 21.6648C69.1321 21.1307 69.0545 20.6477 68.8991 20.2159C68.7476 19.7803 68.5166 19.4337 68.206 19.1761C67.8954 18.9186 67.509 18.7898 67.0469 18.7898C66.5734 18.7898 66.1795 18.9186 65.8651 19.1761C65.5545 19.4337 65.3215 19.7803 65.1662 20.2159C65.0147 20.6477 64.9389 21.1307 64.9389 21.6648C64.9389 22.1951 65.0147 22.6761 65.1662 23.108C65.3215 23.5398 65.5545 23.8845 65.8651 24.142C66.1795 24.3958 66.5734 24.5227 67.0469 24.5227ZM76.7699 26.1705C75.8987 26.1705 75.1506 25.9792 74.5256 25.5966C73.9044 25.214 73.4252 24.6856 73.0881 24.0114C72.7547 23.3333 72.5881 22.553 72.5881 21.6705C72.5881 20.7841 72.7585 20.0019 73.0994 19.3239C73.4403 18.642 73.9214 18.1117 74.5426 17.733C75.1676 17.3504 75.9063 17.1591 76.7585 17.1591C77.4669 17.1591 78.0938 17.2898 78.6392 17.5511C79.1884 17.8087 79.6259 18.1742 79.9517 18.6477C80.2775 19.1174 80.4631 19.6667 80.5085 20.2955H78.5426C78.4631 19.875 78.2737 19.5246 77.9744 19.2443C77.679 18.9602 77.2831 18.8182 76.7869 18.8182C76.3665 18.8182 75.9972 18.9318 75.679 19.1591C75.3608 19.3826 75.1127 19.7045 74.9347 20.125C74.7604 20.5455 74.6733 21.0492 74.6733 21.6364C74.6733 22.2311 74.7604 22.7424 74.9347 23.1705C75.1089 23.5947 75.3532 23.9223 75.6676 24.1534C75.9858 24.3807 76.3589 24.4943 76.7869 24.4943C77.09 24.4943 77.3608 24.4375 77.5994 24.3239C77.8419 24.2064 78.0445 24.0379 78.2074 23.8182C78.3703 23.5985 78.482 23.3314 78.5426 23.017H80.5085C80.4593 23.6345 80.2775 24.1818 79.9631 24.6591C79.6487 25.1326 79.2206 25.5038 78.679 25.7727C78.1373 26.0379 77.5009 26.1705 76.7699 26.1705ZM84.0724 23.2614L84.0668 20.7784H84.3963L87.5327 17.2727H89.9361L86.0781 21.5682H85.652L84.0724 23.2614ZM82.1974 26V14.3636H84.2543V26H82.1974ZM87.6747 26L84.8338 22.0284L86.2202 20.5795L90.1349 26H87.6747ZM94.8111 26.1705C93.9361 26.1705 93.1804 25.9886 92.544 25.625C91.9115 25.2576 91.4247 24.7386 91.0838 24.0682C90.7429 23.3939 90.5724 22.6004 90.5724 21.6875C90.5724 20.7898 90.7429 20.0019 91.0838 19.3239C91.4285 18.642 91.9096 18.1117 92.527 17.733C93.1444 17.3504 93.8698 17.1591 94.7031 17.1591C95.241 17.1591 95.7486 17.2462 96.2259 17.4205C96.7069 17.5909 97.1312 17.8561 97.4986 18.2159C97.8698 18.5758 98.1615 19.0341 98.3736 19.5909C98.5857 20.1439 98.6918 20.803 98.6918 21.5682V22.1989H91.5384V20.8125H96.7202C96.7164 20.4186 96.6312 20.0682 96.4645 19.7614C96.2978 19.4508 96.0649 19.2064 95.7656 19.0284C95.4702 18.8504 95.1255 18.7614 94.7315 18.7614C94.3111 18.7614 93.9418 18.8636 93.6236 19.0682C93.3054 19.2689 93.0573 19.5341 92.8793 19.8636C92.705 20.1894 92.616 20.5473 92.6122 20.9375V22.1477C92.6122 22.6553 92.705 23.0909 92.8906 23.4545C93.0762 23.8144 93.3357 24.0909 93.669 24.2841C94.0024 24.4735 94.3925 24.5682 94.8395 24.5682C95.1387 24.5682 95.4096 24.5265 95.652 24.4432C95.8944 24.3561 96.1046 24.2292 96.2827 24.0625C96.4607 23.8958 96.5952 23.6894 96.6861 23.4432L98.6065 23.6591C98.4853 24.1667 98.2543 24.6098 97.9134 24.9886C97.5762 25.3636 97.1444 25.6553 96.6179 25.8636C96.0914 26.0682 95.4891 26.1705 94.8111 26.1705ZM104.79 17.2727V18.8636H99.7727V17.2727H104.79ZM101.011 15.1818H103.068V23.375C103.068 23.6515 103.11 23.8636 103.193 24.0114C103.28 24.1553 103.394 24.2538 103.534 24.3068C103.674 24.3598 103.83 24.3864 104 24.3864C104.129 24.3864 104.246 24.3769 104.352 24.358C104.462 24.339 104.545 24.322 104.602 24.3068L104.949 25.9148C104.839 25.9527 104.682 25.9943 104.477 26.0398C104.277 26.0852 104.03 26.1117 103.739 26.1193C103.223 26.1345 102.759 26.0568 102.347 25.8864C101.934 25.7121 101.606 25.4432 101.364 25.0795C101.125 24.7159 101.008 24.2614 101.011 23.7159V15.1818Z"
      />
    </svg>
  )
}

function MobileNavLink(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Popover.Button<typeof Link>>,
    'as' | 'className'
  >,
) {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight text-white-700"
      {...props}
    />
  )
}

const Header = () => {

  const [showHeader, setShowHeader] = useState(true);
  const [y, setY] = useState(0);
  const [signInModalIsOpen, setSignupModalIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const [profileModalIsOpen, setProfileModalIsOpen] = useState(false);
  const [type, setType] = useState('');
  let userObject: any = {}
  const router: any = useRouter()
  // #region FUNCTIONS

  const handleNavigation = useCallback(
    (e: any) => {
      const window = e.currentTarget;
      if (y > window!.scrollY && !pathname.includes('muzicard-prototype') && !pathname.includes('/i/') && !pathname.includes('/release') && !pathname.includes('scanned-releases')) {
        setShowHeader(true)
      } else if (y < window!.scrollY && (window!.scrollY > 150)) {
        setShowHeader(false)
      }
      setY(window!.scrollY);



    }, [y, pathname]
  );






  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openSignupModal = (type: string) => {
    setType(type)
    setSignupModalIsOpen(true);
  };

  const openProfileModal = () => {
    setProfileModalIsOpen(true);
  };

  const notify = (message: string) => toast(message);


  const deleteProfileModal = async () => {
    setProfileModalIsOpen(false);
    clearLocalStorageData();
    notify('Profile deleted successfuly.');
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

            // const pathname = usePathname();
            // const currentUrl = `${window.location.origin}${pathname}`;
            window.location.reload()
            notify('User Logged in Successfuly!');
            // router.push(currentUrl)
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

  const logOut = async () => {
    notify('User Logged out successfuly!')

    const currentUrl = `${window.location.origin}${pathname}`;
    window.location.reload()
    clearLocalStorageData();
  }

  const clearLocalStorageData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('creatorToken');
    setIsLoggedIn(false)
    checkIsLoggedIn();
  }

  const navigateToCreatorProfile = () => {
    const token = localStorage.getItem('creatorToken');
    window.open(`${process.env.NEXT_PUBLIC_CONSOLE_URL}/dashboard?token=${token}`, '_blank');
  };


  const getRefreshtoken = async () => {
    let tken: any = await refreshFirebaseToken()


  }
  // #endregion


  // #region LIFEYCLE



  useEffect(() => {
    getRefreshtoken()
    if (pathname.includes('muzicard-prototype') || pathname.includes('/inter') || pathname.includes('/release') || pathname.includes('scanned-releases')) {
      setShowHeader(false)
    }
  }, [pathname]);

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

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



  const links = [
    { text: 'About Us', url: 'about-us' },
    { text: 'Music Fans', url: 'music-fans' },
    { text: 'Artists and Labels', url: 'merch-tools' },
    { text: "Pricing", url: "pricing" },
    { text: 'Help Center', url: '#' },
    { text: 'Contact Us', url: 'contact-us' },
    { text: 'Immersive Stories', url: 'musaics-archive' },
  ];



  const [query, setQuery] = useState('');




  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchVendors();
    }
  };


  const handleKeyPressMobile = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchVendorsMopile();
    }
  };


  const searchVendors = async () => {

    router.push(`/search?keyword=${query}`)
  }


  const searchVendorsMopile = async () => {

    window.location.href = `/search?keyword=${query}`

  }






  return (
    <div>
      {showHeader ? (
        <header className={`fixed top-0 left-0 z-50 w-full transition-transform duration-500 ease-out-circ `} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <nav className="">
            <Container className="relative z-50 flex justify-between py-5 font-cabin">
              <div className="relative z-10 flex items-center gap-16">
                <Link href="/" aria-label="Home">
                  <div className="flex items-end gap-x-3">
                    <Image height={150} width={150} className="max-h-[50px]" src="/icons/tappi-logo-color-white.svg" alt="Tappi" />
                  </div>
                </Link>
              </div>
              <div className="relative z-10 flex items-center gap-16">
                <div className="hidden xl:flex lg:gap-10">
                  <Navigation />

                  <Dropdown data={{ parentName: "Learn More", links: links }} />
                </div>

                <div className="hidden xl:flex items-center justify-center  rounded-lg">
                  <TextField
                    id="search-input"
                    className="w-full bg-gray-900 text-white py-0 rounded-lg"

                    placeholder="Search Here..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                      style: { color: 'white' },
                      endAdornment: (
                        <InputAdornment position="end" style={{ marginRight: 8 }}>
                          <SearchIcon
                            className={` ${query ? 'text-white cursor-pointer' : 'text-gray-500 cursor-default'}`}
                            onClick={() => {
                              if (query) {
                                searchVendors();
                              }
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">

                <div>
                  {!isLoading ? (
                    <div>
                      {isLoggedIn === false ? (
                        <div className="flex gap-x-2">
                          <Button onClick={() => { openSignupModal('login') }} variant="outline" className="hidden lg:block hover:bg-gray-800">
                            Login
                          </Button>
                          <Button onClick={() => { openSignupModal('signup') }} variant="outline" className="hidden lg:block hover:bg-gray-800">
                            Signup
                          </Button>
                        </div>
                      ) : (
                        <div className="hs-dropdown relative">
                          <button
                            id="hs-dropdown-default"
                            type="button"
                            className="hs-dropdown-toggle py-3 px-4 min-w-[130px] max-w-[130px] flex items-center gap-x-2 text-sm font-medium rounded-lg border disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-gray-700 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600 truncate"
                            onClick={toggleDropdown}
                          >
                            <span className="text-sm text-left font-medium rounded-lg basis-[80%]  disabled:opacity-50 disabled:pointer-events-none  text-white  focus:outline-none focus:ring-1 focus:ring-gray-600 truncate">
                              {userData?.username ? userData?.username : userData?.email}
                            </span>
                            <svg className={`w-4 h-4 transition-transform basis-[20%] duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </button>

                          <div
                            className={`absolute w-full top-full min-w-[130px] left-0 transition-opacity duration-200 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 hidden'}  shadow-md rounded-lg py-2 px-1 bg-gray-800 border border-gray-700 divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full`}
                            aria-labelledby="hs-dropdown-default"
                          >

                            <div onClick={openProfileModal} className="flex my-1 justify-between items-center gap-x-1 px-3 py-2 rounded-lg text-base   focus:outline-none  text-gray-400 hover:bg-gray-700 hover:text-gray-300 focus:bg-gray-700" >
                              Profile
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                              </svg>
                            </div>

                            {userData?.role[0] !== 'consumer' && <a onClick={navigateToCreatorProfile} className="flex my-1 items-center justify-between gap-x-1 px-3 py-2 rounded-lg text-base  focus:outline-none  text-gray-400 hover:bg-gray-700 hover:text-gray-300 focus:bg-gray-700" href="#">
                              Creator

                              <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                              </svg>
                            </a>}

                            <a onClick={() => logOut()} className="flex items-center justify-between gap-x-1 px-3 py-2 rounded-lg text-base  focus:outline-none  text-gray-400 hover:bg-gray-700 hover:text-gray-300 focus:bg-gray-700">
                              Logout
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center p-4">
                      <div className="flex justify-center">
                        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent  rounded-full text-blue-500" role="status" aria-label="loading"></div>
                      </div>
                    </div>
                  )}
                </div>




                <Popover className="xl:hidden">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 ui-not-focus-visible:outline-none"
                        aria-label="Toggle site navigation"
                      >
                        {({ open }) =>
                          open ? (
                            <ChevronUpIcon className="h-6 w-6" />
                          ) : (
                            <MenuIcon className="h-6 w-6" />
                          )
                        }
                      </Popover.Button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <>
                            <Popover.Overlay
                              static
                              as={motion.div}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="fixed inset-0 z-0 bg-gray-900/60 backdrop-blur"
                            />
                            <Popover.Panel
                              static
                              as={motion.div}
                              initial={{ opacity: 0, y: -32 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{
                                opacity: 0,
                                y: -32,
                                transition: { duration: 0.2 },
                              }}
                              className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-900 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
                            >
                              <div className="space-y-4 text-white">
                                <div className="flex items-center justify-start  rounded-lg">
                                  <TextField
                                    id="search-input"
                                    className="w-full max-w-[280px]  bg-white text-black py-0 rounded-lg"

                                    placeholder="Search Here..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyPress={handleKeyPressMobile}
                                    InputProps={{
                                      style: { color: 'black' },
                                      endAdornment: (
                                        <SearchIcon
                                          className="absolute right-2 cursor-pointer text-black"
                                          onClick={searchVendorsMopile}
                                        />
                                      )
                                    }}
                                  />
                                </div>
                                <MobileNavLink href="/genres">
                                  Genres
                                </MobileNavLink>
                                <MobileNavLink href="/artists">
                                  Artists
                                </MobileNavLink>
                                <MobileNavLink href="/cities">
                                  Cities
                                </MobileNavLink>
                                <div className="relative">

                                  <Dropdown data={{ parentName: "Learn More", links: links }} />

                                </div>
                              </div>
                              {!isLoggedIn && <div className="mt-8 flex flex-col gap-4">
                                <Button onClick={() => { openSignupModal('login') }} variant="outline">
                                  Login
                                </Button>
                                <Button onClick={() => { openSignupModal('signup') }} variant="outline" >
                                  Signup
                                </Button>
                              </div>}
                            </Popover.Panel>
                          </>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </Popover>
              </div>

            </Container>
          </nav>
        </header>
      ) : (<></>)}

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
        <Login type={type} openSignupModal={openSignupModal} loginTrigger={checkIsLoggedIn} onclose={() => setSignupModalIsOpen(false)}></Login>
      </GenericModal>

      <GenericModal
        isOpen={profileModalIsOpen}
        onRequestClose={() => setProfileModalIsOpen(false)}
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
        width="600"
        height="800"
      >
        <Profile className="z-[99999]" onUpdate={checkIsLoggedIn} onDelete={deleteProfileModal}
          onclose={(updated: boolean = false) => {
            setProfileModalIsOpen(false);
            if (updated === true) {
              notify('User updated Successfuly')
            }
          }} />
      </GenericModal>
      <div className="z-[9999]">
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
  )
}

export default Header;