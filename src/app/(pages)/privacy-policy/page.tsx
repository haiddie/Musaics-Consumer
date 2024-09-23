
import { Metadata } from "next";
import Title from "@/app/components/Title";
import HeroImage from "@/app/components/HeroImage";
import PrivacyPolicy from "@/app/components/PrivacyPolicy/PrivacyPolicy";


export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Tappi Privacy Policy.",
    openGraph: {
        images: '/images/artist.jpg'
    }
}

const Page = async () => {

    return (
        <div>
            <PrivacyPolicy />
        </div>
    )
}

export default Page;