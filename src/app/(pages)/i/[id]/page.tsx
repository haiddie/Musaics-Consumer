
import { Metadata, ResolvingMetadata } from "next";
import MainContainer from "./main";
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata<T>(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  // Attempt to fetch the data


  const title = 'Tappi'




  return {
    title: title,

  };
}

const ArtistDetailsContainer = ({ params: { id } }: Props) => {

  return (
    <div>
      {id ? (
        <MainContainer params={{
          id: id
        }} searchParams={{}} />
      ) : (
        <div className="flex min-h-[550px] justify-center items-center">No Tappi Card Found!</div>
      )}
    </div>
  );
}

export default ArtistDetailsContainer;
