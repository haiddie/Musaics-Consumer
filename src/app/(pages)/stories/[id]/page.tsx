import MusaicDetails from "../components/parent/parent";
import { Metadata, ResolvingMetadata } from 'next';


type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

// #region SEO

const getMusaicsData = async (id: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_HOST_URL}/api/consumer?article=true&slug=${id}`,
            { next: { revalidate: 3600 } }
        )
        const albumsRes = await res.json();

        return albumsRes?.data?.content[0];
    } catch (error) {
        console.log('ERROR: >>>', error);
    }
}

export async function generateMetadata<T>(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = params;

    // Attempt to fetch the data
    const data = await getMusaicsData(id);

    // Check if data is valid
    if (!data) {
        console.error(`No data found for id: ${id}`);
        return {
            title: 'Default Title',
            openGraph: {
                images: [],
            },
        };
    }

    const { image, title } = data;

    // Handle case where image or title might be undefined
    if (!image || !title) {
        console.error(`Invalid data format for id: ${id}`);
        return {
            title: title || 'Default Title',
            openGraph: {
                images: [],
            },
        };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: title,
        openGraph: {
            images: [image, ...previousImages],
        },
    };
}

// #endregion 

const ContainerMusaicDetail = ({ params: { id } }: any) => {
    return (
        <div>
            <MusaicDetails></MusaicDetails>
        </div>
    )
}

export default ContainerMusaicDetail;
