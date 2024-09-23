'use client'


import { TrendingArtistsData, IArtist } from '@/app/data/artists';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { IAritstRes, IArtistData } from '../models';

interface Props {
  query: string
}

const TrendingArtists = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [artists, setArtists] = useState<IArtistData[]>([]);

  // #region FUNCTION

  const getData = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer?artist=true&sort_by=clicks&sort_order=DESC`,
        { next: { revalidate: 3600 } }
      )

      const artistRes: IAritstRes = await res.json();
      setArtists(artistRes.data);
    } catch (error) {
      console.log('ERROR: >>>', error);
    }
  }, []);

  // #endregion

  // #region LIFECYCLE

  useEffect(() => {
    if (isLoading) getData().then(() => setIsLoading(false))
  }, [])

  // #endregion

  const LoadingSkeleton = () => {
    return (
      <div className="h-[450px] w-full flex flex-col gap-4">
        {Array(5).fill(0).map((artist, index) => (
          <div key={index} className="animate-pulse grid grid-cols-5 gap-x-4 items-center justify-between">
            <div className="col-span-1 h-[28px] w-[48.4px]  rounded-lg bg-gray-700"></div>
            <div className="col-span-2 h-[28px] w-[112.8px] rounded-lg bg-gray-700"></div>
            <div className="col-span-2 h-[75px] w-[75px]  flex items-center justify-center rounded-full bg-gray-700">
              <svg className="w-5 h-5  text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {isLoading ? <LoadingSkeleton /> :
        <>
          {artists && artists.map((artist: IArtistData, index: number) => {
            return (
              <a href={`/artists/${artist.slug}`} key={index} className="hidden lg:grid grid-cols-5 gap-x-4 items-center justify-between">
                <div className={`col-span-1 font-abril ${index === 0 ? 'text-3xl text-primary-100' : 'text-xl text-gray-300'}`}>#{index + 1}</div>
                <div className={`col-span-2 font-cabin text-xl ${index === 0 ? ' text-primary-100 font-bold' : 'text-gray-300'}`}>{artist.name}</div>
                <Image height={75} width={75} style={{ objectFit: 'cover' }} src={artist.display_picture_url} alt={artist.name} className={`col-span-2 border-2 p-1 h-[75px] w-[75px] object-cover rounded-full ${index === 0 ? 'border-primary-100' : 'border-gray-300'}`} />
              </a>
            )
          })}
          <div className='flex lg:hidden gap-x-6 items-center'>
            {artists && artists.map((artist: IArtistData, index: number) => {
              return (
                <a href={`/artists/${artist.slug}`} key={index} className="w-[150px] flex flex-col items-center gap-y-2">
                  <div className='relative'>
                    <Image height={150} width={150} style={{ objectFit: 'cover' }} src={artist.display_picture_url} alt={artist.name} className={`col-span-2 border-2 p-1 h-[150px] w-[150px] object-cover rounded-full ${index === 0 ? 'border-primary-100' : 'border-gray-300'}`} />
                    <div className={`absolute top-0 right-[8px] border-2 rounded-full h-[35px] w-[35px] flex items-center justify-center col-span-1 font-abril ${index === 0 ? 'text-xl border-primary-100 text-gray-300 bg-primary-100' : 'text-lg text-primary-100 border-gray-100 bg-gray-100'}`}>#{index + 1}</div>
                  </div>
                  <div className={`col-span-2 font-cabin text-xl ${index === 0 ? ' text-primary-100 font-bold' : 'text-gray-300'}`}>{artist.name}</div>
                </a>
              )
            })}
          </div>
        </>
      }
    </>
  )
}

export default TrendingArtists;