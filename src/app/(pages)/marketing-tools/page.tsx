
import { Metadata } from "next";
import Title from "@/app/components/Title";
import HeroImage from "@/app/components/HeroImage";
import MarketingTool from "@/app/components/MarketingTool/MarketingTool";




export const metadata: Metadata = {
  title: "Marketing Tools",
  description: "Tappi Terms of Services.",
  openGraph: {
    images: '/images/marketing-tools-banner.jpg'
  }
}

const Page = async () => {

  return (
    <div className="w-full">
      <MarketingTool />
    </div>
  )
}

export default Page;