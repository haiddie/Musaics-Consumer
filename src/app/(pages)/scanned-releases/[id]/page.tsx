"use client"


import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer'
type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const ArtistDetailsContainer = ({ params: { id } }: Props) => {

    const [ID, setID] = useState<string>("")
    const router = useRouter();
    const [deviceId, setDeviceId] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<any>(null)


    const NUMBER_OF_CARDS_TO_FETCH = 10

    const [offset, setOffset] = useState(NUMBER_OF_CARDS_TO_FETCH)

    const { ref, inView } = useInView()







    useEffect(() => {

        setID(id)


        if (ID) {
            fetchBookmarkReleases(1, 10, ID)


        }
    }, [ID])




    const fetchBookmarkReleases = async (offset: any, cards: any, id: any) => {
        setIsLoading(true);
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_MUSAICS_CONSUMER_URL}?scanned_v2=true&card_id=${id}&page=1&size=${cards}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                setIsLoading(false);
                throw new Error('Data not retrieved because device id is incorrect or no data!');
            } else {
                const data = await response.json();

                setData(data.data);
                setIsLoading(false);
                // window.location.href = `/muzicard-tappi/${data.data}`

                //router.replace('https://www.google.com/');



            }
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
    }


    const openTappiCard = (tappi_id: string) => {
        router.replace(`/i/${tappi_id}`);
    }



    const loadMoreScannedCards = async () => {

        const apiCards: any = await fetchBookmarkReleases(offset, NUMBER_OF_CARDS_TO_FETCH, ID)

        setData([...data, ...apiCards.data])
        setOffset(offset + NUMBER_OF_CARDS_TO_FETCH)
    }

    useEffect(() => {
        if (inView) {
            loadMoreScannedCards()
        }
    }, [inView])


    return (
        <div className="flex items-start justify-center pt-[100px] h-screen"> {/* Changed h-full to h-screen */}
            {isLoading ? (
                <div className="flex flex-col justify-center items-center p-4">
                    <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent  rounded-full text-blue-500" role="status" aria-label="loading"></div>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center p-4 gap-6"> {/* Removed min-h-[550px] */}
                    <p className="text-3xl">To save Scanned Release please bookmark this page. If you have already saved this bookmark please disregard this message.</p>
                    {data && data.length ? (
                        <div className="flex flex-col gap-y-4 justify-start items-start p-2 w-full max-w-[400px]"> {/* Changed flex to flex-col */}
                            {data.map((card: any) => (
                                <div onClick={() => { openTappiCard(card.card_id) }} key={card.card_id} className="flex gap-x-4 cursor-pointer justify-start items-start bg-gray-800 bg-opacity-70  rounded-xl w-full">
                                    <img src={card.image_url} className="h-[100px] w-[100px] object-cover rounded-xl" alt={card.title} /> {/* Changed alt to use card.title */}
                                    <h1 dangerouslySetInnerHTML={{ __html: card.title }} className="text-xl p-4 font-semibold font-inter" />
                                </div>
                            ))}
                            {/* <div ref={ref}>
                                Loading...
                            </div> */}
                            {/* <button onClick={loadMoreScannedCards}>Load more</button> */}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center">No Cards Scanned!</div>
                    )}
                </div>
            )}
        </div>
    );

}

export default ArtistDetailsContainer;
