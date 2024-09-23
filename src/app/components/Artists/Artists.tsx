'use client';
import Image from 'next/image';
import { IArtist, TrendingArtistsData } from "@/app/data/artists";
import { useState } from "react";

const Artists = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(-1);
  return (
    <>
      {TrendingArtistsData && TrendingArtistsData.map((artist: IArtist, index: number) => {
        return (
          <div key={index} onMouseEnter={() => setActiveCardIndex(index)} onMouseLeave={() => setActiveCardIndex(-1)} className={`flex flex-row rounded-lg h-[350px] w-[250px] relative`}>
            <Image className={`absolute rounded-lg h-[350px] w-[250px] object-cover transition-all duration-300 ease-in-out ${activeCardIndex === index ? 'scale-[0.98]' : 'scale-1'}`} src={artist.image} alt={artist.name} />
            <div className="relative text-center z-10 top-0 rounded-lg h-[350px] w-[250px] bg-gradient-to-b from-transparent to-black"></div>
            <div className={`absolute font-abril z-20 left-1/2 -translate-x-1/2 text-3xl whitespace-nowrap text-center transition-all duration-300 ease-in-out ${activeCardIndex === index ? 'bottom-40' : 'bottom-10'}`}>{artist.name}</div>
          </div>
        )
      })}
    </>
  )
} 
export default Artists;