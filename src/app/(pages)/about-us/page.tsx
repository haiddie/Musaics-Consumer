
import AboutUs from "@/app/components/AboutUs/AboutUs";
import { Metadata } from "next";





export const metadata: Metadata = {
    title: "About Us",
    description: "Tappi About Us.",
    openGraph: {
        images: '/images/marketing-tools-banner.jpg'
    }
}

const Page = async () => {

    return (
        <div className="w-[100%]">
            <AboutUs />
        </div>
    )
}

export default Page;