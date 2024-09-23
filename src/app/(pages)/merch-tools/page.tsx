
import { Metadata } from "next";
import Title from "@/app/components/Title";
import HeroImage from "@/app/components/HeroImage";

import MerchTool from "@/app/components/MerchTool/MerchTool";


export const metadata: Metadata = {
  title: "Merch Tools",
  description: "Tappi Terms of Services.",
  openGraph: {
    images: '/images/merch-tools-banner.jpg'
  }
}

const Page = async () => {

  return (
    <div className="w-[100%]">
      <MerchTool />
    </div>
  )
}

export default Page;