'use client'
// import { Metadata } from "next";
import HeroImage from "@/app/components/HeroImage";
import FeaturedArtists from "./(pages)/artists/components/Featured";
import MusaicsListing from "./components/MusaicsListing/MusaicsListing";
import ArtistNews from "./components/News/News";
import Genreslisting from "./components/genres/genres";
import CookiePolicy from "./(pages)/cookie-policy";
import { useEffect, useState } from "react";
import { refreshFirebaseToken } from "./Util/firebase";
import { getCreatorToken } from "./Util/login";



// export const metadata: Metadata = {
//   title: "Home | Musaics",
//   description: "Where music meets AI",
//   openGraph: {
//     images: "/images/banner.png"
//   }
// }

const Homepage = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const getRefreshtoken = async () => {
    let tken: any = await refreshFirebaseToken();
    setToken(tken);
    localStorage.setItem("token", tken);
    const creatorToken: any = await getCreatorToken(tken);
    localStorage.setItem("creatorToken", creatorToken?.data);
    getUserData(tken);
  };

  const getUserData = async (token: any) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_LOGIN_URL}?profile=true`;
      const headers = new Headers({
        Authorization: `Bearer ${token}`,
      });

      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData && responseData.data[0]) {
        localStorage.setItem("userInfo", JSON.stringify(responseData.data[0]));
        setUserData(responseData.data[0]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_info = localStorage.getItem("userInfo");
      if (user_info) {
        const parsedUserData = JSON.parse(user_info);
        setUserData(parsedUserData);
        getRefreshtoken();
      }
    }
  }, []);
  return (
    <div >
      <HeroImage subtitle="Welcome to Tappi" title="Where Every Note Tells A Story, And Every Story Brings Us Closer." tab="home"
        description="Discover Tappi, where artists and fans connect through the stories behind the music. Dive into a world of shared journeys and intimate musical experiences. Join our community, support the artists you admire, and explore the profound impact of music on our lives. Together, we're redefining the music experience." image="/images/banner.png" />

      <div className="px-6">
        <MusaicsListing query="?article=true&type=content&is_editor_pick=true&status=published"></MusaicsListing>
        <FeaturedArtists orientation="grid" title="Featured Artists" />
        <ArtistNews query="?article=true&type=articles"></ArtistNews>
        <Genreslisting query="?genre=true&size=50"></Genreslisting>
        {/* <div>
          <Title title="Trending Artists" />
          <div className="flex overflow-auto gap-x-10">
            <Artists />
          </div>
        </div> */}

        {/* <div >
          <Title title="Top Genres" />

          <div className="flex overflow-auto gap-x-10">
            <div className={`rounded-lg h-[200px] w-[200px] relative`}>
              <img className={`absolute rounded-full h-[200px] w-[200px] object-cover transition-all duration-300 ease-in-out`} src="https://w0.peakpx.com/wallpaper/437/438/HD-wallpaper-rap-hip-hop-music-people.jpg" />
              <div className="relative z-10 top-0 rounded-full h-[200px] w-[200px] bg-gradient-to-b from-transparent to-black"></div>
              <div className={`z-10 font-RohnRounded-Bold absolute left-1/2 bottom-10 -translate-x-1/2 whitespace-nowrap text-[2rem] transition-all duration-300 ease-in-out`}>Rap</div>
            </div>

            <div className={`rounded-lg h-[200px] w-[200px] relative`}>
              <img className={`absolute rounded-full h-[200px] w-[200px] object-cover transition-all duration-300 ease-in-out`} src="https://i.pinimg.com/736x/b1/63/49/b163494c8f4ccd2d94436578e45afc73.jpg" />
              <div className="relative z-10 top-0 rounded-full h-[200px] w-[200px] bg-gradient-to-b from-transparent to-black"></div>
              <div className={`z-10 font-RohnRounded-Bold absolute left-1/2 bottom-10 -translate-x-1/2 whitespace-nowrap text-[2rem] transition-all duration-300 ease-in-out`}>Pop</div>
            </div>

            <div className={`rounded-lg h-[200px] w-[200px] relative`}>
              <img className={`absolute rounded-full h-[200px] w-[200px] object-cover transition-all duration-300 ease-in-out`} src="https://w0.peakpx.com/wallpaper/272/664/HD-wallpaper-old-school-rappers-hip-hop-old-school-rappers.jpg" />
              <div className="relative z-10 top-0 rounded-full h-[200px] w-[200px] bg-gradient-to-b from-transparent to-black"></div>
              <div className={`z-10 font-RohnRounded-Bold absolute left-1/2 bottom-10 -translate-x-1/2 whitespace-nowrap text-[2rem] transition-all duration-300 ease-in-out`}>Hip Hop</div>
            </div>

            <div className={`rounded-lg h-[200px] w-[200px] relative`}>
              <img className={`absolute rounded-full h-[200px] w-[200px] object-cover transition-all duration-300 ease-in-out`} src="https://i.pinimg.com/736x/dc/fe/21/dcfe21b59fff1d83d779066a61757fd6.jpg" />
              <div className="relative z-10 top-0 rounded-full h-[200px] w-[200px] bg-gradient-to-b from-transparent to-black"></div>
              <div className={`z-10 font-RohnRounded-Bold absolute left-1/2 bottom-10 -translate-x-1/2 whitespace-nowrap text-[2rem] transition-all duration-300 ease-in-out`}>Metal</div>
            </div>

            <div className={`rounded-lg h-[200px] w-[200px] relative`}>
              <img className={`absolute rounded-full h-[200px] w-[200px] object-cover transition-all duration-300 ease-in-out`} src="https://miro.medium.com/v2/resize:fit:1400/1*nWUQWzkJYSSXYtsseLkc1A.jpeg" />
              <div className="relative z-10 top-0 rounded-full h-[200px] w-[200px] bg-gradient-to-b from-transparent to-black"></div>
              <div className={`z-10 font-RohnRounded-Bold absolute left-1/2 bottom-10 -translate-x-1/2 whitespace-nowrap text-[2rem] transition-all duration-300 ease-in-out`}>Rock</div>
            </div>

            <div className={`rounded-lg h-[200px] w-[200px] relative`}>
              <img className={`absolute rounded-full h-[200px] w-[200px] object-cover transition-all duration-300 ease-in-out`} src="https://img1.wallspic.com/previews/4/2/4/1/5/151424/151424-man_in_red_jacket_wearing_blue_goggles-360x780.jpg" />
              <div className="relative z-10 top-0 rounded-full h-[200px] w-[200px] bg-gradient-to-b from-transparent to-black"></div>
              <div className={`z-10 font-RohnRounded-Bold absolute left-1/2 bottom-10 -translate-x-1/2 whitespace-nowrap text-[2rem] transition-all duration-300 ease-in-out`}>Trap</div>
            </div>

            <div className={`rounded-lg h-[200px] w-[200px] relative`}>
              <img className={`absolute rounded-full h-[200px] w-[200px] object-cover transition-all duration-300 ease-in-out`} src="https://i0.wp.com/olumuse.org/wp-content/uploads/2021/10/BC57CE0A-8C65-406D-A8E7-EE09205C7E0B.jpeg?fit=1012%2C601&ssl=1" />
              <div className="relative z-10 top-0 rounded-full h-[200px] w-[200px] bg-gradient-to-b from-transparent to-black"></div>
              <div className={`z-10 font-RohnRounded-Bold absolute left-1/2 bottom-10 -translate-x-1/2 whitespace-nowrap text-[2rem] transition-all duration-300 ease-in-out`}>Country</div>
            </div>

          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Homepage;