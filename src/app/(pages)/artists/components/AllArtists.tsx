"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IAritstRes, IArtistData, IGenreData, IGenreRes } from "../models";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/drawer";
import { Button } from "@/app/components/Button";
import Title from "@/app/components/Title";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { getInitials } from "@/app/Util/errorImage";

const AllArtists = () => {
  const size = 10;
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArtists, setTotalArtists] = useState(0);
  const [artists, setArtists] = useState<IArtistData[]>([]);
  const [isGenresLoading, setIsGenresLoading] = useState(false);
  const [genres, setGenres] = useState<IGenreData[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debounceFn = useCallback(_.debounce(handleDebounceFn, 1500), []);
  const router = useRouter();

  // #region FUNCTION

  function handleDebounceFn(inputValue: string) {
    getData(page, inputValue, selectedGenres.join(",")).then(() =>
      setIsLoading(false)
    );
  }

  const handleChange = (event: any) => {
    setSearchValue(event.target.value);
    debounceFn(event.target.value);
  };

  const getData = useCallback(
    async (page: number, keyword: string, genres: string) => {
      try {
        setIsLoading(true);
        const params: any = {
          artist: true,
          sort_by: "created_at",
          sort_order: "DESC",
          page,
        };

        if (keyword !== "") params["keyword"] = keyword;
        if (genres !== "") params["genres"] = genres;

        const queryString = new URLSearchParams(params).toString();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer?${queryString}`
        );

        const artistRes: IAritstRes = await res.json();
        setArtists(artistRes.data);
        setTotalArtists(+artistRes.totalRecords);
        setIsLoading(false);
      } catch (error) {
        console.log("ERROR: >>>", error);
        setIsLoading(false);
      }
    },
    []
  );

  const getGenres = useCallback(async () => {
    try {
      setIsGenresLoading(true);
      setIsFilterDrawerOpen(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer?genre=true&size=50`,
        { next: { revalidate: 3600 } }
      );

      res.json().then((genreRes: IGenreRes) => {
        setIsGenresLoading(false);
        setGenres(genreRes.data);
      });
    } catch (error) {
      console.log("ERROR: >>>", error);
      setIsGenresLoading(false);
    }
  }, []);

  const handleFilterSubmit = () => {
    setIsLoading(true);
    setIsFilterDrawerOpen(false);
    getData(page ? page : 1, searchValue, selectedGenres.join(",")).then(() =>
      setIsLoading(false)
    );
  };

  const handleRouting = (route: string) => {
    router.push(route);
  };

  // #endregion

  // #region LIFECYCLES

  useEffect(() => {
    setIsLoading(true);
    getData(page ? page : 1, searchValue, selectedGenres.join(",")).then(() =>
      setIsLoading(false)
    );
  }, [page]);

  // #endregion

  const LoadingSkeleton = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 +md:grid-cols-3 lg:grid-cols-3 +xl:grid-cols-4 2xl:grid-cols-5 gap-x-10 gap-y-4 justify-center items-center">
        {Array(10)
          .fill(0)
          .map((artist, index) => (
            <div
              key={index}
              role="status"
              className="max-w-sm animate-pulse h-[400px] w-[300px]"
            >
              <div className="h-[400px] w-[300px]  flex items-center justify-center rounded-lg bg-gray-700">
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
          ))}
      </div>
    );
  };

  const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
  });

  const Pagination = () => {
    return (
      <nav className="font-cabin flex flex-col xs:flex-row items-center justify-between border-t border-gray-200 gap-y-2 my-4 pt-4 px-4 sm:px-0">
        <div className="flex flex-1">
          Showing {page * size - 9}-
          {size * page < totalArtists ? page * size : totalArtists} of{" "}
          {totalArtists}
        </div>
        <div className="flex items-center justify-end gap-x-10 flex-1">
          <div className="flex">
            <button
              disabled={page === 1 || isLoading}
              onClick={() => setPage((prev) => prev - 1)}
              className="inline-flex items-center cursor-pointer disabled:cursor-not-allowed disabled:text-gray-600 border-t-2 border-transparent font-medium text-gray-200 hover:text-primary-100"
            >
              <ArrowLongLeftIcon className="mr-3 h-5 w-5" aria-hidden="true" />
              Previous
            </button>
          </div>
          <div className="text-gray-200 font-bold">{page}</div>
          <div className="flex justify-end">
            <button
              disabled={!(page * size < totalArtists) || isLoading}
              onClick={() => setPage((prev) => prev + 1)}
              className="inline-flex items-center cursor-pointer disabled:cursor-not-allowed disabled:text-gray-600 border-t-2 border-transparent font-medium text-gray-200 hover:text-primary-100"
            >
              Next
              <ArrowLongRightIcon
                className="ml-3 h-5 w-5 "
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </nav>
    );
  };

  const handleGenreClick = (index: number, id: string) => {
    const isAlreadySelected = selectedGenres.indexOf(id) === -1 ? false : true;
    const tempGenres = _.cloneDeep(selectedGenres);
    if (isAlreadySelected) {
      setSelectedGenres(tempGenres.filter((_id: string) => _id !== id));
    } else {
      setSelectedGenres([...tempGenres, id]);
    }
  };

  return (
    <div className="!font-cabin">
      <div className="flex items-center justify-between flex-col sm:flex-row pb-4 mb-4 sm:pb-0 sm:mb-0">
        <Title title="All Artists" />
        <div className="flex items-center gap-x-6">
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-[300px] border-b py-2 pl-12 bg-transparent text-gray-200 placeholder:text-gray-400 outline-none focus:ring-none sm:text-sm sm:leading-6"
              placeholder="Search"
              onChange={handleChange}
            />
          </div>
          <Drawer>
            <DrawerTrigger
              className="text-primary-100"
              onClick={() => getGenres()}
            >
              <div className="relative">
                <FunnelIcon className="h-6 w-6 hover:text-primary-200" />
                {selectedGenres.length > 0 && (
                  <div className="absolute -top-2 -right-2 text-white text-xs flex items-center justify-center">
                    {selectedGenres.length}
                  </div>
                )}
              </div>
            </DrawerTrigger>
            <DrawerContent className="font-cabin h-[450px]">
              <DrawerHeader>
                <DrawerTitle>Filter by Genres</DrawerTitle>
              </DrawerHeader>
              <div className="max-w-[1280px] mx-auto mt-8 max-h-[200px] overflow-auto">
                {isGenresLoading ? (
                  <div className="flex items-center gap-x-4">
                    <div
                      className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent  rounded-full text-primary-100"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                    Loading Genres...
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-4">
                    {genres &&
                      genres.map((genre, index) => (
                        <div
                          key={index}
                          onClick={() => handleGenreClick(index, genre.id)}
                          className={`rounded-full cursor-pointer hover:bg-primary-200 hover:text-white transition-colors ease-in-out duration-250 border border-primary-100 px-3 py-1 capitalize ${selectedGenres.includes(genre.id)
                              ? "bg-primary-100 text-white"
                              : "text-primary-100 bg-transparent"
                            }`}
                          dangerouslySetInnerHTML={{ __html: genre.name }}
                        ></div>
                      ))}
                  </div>
                )}
              </div>
              <DrawerFooter>
                {/* <Button>Submit</Button> */}
                <div className="flex items-center justify-center">
                  <DrawerTrigger>
                    <Button
                      onClick={() => handleFilterSubmit()}
                      className="w-fit px-10 mx-auto border border-primary-100 hover:bg-primary-100 hover:text-white"
                      variant="outline"
                    >
                      Submit
                    </Button>
                  </DrawerTrigger>
                  {selectedGenres.length > 0 && (
                    <Button
                      onClick={() => setSelectedGenres([])}
                      className="hover:text-red-400"
                    >
                      Clear Filter
                    </Button>
                  )}
                </div>
                <DrawerClose>
                  <Button
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="hover:text-red-400"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 +md:grid-cols-3 lg:grid-cols-3 +xl:grid-cols-4 2xl:grid-cols-5 gap-x-10 gap-y-4 justify-center items-center">
            {artists &&
              artists.length > 0 &&
              artists.map((artist, index) => (
                <div
                  onClick={() => handleRouting(`/artists/${artist.slug}`)}
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(-1)}
                  className={`rounded-lg mx-auto h-[400px] w-[300px] relative cursor-pointer`}
                >
                  {artist?.display_picture_url ? (
                    <Image
                      fill
                      style={{ objectFit: "cover" }}
                      alt={artist.name}
                      className={`absolute rounded-lg object-cover transition-all duration-300 ease-in-out`}
                      src={artist.display_picture_url}
                    />
                  ) : (
                    <div className="h-[400px] min-w-[300px] bg-gray-400 rounded-md text-8xl text-gray-700 items-center flex justify-center">
                      {getInitials(artist?.name)}
                    </div>
                  )}
                  <div className="absolute text-center z-10 top-0 rounded-lg h-[400px] w-[300px] bg-gradient-to-b from-transparent to-black"></div>
                  <div
                    className={`absolute font-abril z-20 left-1/2 -translate-x-1/2 text-2xl text-center transition-all duration-300 ease-in-out bottom-16`}
                  >
                    {artist.name}
                  </div>
                  <div
                    className={`absolute overflow-hidden bottom-0 w-full rounded-b-lg transition-all duration-500 bg-[rgba(0,0,0,0.7)] z-10 ease-in-out ${activeIndex === index
                        ? "top-[15%] h-[85%] opacity-100"
                        : "top-[100%] h-0 left-0 right-0 opacity-0"
                      }`}
                  >
                    <div className="text-white text-sm absolute overflow-hidden top-[16px] left-[16px]">
                      <div className="flex items-center gap-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                          />
                        </svg>
                        {numberFormatter.format(+artist.spotify_followers)}{" "}
                        followers
                      </div>
                      <div className="flex flex-col items-start gap-y-2 mt-4">
                        <div className="">Genres:</div>
                        <div className="flex flex-wrap items-center gap-2">
                          {artist.genres &&
                            artist.genres.map((genre, index) => (
                              <div
                                key={index}
                                className="rounded-full bg-primary-100 text-white px-3 py-1 capitalize"
                                dangerouslySetInnerHTML={{ __html: genre.name }}
                              ></div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
      <Pagination />
    </div>
  );
};

export default AllArtists;
