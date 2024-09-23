"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Scrollbar } from "swiper/modules";
import Image from "next/image";
import { IAritstRes, IArtistData } from "../models";
import "@/styles/globals.css";
import { useParams, useRouter } from "next/navigation";
import { renderSkeletons } from "@/app/Util/skeleton";
import SwiperButtons from "@/app/components/SwiperButtons/SwiperButtons";
import Title from "@/app/components/Title";

interface Props {
  orientation: "grid" | "scroll";
  query?: string;
  title: string;
}

const FeaturedArtists = (props: Props) => {
  const [activeCardIndex, setActiveCardIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState<IArtistData[]>([]);
  const params = useParams();
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(0);

  // #region FUNCTIONS

  const handleRouting = (route: string) => {
    router.push(route);
  };

  const LoadingSkeleton = () => {
    return (
      <div className="flex gap-x-10 items-center w-full mt-20">
        <div role="status" className="max-w-sm animate-pulse basis-[30%]">
          <div className="h-[350px] sm:h-[450px] w-full  flex items-center justify-center rounded-lg bg-gray-700">
            <svg
              className="w-10 h-10  text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        </div>
        <div className="h-full grid grid-cols-3 grid-rows-3 gap-4 basis-[70%]">
          {Array(9)
            .fill(0)
            .map((artist, index) => (
              <div
                key={index}
                role="status"
                className="animate-pulse flex flex-col xl:flex-row items-center gap-x-4"
              >
                <div className="h-[100px] w-[100px]  flex items-center justify-center rounded-full bg-gray-700">
                  <svg
                    className="w-5 h-5  text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="h-[28px] w-[119.34px]  rounded-lg bg-gray-700"></div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  // #endregion

  // #region LIFECYCLE

  useEffect(() => {
    getData();
  }, [props?.query]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // #endregion

  // #region API

  const getData = async () => {
    setIsLoading(true);
    try {
      let route = props.query
        ? props.query
        : "?artist=true&featured=true&sort_by=created_at&sort_order=DESC";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer${route}`,
        { next: { revalidate: 3600 } } // cache lifetime
      );
      const artistRes: IAritstRes = await res.json();
      setArtists(artistRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR: >>>", error);
      setIsLoading(false);
    }
  };

  // #endregion

  return (
    <>
      <style jsx>{`
        .parent {
          display: grid;
          grid-template-columns: 1fr; /* Single column layout for mobile */
          gap: 16px;
        }

        .featured-card {
          width: 100%;
          max-width:300px!important;
          /* Additional mobile-specific styles if needed */
        }

        .other-cards {
          display: grid;
          /* grid-template-columns: 1fr;  Single column layout for mobile */
          gap: 16px;
        }
        @media (min-width: 640px) {
          /* Tablet and larger screens */
          .parent {
            /* grid-template-columns: 1fr 2fr;  1 column for featured, 2 columns for other artists */
          }

          .other-cards {
            grid-template-columns: repeat(
              2,
              1fr
            );  Two columns for other artists on tablets */
          }
        }

        @media (min-width: 1024px) {
          /* Desktop screens */
          .parent {
            grid-template-columns: 1fr 2fr; /* Adjusted ratio if needed */
             grid-template-columns: 1.5fr repeat(2, 1fr) !important;
          }

          .other-cards {
            grid-template-columns: repeat(
              2,
              1fr
            ); /* Three columns for other artists on desktops */
          }
        }

        .div1 {
          grid-area: 1 / 1 / 4 / 2;
        }
        .div2 {
          grid-area: 1 / 2 / 2 / 3;
        }
        .div3 {
          grid-area: 2 / 2 / 3 / 3;
        }
        .div4 {
          grid-area: 3 / 2 / 4 / 3;
        }
        .div5 {
          grid-area: 4 / 1 / 5 / 2;
        }
        .div6 {
          grid-area: 4 / 2 / 5 / 3;
        }
        .div7 {
          grid-area: 5 / 1 / 6 / 2;
        }
        .div8 {
          grid-area: 5 / 2 / 6 / 3;
        }
        .div9 {
          grid-area: 6 / 1 / 7 / 2;
        }
        .div10 {
          grid-area: 6 / 2 / 7 / 3;
        }

        @media screen and (min-width: 420px) {
          .div1 {
            grid-area: 1 / 1 / 4 / 3;
          }
          .div2 {
            grid-area: 1 / 3 / 2 / 4;
          }
          .div3 {
            grid-area: 2 / 3 / 3 / 4;
          }
          .div4 {
            grid-area: 3 / 3 / 4 / 4;
          }
          .div5 {
            grid-area: 4 / 1 / 5 / 2;
          }
          .div6 {
            grid-area: 4 / 2 / 5 / 3;
          }
          .div7 {
            grid-area: 4 / 3 / 5 / 4;
          }
          .div8 {
            grid-area: 5 / 1 / 6 / 2;
          }
          .div9 {
            grid-area: 5 / 2 / 6 / 3;
          }
          .div10 {
            grid-area: 5 / 3 / 6 / 4;
          }
        }

        @media screen and (min-width: 540px) {
          .parent {
            display: grid;
            grid-template-columns: 1.5fr repeat(1, 1fr);
            grid-column-gap: 16px;
            grid-row-gap: 16px;
            width: 100%;
          }

          .div1 {
            grid-area: 1 / 1 / 4 / 2;
          }
          .div2 {
            grid-area: 1 / 2 / 2 / 3;
          }
          .div3 {
            grid-area: 1 / 3 / 2 / 4;
          }
          .div4 {
            grid-area: 2 / 2 / 3 / 3;
          }
          .div5 {
            grid-area: 2 / 3 / 3 / 4;
          }
          .div6 {
            grid-area: 3 / 2 / 4 / 3;
          }
          .div7 {
            grid-area: 3 / 3 / 4 / 4;
          }
          .div8 {
            grid-area: 4 / 1 / 5 / 2;
          }
          .div9 {
            grid-area: 4 / 2 / 5 / 3;
          }
          .div10 {
            grid-area: 4 / 3 / 5 / 4;
          }
        }

        @media screen and (min-width: 768px) {
          .parent {
            display: grid;
           grid-template-columns: 1.5fr repeat(1, 1fr);
            grid-column-gap: 16px;
            grid-row-gap: 16px;
            
            width: 100%;
          }

          .div1 {
            grid-area: 1 / 1 / 4 / 2;
          }
          .div2 {
            grid-area: 1 / 2 / 2 / 3;
          }
          .div3 {
            grid-area: 1 / 3 / 2 / 4;
          }
          .div4 {
            grid-area: 1 / 4 / 2 / 5;
          }
          .div5 {
            grid-area: 2 / 2 / 3 / 3;
          }
          .div6 {
            grid-area: 2 / 3 / 3 / 4;
          }
          .div7 {
            grid-area: 2 / 4 / 3 / 5;
          }
          .div8 {
            grid-area: 3 / 2 / 4 / 3;
          }
          .div9 {
            grid-area: 3 / 3 / 4 / 4;
          }
          .div10 {
            grid-area: 3 / 4 / 4 / 5;
          }
        }
      `}</style>
      {props.orientation === "scroll" ? (
        <div className="w-full">
          {artists && artists.length > 0 ? (
            <Swiper
              spaceBetween={30}
              slidesPerView={2.5}
              grabCursor={true}
              speed={1800}
              loop={true}
              className="!flex flex-col-reverse"
              modules={[Autoplay, Scrollbar, A11y]}
              scrollbar={{ draggable: true }}
              breakpoints={{
                320: {
                  slidesPerView: 1.5,
                },
                576: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
                1280: {
                  slidesPerView: 5,
                },
                1420: {
                  slidesPerView: 6,
                },
              }}
            >
              <div className="flex justify-between items-center">
                <Title title={props.title} className="flex-span-3" />
                <div className="border-t border-white w-full flex-span-6 mx-10"></div>
                <div className="flex-span-3">
                  <SwiperButtons></SwiperButtons>
                </div>
              </div>
              {artists &&
                artists.length > 0 &&
                artists.map((artist: any, index: number) => {
                  return (
                    <SwiperSlide key={index}>
                      <div
                        onMouseEnter={() => setActiveCardIndex(index)}
                        onMouseLeave={() => setActiveCardIndex(-1)}
                        className={`rounded-lg h-[450px] w-[250px] relative`}
                      >
                        {artist.display_picture_url ? (
                          <Image
                            fill
                            style={{ objectFit: "cover" }}
                            alt={artist.name}
                            className={`absolute rounded-lg object-cover transition-all duration-300 ease-in-out ${activeCardIndex === index
                              ? "scale-[0.98]"
                              : "scale-1"
                              }`}
                            src={artist.display_picture_url}
                          />
                        ) : (
                          <></>
                        )}
                        <div className="relative text-center z-10 top-0 rounded-lg h-[350px] sm:h-[450px] w-[250px] bg-gradient-to-b from-transparent to-black"></div>
                        <div
                          className={`absolute  font-abril z-20 left-1/2 -translate-x-1/2 text-3xl  text-center transition-all duration-300 ease-in-out ${activeCardIndex === index
                            ? "bottom-40"
                            : "bottom-10"
                            }`}
                        >
                          {artist.name}
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          ) : (
            <div className="flex gap-x-20 mt-3">
              {renderSkeletons(
                screenWidth < 520 ? 1 : screenWidth < 800 ? 3 : 6,
                "400"
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div>
              <Title title={props.title} />
              <div className="parent grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Side - Featured Card (index === 0) */}
                {artists && artists.length > 0 && (
                  <div className="featured-card col-span-1 lg:col-span-1">
                    <a href={`/artists/${artists[0].slug}`} className="w-full">
                      <div
                        onClick={() =>
                          handleRouting(`/artists/${artists[0].slug}`)
                        }
                        className="rounded-lg h-[350px] sm:h-[450px] w-full relative cursor-pointer"
                      >
                        {artists[0].display_picture_url && (
                          <Image
                            fill
                            style={{ objectFit: "cover" }}
                            alt={artists[0].name}
                            className="absolute rounded-lg object-cover transition-all duration-300 ease-in-out"
                            src={artists[0].display_picture_url}
                          />
                        )}
                        <div className="relative text-center z-10 top-0 rounded-lg h-[351px] sm:h-[450px] w-full bg-gradient-to-b from-transparent to-black"></div>
                        <div className="absolute font-abril z-20 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl bottom-10 whitespace-nowrap text-center transition-all duration-300 ease-in-out">
                          {artists[0].name}
                        </div>
                      </div>
                    </a>
                  </div>
                )}

                {/* Right Side - Other Cards (index > 0) */}
                <div className="other-cards col-span-1 lg:col-span-2 grid grid-cols-2 gap-4 lg:grid-cols-3 px-5">
                  {artists && artists.length > 1 ? (
                    artists.slice(1).map((artist, index) => (
                      <a
                        href={`/artists/${artist.slug}`}
                        key={index + 1}
                        className="artist-areaBox w-full inline-flex"
                      >
                        <div
                          onClick={() =>
                            handleRouting(`/artists/${artist.slug}`)
                          }
                          className="flex flex-col sm:flex-row xl:flex-row items-center gap-x-4 cursor-pointer"
                        >
                          {artist.display_picture_url && (
                            <Image
                              width={100}
                              height={100}
                              style={{ objectFit: "cover" }}
                              className="rounded-full h-[100px] w-[100px] max-w-[100px]"
                              alt={artist.name}
                              src={artist.display_picture_url}
                            />
                          )}
                          <span
                            style={{
                              // wordBreak: "break-word",
                              overflowWrap: "break-word",
                            }}
                            className="font-abril z-20 text-lg sm:text-xl"
                          >
                            {artist.name}
                          </span>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="text-2xl">No additional artists found!</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FeaturedArtists;
