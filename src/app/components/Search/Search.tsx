import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, Divider, List, ListItem, CircularProgress } from '@mui/material';
import { artistsIndex, chartsIndex, citiesIndex, genresIndex, musaicsIndex, newsIndex } from '../../Util/Algolis';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { getInitials } from '@/app/Util/errorImage';
const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams()
  const [searchInProgress, setSearchInProgress] = useState(false);
  const search = searchParams.get('keyword')

  useEffect(() => {
    // if (router.query && router.query.keyword) {
    //   const { keyword } = router.query;
    if (search) {
      setQuery(search);
      searchVendors(search)
    }

  }, [search]);

  const searchVendors = (keyword: string) => {
    setSearchInProgress(true);
    Promise.all([
      musaicsIndex.search(keyword),
      artistsIndex.search(keyword),
      newsIndex.search(keyword),
      chartsIndex.search(keyword),
      citiesIndex.search(keyword),
      genresIndex.search(keyword)
    ]).then(([musaicsResult, artistsResult, newsResult, chartsResult, citiesResult, genresResult]) => {
      // Combine search results
      const results: any[] = [
        { title: 'Musaics', items: musaicsResult.hits },
        { title: 'Artists', items: artistsResult.hits },
        { title: 'Genres', items: genresResult.hits },
        { title: 'News', items: newsResult.hits },
        { title: 'Charts', items: chartsResult.hits },
        { title: 'Cities', items: citiesResult.hits },

      ];



      setSearchResults(results);
      let el: any = document.getElementById('search-input');
      setAnchorEl(el);
      setSearchInProgress(false);
    }).catch(error => {
      console.log(error);
      setSearchInProgress(false);
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchVendors(query);
    }
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };


  const formatNumber = (num: any) => {
    // Check if the number is greater than or equal to 1000
    if (num) {
      if (num >= 1000) {
        // Divide the number by 1000 and round it to 1 decimal place
        const formattedNum = (num / 1000).toFixed(1);
        // Append 'k' to the formatted number
        return formattedNum + 'k';
      } else {
        // If the number is less than 1000, return it as is
        return num.toString();
      }
    }
    else {
      return 'N/A'
    }

  }

  return (
    <div className="flex flex-col items-center h-full mt-[150px]">
      <div className="relative w-full px-4 sm:px-6 xl:px-[130px] ">
        <TextField
          id="search-input"
          className="w-full max-w-md bg-gray-900 text-white py-0 rounded-lg"
          placeholder="Search Here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            style: { color: 'white' },
            endAdornment: (
              <SearchIcon
                className={` ${query ? 'text-white cursor-pointer' : 'text-gray-500 cursor-default'}`}
                onClick={() => {
                  if (query) {
                    searchVendors(query);
                  }
                }}
              />
            )
          }}
        />
      </div>
      <div className=" grid grid-cols-12 w-full px-4 sm:px-6 xl:px-[130px] lg:gap-x-8">
        {searchResults.map((result, index) => (
          <div key={index} className="col-span-12 w-full py-4 border-b-[0.2px] border-b-gray-200">

            <div className="text-[24px] md:text-[36px] leading-[32px] md:leading-[48px] font-bold">{result.title}</div>

            {result.items.length > 0 ? (
              <div>
                {result.title === 'Musaics' && (
                  <List className='grid grid-cols-12 gap-3'>
                    {result.items.map((item: any) => (
                      <ListItem key={item.objectID} className="col-span-12 md:col-span-4 text-sm px-0">
                        <a href={`/stories/${item?.slug}`} className="relative cursor-pointer w-full max-w-[300px]">

                          {item?.image ? <Image
                            className="rounded-lg z-0 min-h-[520px] max-h-[520px] object-cover"
                            width={350}
                            height={450}
                            src={item?.image}
                            alt='Musaic'

                          /> :
                            <div className='h-[520px]  w-auto bg-gray-400 rounded-lg text-8xl text-gray-700 items-center flex justify-center'>
                              {getInitials(item?.title)}
                            </div>
                          }
                          <div className="absolute top-0 left-0 z-5 w-full h-full bg-gradient-to-b from-transparent to-black rounded-lg">
                          </div>
                          <div className="absolute bottom-[40px] left-[10px] w-full z-10 overflow-hidden px-3">
                            <div dangerouslySetInnerHTML={{ __html: item?.title }} className='text-lg line-clamp-3 text-white mb-6'></div>
                            <div className='flex flex-col gap-y-1 mt-2'>
                              {/* <span className='text-white text-xs mb-2'>{new Date(item?.created_at).toLocaleString()}</span> */}
                            </div>
                          </div>
                        </a>
                      </ListItem>
                    ))}
                  </List>

                )}


                {result.title === 'Artists' && (

                  <List className='grid grid-cols-12 gap-y-2'>
                    {result.items.map((item: any) => (
                      <ListItem key={item.objectID} className="col-span-4 text-sm px-0">
                        <a href={`/artists/${item?.slug}`} className='flex justify-start items-center gap-x-2'>
                          {
                            item.display_picture_url ?
                              (
                                <Image
                                  src={item.display_picture_url}
                                  width={50}
                                  height={50}
                                  onError={(e: any) => {
                                    e.target.src = '/images/artist.jpg';
                                  }}
                                  alt="Artist"
                                  className="h-[50px] w-[50px] rounded-full object-cover"
                                />
                              ) : (
                                <Image
                                  src='/images/artist.jpg'
                                  width={50}
                                  height={50}
                                  alt="Artist"
                                  className="h-[50px] w-[50px] rounded-full object-cover"
                                />
                              )
                          }

                          <p className='text-white hidden md:block text-[15px] leading-[24px] font-semibold'>{item.name}</p>
                        </a>
                      </ListItem>
                    ))}
                  </List>
                )}

                {result.title === "Genres" && (
                  <div className='flex flex-wrap items-center gap-4 my-3'>
                    {result.items.map((item: any) => (
                      <a href={`/genres/${item.slug}`} key={index} className={`text-xl rounded-full cursor-pointer hover:bg-primary-200 hover:text-white transition-colors ease-in-out duration-250 border border-primary-100 px-7 py-2 capitalize `} dangerouslySetInnerHTML={{ __html: item.name }}></a>
                    ))}
                  </div>
                )

                }


                {result.title === 'News' && (
                  <List className='grid grid-cols-12 gap-3'>
                    {result.items.map((item: any) => (
                      <ListItem key={item.objectID} className="col-span-12 md:col-span-4 text-sm px-0">
                        <a href={`/news/${item?.slug}`} className='flex justify-start items-center gap-x-2'>
                          {item.image ? (
                            <Image
                              src={item.image}
                              width={70}
                              height={100}
                              onError={(e: any) => {
                                e.target.src = '/images/artist.jpg';
                              }}
                              alt={result.title}
                              className="h-[100px] w-[70px] object-cover"
                            />
                          ) : (
                            <div className='bg-gray-200 h-[100px] w-[70px] min-w-[70px]'></div>
                          )}

                          <p className='text-white text-[15px] leading-[24px] font-semibold'>{item.title}</p>
                        </a>
                      </ListItem>
                    ))}
                  </List>
                )
                }


                {result.title === 'Charts' && (
                  <List className='grid grid-cols-12 gap-3'>
                    {result.items.map((item: any) => (
                      <ListItem key={item.objectID} className="col-span-12 md:col-span-4 text-sm px-0">
                        <div className='flex justify-start items-center gap-x-2'>
                          {item.image ? (
                            <Image
                              src={item.image}
                              width={70}
                              height={100}
                              onError={(e: any) => {
                                e.target.src = '/images/artist.jpg';
                              }}
                              alt={result.title}
                              className="h-[100px] w-[70px] object-cover"
                            />
                          ) : (
                            <div className='bg-gray-200 h-[100px] w-[70px] min-w-[70px]'></div>
                          )}

                          <p className='text-white text-[15px] leading-[24px] font-semibold'>{item.title}</p>
                        </div>
                      </ListItem>
                    ))}
                  </List>
                )
                }

                {result.title === 'Cities' && (
                  <List className='grid grid-cols-12 gap-3'>
                    {result.items.map((item: any) => (
                      <ListItem key={item.objectID} className="col-span-12 md:col-span-4 text-sm px-0">
                        <a href={`/cities?name=${item?.name}&id=${item.objectID}`} className='flex justify-start items-center gap-x-2'>
                          {item.image ? (
                            <Image
                              src={item.image}
                              width={70}
                              height={70}
                              onError={(e: any) => {
                                e.target.src = '/images/city-placeholder.png';
                              }}
                              alt={result.title}
                              className="h-[100px] w-[100px] rounded-full object-cover"
                            />
                          ) : (
                            <Image
                              src={`/images/city-placeholder.png`}
                              width={70}
                              height={70}
                              onError={(e: any) => {
                                e.target.src = '/images/city-placeholder.png';
                              }}
                              alt={result.title}
                              className="h-[100px] w-[100px] rounded-full object-cover"
                            />
                          )}

                          <div className='flex flex-col justify-start gap-y-2'>
                            <p className='text-white text-[24px] leading-[32px] font-semibold'>{item.name}</p>
                            <p className='text-white text-[14px] leading-[18px] font-semibold'>State: {item.state}</p>
                            <p className='text-white text-[14px] leading-[18px] font-semibold'>Population: {formatNumber(item.population)}</p>
                            <p className='text-white text-[14px] leading-[18px] font-semibold'>Artists: {item.artists ? item.artists : 'N/A'}</p>
                            {/* {item.artists.split(',').map((artist: any, index: number) => (
                              <div key={index} className=" mr-2 rounded-full flex justify-center text-white font-[600]">{artist.trim()}</div>
                            ))} */}

                          </div>


                        </a>
                      </ListItem>
                    ))}
                  </List>
                )
                }
              </div>

            ) : (
              <List>
                <ListItem key={index + 0} className="text-sm px-0">No Results Found!</ListItem>
              </List>
            )}
          </div>
        ))}


        {searchInProgress && <div className='flex w-full justify-center items-center'><CircularProgress className="mt-4" /></div>}
      </div>
    </div>
  );
};

export default SearchComponent;
