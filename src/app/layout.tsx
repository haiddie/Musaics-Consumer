'use client';
import '@/styles/globals.css';
import Header from './components/Header';
import CookiePolicy from './(pages)/cookie-policy';
import Footer from './components/Footer';
import { Kanit, Poppins, Montserrat, Cabin, Abril_Fatface, Varela_Round, Barlow, Inter } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import GoogleAnalytics from './components/GoogleAnalytics';
import { usePathname } from 'next/navigation';
const kanit = Kanit({
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-kanit',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-montserrat',
});

const cabin = Cabin({
  subsets: ['latin'],
  weight: ["400", "500", "600", "700"],
  variable: '--font-cabin',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-barlow',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-inter',
});

const varelaRound = Varela_Round({
  subsets: ['latin'],
  weight: ["400"],
  variable: '--font-varelaRound'
});

const abrilFatface = Abril_Fatface({
  subsets: ['latin'],
  weight: ["400"],
  variable: '--font-abrilFatface'
})
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showheader, setShowHeader] = useState<boolean>(false);
  useEffect(() => {
    console.log('pathname', pathname)
    if (pathname.includes('muzicard-prototype') || pathname.includes('/i/') || pathname.includes('/release') || pathname.includes('scanned-releases')) {
      setShowHeader(false)
    }
    else {
      setShowHeader(true)
    }
  }, [pathname])
  return (
    <html lang="en" className={`dark ${poppins.variable} ${cabin.variable} ${varelaRound.variable} ${abrilFatface.variable}`}>
      <head>
        <link rel="icon" href="/icons/favicon.svg" sizes="any" />
        <link rel="stylesheet" href="sweetalert2.min.css" />
        {/*  */}

      </head>
      <GoogleAnalytics />
      <body className=''>
        <div className='flex flex-col bg-black text-white'>
          {showheader
            && <Header />
          }

          <main>
            {children}
            {showheader && <CookiePolicy />}

          </main>
          {showheader && <Footer />}
        </div>
      </body>
    </html>
  );
}
