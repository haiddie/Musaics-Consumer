import FeaturedArtists from "./components/Featured";
import TrendingArtists from "./components/Trending";
import { Metadata } from "next";
import Title from "@/app/components/Title";
import HeroImage from "@/app/components/HeroImage";
import AllArtists from "./components/AllArtists";
import MusaicsListing from "@/app/components/MusaicsListing/MusaicsListing";
import ArtistNews from "@/app/components/News/News";


export const metadata: Metadata = {
  title: "Artists",
  description: "Empowering Bands & Artists",
  openGraph: {
    images: "/images/banner.png"
  }
}

const Page = async () => {

  return (
    <div>
      <HeroImage title="Artists" description="Empowering Bands and Artists" image="/images/banner.png" />
      <div className="px-6 flex flex-col gap-y-10">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-10">
          <div className="col-span-1 lg:col-span-3">
            <div className="flex overflow-auto gap-x-6 xl:gap-x-10">
              <FeaturedArtists title="Featured Artists" orientation="grid" />
            </div>
          </div>
          <div className="col-span-1">
            <Title title="Trending Artists" />
            <div className="flex lg:flex-col lg:max-h-[450px] max-w-[calc(100vw-32px)] lg:max-w-full overflow-x-auto gap-4">
              <TrendingArtists />
            </div>
          </div>
        </div>
        <MusaicsListing query="?article=true&type=content"></MusaicsListing>
        <div>
          <ArtistNews query="?article=true&type=articles" />
        </div>
        <div>
          <AllArtists />
        </div>
      </div>
    </div>
  )
}

export default Page;