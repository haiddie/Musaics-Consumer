'use client'

// pages/cookie-policy.js

import { useState, useEffect } from 'react';
import RejectCookiesDialog from '../components/CookiePolicy/RejectCookiesDialog';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
// import Layout from '../components/Layout';

const CookiePolicy = () => {
  const [accepted, setAccepted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [open, setOpen] = useState(false)
  const pathname = usePathname();
  useEffect(() => {
    // Check if the user has previously accepted the cookie policy
    const cookieAccepted = localStorage.getItem('cookieAccepted') || '';
    const domain = typeof window !== 'undefined' ? window.location.hostname : '';
    const path = typeof window !== 'undefined' ? window.location.pathname : '';

    // Check if the path includes the specific segments
    const pathConditions = ['/i/', '/release/', '/scanned-releases/', '/muzicard-prototype/'].some(segment =>
      path.includes(segment)
    );

    if (cookieAccepted || domain === 'app.tappi.cards' || pathConditions) {
      setAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setAccepted(true);
    setOpen(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieAccepted', 'false');
    setAccepted(true);
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(true)
    }, 1000);
  }, [])


  if (pathname.includes('/muzicard-prototype')) {
    return null;
  }

  return (
    <div className={`${accepted === true ? 'hidden' : 'fixed bottom-0 z-[10001]'} bg-primary-100 p-4 transition-all duration-500
        ${!accepted && showAnimation ? 'translate-y-0' : 'translate-y-[600px]'}`}
    >
      <h1 className='text-xl font-bold pb-2'>Cookie Policy</h1>
      <p className='pb-2'>
        We use cookies on our website to improve functionality and enhance
        your user experience. By using our website, you agree to the use of
        cookies in accordance with our <a href="/privacy-policy">Privacy Policy</a>.
      </p>
      <p className='pb-2'>
        Cookies are small files that are stored on your computer or mobile
        device when you visit a website. They allow the website to remember
        your actions and preferences (such as login, language, font size, and
        other display preferences) over a period of time, so you don’t have
        to keep re-entering them whenever you come back to the site or browse
        from one page to another.
      </p>
      <p>
        You can control and/or delete cookies as you wish. For more
        information, see <a href="http://www.aboutcookies.org/">aboutcookies.org</a>.
      </p>
      <button className='w-full text-gray-800 hover:bg-gray-100 bg-white sm:w-auto mt-4 mr-1 rounded-xl text-base leading-4 text-center  py-4 px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ' onClick={handleAccept}>Accept</button>
      <button className='w-full text-gray-800 hover:bg-gray-100 bg-white sm:w-auto mt-4  rounded-xl text-base leading-4 text-center  py-4 px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ' onClick={() => setOpen(true)}>Reject</button>
      <RejectCookiesDialog open={open} setOpen={setOpen} handleAccept={handleAccept} handleReject={handleReject} />
    </div>
  );
};

export default CookiePolicy;
