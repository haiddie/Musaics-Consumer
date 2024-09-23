
import Pricing from "@/app/components/Pricing/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing",
    description: "Tappi Pricing.",
    openGraph: {
        images: "/images/contact-us-banner.jpg",
    },
};

const Page = async () => {
    return (
        <div className="w-[100%]">
            <Pricing />
        </div>
    );
};

export default Page;