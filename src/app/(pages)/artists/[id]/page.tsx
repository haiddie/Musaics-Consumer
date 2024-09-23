import { Metadata, ResolvingMetadata } from "next";
import ArtistDetails from "../components/ArtistDetails";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// #region SEO

const getArtistData = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer?artist=true&slug=${id}`,
      { next: { revalidate: 3600 } }
    )
    const artistRes = await res.json();
    return artistRes?.data[0];
  } catch (error) {
    console.log('ERROR: >>>', error);
  }
}


export async function generateMetadata<T>(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params
  const data = await getArtistData(id);
  const { display_picture_url, name } = data;
  const previousImages = (await parent).openGraph?.images || []
  return {
    title: name,
    openGraph: {
      images: [display_picture_url, ...previousImages],
    },
  }
}

// #endregion

const ArtistDetailsContainer = ({ params: { id } }: any) => {

  return (
    <div>
      <ArtistDetails></ArtistDetails>
    </div>
  );
}

export default ArtistDetailsContainer;