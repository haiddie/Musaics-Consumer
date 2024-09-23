
import { Metadata } from "next";
import Title from "@/app/components/Title";
import HeroImage from "@/app/components/HeroImage";
import MusicFans from "@/app/components/MusicFans/MusicFans";




export const metadata: Metadata = {
    title: "Music Fans",
    description: "Music Fans",
    openGraph: {
        images: '/images/merch-tools-banner.jpg'
    }
}

const Page = async () => {

    return (
        <div className="w-[100%]">
            <MusicFans />
        </div>
    )
}

export default Page;