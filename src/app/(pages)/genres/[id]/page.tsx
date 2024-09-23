import { Metadata, ResolvingMetadata } from "next";
import GenresDetails from "../components/GenresDetails";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}


export async function generateMetadata<T>(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params
  return {
    title: id.replace(/-/g, ' '),
  }
}
const ArtistDetailsContainer = ({ params: { id } }: any) => {

  return (
    <div>
      <GenresDetails id={id}></GenresDetails>
    </div>
  );
}

export default ArtistDetailsContainer;