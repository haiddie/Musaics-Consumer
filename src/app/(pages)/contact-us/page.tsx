

import ContactUs from "@/app/components/ContactUs/ContactUs";
import { Metadata } from "next";





export const metadata: Metadata = {
    title: "Contact Us",
    description: "Tappi Contact Us.",
    openGraph: {
        images: '/images/contact-us-banner.jpg'
    }
}

const Page = async () => {

    return (
        <div className="w-[100%]">
            <ContactUs />
        </div>
    )
}

export default Page;