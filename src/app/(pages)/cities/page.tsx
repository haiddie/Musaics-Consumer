import { Metadata, ResolvingMetadata } from "next";
import CitiesDetails from "./components/CitiesDetails";

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

// #region SEO

// const getCitiesData = async (id: string) => {
//     try {
//         const res = await fetch(
//             `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer?article=true&type=articles&slug=${id}`,
//             { next: { revalidate: 3600 } }
//         )
//         const newsRes = await res.json();
//         return newsRes?.data?.content[0];

//     } catch (error) {
//         console.log('ERROR: >>>', error);
//     }
// }

// export async function generateMetadata<T>(
//     { params }: Props,
//     parent: ResolvingMetadata
// ): Promise<Metadata> {
//     const { id } = params
//     const data = await getCitiesData(id);
//     const { image, title } = data;
//     const previousImages = (await parent).openGraph?.images || []
//     return {
//         title,
//         openGraph: {
//             images: [image, ...previousImages],
//         },
//     }
// }

// #endregion

const CitiesDetailContainer = ({ params: { id } }: any) => {

    return (
        <div>
            <CitiesDetails />
        </div>
    )
}

export default CitiesDetailContainer;