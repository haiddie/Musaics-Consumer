import MusaicsListing from "../../../components/MusaicsListing/MusaicsListing";
import ArtistNews from "../../../components/News/News";
import FeaturedArtists from "../../artists/components/Featured";


const GenresDetails = ({ id }: any) => {
    return (
        <div className="font-cabin px-6 pt-32">

            <div className="text-6xl mb-4">
                {id.replace(/-/g, ' ')}
            </div>
            <MusaicsListing query={`?article=true&type=content&genre_slug=${id}`}></MusaicsListing>
            <div className="flex overflow-auto gap-x-6 xl:gap-x-10">
                <FeaturedArtists title="Top Artists" orientation="scroll" query={`?artist=true&sort_order=DESC&sort_by=created_at&genres_slug=${id}`} />
            </div>
            <ArtistNews query={`?article=true&type=articles&genre_slug=${id}`}></ArtistNews>
        </div>
    )
}

export default GenresDetails;