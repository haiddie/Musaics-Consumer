'use client'
import { useCallback, useEffect, useState } from "react";
import Title from "../Title";
import { IGenreData, IGenreRes } from "@/app/(pages)/artists/models";
import { renderSkeletons } from "@/app/Util/skeleton";


const Genreslisting = (query: any) => {


  const [genres, setGenres] = useState<IGenreData[]>([]);
  const [screenWidth, setScreenWidth] = useState(0);


  // #region FUNCTIONS
  const getGenres = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer${query?.query}`,
        { next: { revalidate: 3600 } }
      )

      res.json().then((genreRes: IGenreRes) => { setGenres(genreRes.data); });
    } catch (error) {
      console.log('ERROR: >>>', error);
    }
  }, [query?.query]);

  // #endregion 


  // #region LIFYCYCLES
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
      setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    getGenres();
  }, [])

  // #endregion 


  return (
    <div className="mb-10">
      {genres?.length > 0 ? <div>
        <Title title="Genres" />
        <div className='flex flex-wrap items-center gap-4'>
          {genres && genres.map((genre, index) => (
            <a href={`/genres/${genre.slug}`} key={index} className={`text-xl rounded-full cursor-pointer hover:bg-primary-200 hover:text-white transition-colors ease-in-out duration-250 border border-primary-100 px-7 py-2 capitalize `} dangerouslySetInnerHTML={{ __html: genre.name }}></a>
          ))}
        </div>
      </div> :
        <div className="w-full">
          <div className="flex gap-x-4 mt-3">
            {renderSkeletons(screenWidth < 520 ? 3 : 10, '40', 'full')}
          </div>
          <div className="flex gap-x-4 mt-3">
            {renderSkeletons(screenWidth < 520 ? 3 : 10, '40', 'full')}
          </div>
        </div>
      }
    </div>
  )

}

export default Genreslisting;