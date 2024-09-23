import HeroImage from "@/app/components/HeroImage";
import MusaicsListing from "../../components/MusaicsListing/MusaicsListing";
import ArtistNews from "../../components/News/News";
import { Metadata } from "next";
import Genreslisting from "@/app/components/genres/genres";


export const metadata: Metadata = {
    title: "Genres",
    description: "Harmony in every note",
    openGraph: {
        images: "/images/banner.png"
    }
}

const Homepage = () => {

    return (
        <div className="font-barlow">
            <HeroImage title="GENRES" description="HARMONY IN EVERY NOTE" image="/images/banner.png" />

            <div className="px-6">
                <MusaicsListing query="?article=true&type=content"></MusaicsListing>
                {/* query="?top_genre=true" */}
                <Genreslisting query="?genre=true&size=50"></Genreslisting>
                <ArtistNews query="?article=true&type=articles"></ArtistNews>
                {/* {topGenres?.map((item: any) => {
                            return (
                                // <div className={`rounded-lg h-[200px] w-[200px] relative`}>
                                //     <img className={`absolute rounded-full h-[200px] w-[200px] object-cover transition-all duration-300 ease-in-out`} src={item?.artists[0]?.display_picture_url} />
                                //     <div className="relative z-10 top-0 rounded-full h-[200px] w-[200px] bg-gradient-to-b from-transparent to-black"></div>
                                //     <div className={`z-10 font-RohnRounded-Bold absolute left-1/2 bottom-10 -translate-x-1/2 whitespace-nowrap text-[1.5rem] transition-all duration-300 ease-in-out`}>{item?.name}</div>
                                // </div>
                                
                            )
                        })} */}
            </div>
        </div>
    )
}

export default Homepage;