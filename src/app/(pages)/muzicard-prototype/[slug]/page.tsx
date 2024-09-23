import { Metadata, ResolvingMetadata } from "next";
import MuzicardDetails from "../components/muzicardDetails";

type Props = {
  params: { slug: string, timestamp: string; }
  searchParams: { [key: string]: string | string[] | undefined }
}

// #region SEO

// const getMuziCardData = async (slug: string) => {
//   try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer?muzicard=true&slug=${slug}`,
//         { next: { revalidate: 3600 } }
//       )
//       const artistRes = await res.json();
//      return artistRes?.data[0];

//     } catch (error) {
//       console.log('ERROR: >>>', error);

//     }
// }


// export async function generateMetadata<T>(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const { slug } = params
//   const data = await getMuziCardData(slug);
//   const { display_picture_url, name } = data;
//   const previousImages = (await parent).openGraph?.images || []
//   return {
//     title: name,
//     openGraph: {
//       images: [display_picture_url, ...previousImages],
//     },
//   }
// }


// #endregion




const ArtistDetailsContainer = ({ params: { slug, timestamp } }: any) => {

  return (
    <div>
      <MuzicardDetails />
    </div>
  );
}

export default ArtistDetailsContainer;