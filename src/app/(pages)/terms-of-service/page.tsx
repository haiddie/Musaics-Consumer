
import { Metadata } from "next";
import Title from "@/app/components/Title";
import HeroImage from "@/app/components/HeroImage";
import TermsOfService from "@/app/components/TermsOfService/TermsOfService";


export const metadata: Metadata = {
    title: "Terms of Services",
    description: "Tappi Terms of Services.",
    openGraph: {
        images: '/images/artist.jpg'
    }
}

const Page = async () => {

    return (
        <div>
            <TermsOfService />
        </div>
    )
}

export default Page;