
import { Metadata, ResolvingMetadata } from "next";
import MuzicardDetails from "../components/muzicardDetails";

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




  // const router: any = useRouter();
  // const pathname = usePathname()

  // useEffect(() => {
  //   // Replace the current state with the same URL, effectively clearing history
  //   window.history.replaceState(null, '', window.location.href);
  // }, [pathname]);


  return (


    <div>
      {id ? (
        <MuzicardDetails id={id} />
      ) : (
        <div className="flex min-h-[550px] justify-center items-center">No Tappi Card Found!</div>
      )}

    </div>
  );
}

export default ArtistDetailsContainer;
