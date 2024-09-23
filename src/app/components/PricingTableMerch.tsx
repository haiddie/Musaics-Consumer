import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  category: string;
  data: {
    name: string;
    column1: string;
    column2: string;
    column3: string;
  }[];
}

interface Props {
  data: Category[];
  plansArr: any[];
}

const PricingTableMerch: React.FC<Props> = ({ data, plansArr }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptions, SetSubscriptions] = useState<any>([]);
  const pathname = usePathname();
  const getSubscriptions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOGIN_URL}?subscription=true&products=true`,
        { next: { revalidate: 3600 } }
      );
      const artistRes = await res.json();
      console.log("response ", artistRes.data);
      SetSubscriptions(artistRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR: >>>", error);
      setIsLoading(false);
    }
  };
  const [plan, setPlan] = useState<string>("month");

  useEffect(() => {
    getSubscriptions();
  }, []);
  return (
    <>
      <p className="text-[16px] xl:text-[24px] font-[600]  font-inter pt-4 md:pt-0  leading-[24px] lg:leading-[36px] text-center">
        Simple
      </p>
      <h1 className="text-[32px] xl:text-[48px] font-[600] text-center leading-[38.4px] lg:leading-[57.6px] pb-4">
        {" "}
        Pricing plan
      </h1>
      <p className="text-[16px] xl:text-[18px] font-[400] text-center leading-[24px] lg:leading-[27px]">
        Our pricing plans are designed to grow with you, offering
        straightforward options to suit your needs.
      </p>
      <div className="border-[0.3px] border-violet-500 rounded-md mt-10 mb-16">
        <button
          type="button"
          onClick={() => setPlan("month")}
          className={`${plan === "month"
            ? "bg-gradient-to-r from-[#777FF7] to-[#604AF5] text-white p-2 min-w-[100px]"
            : "bg-primary-base text-white p-2 min-w-[100px]"
            }`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setPlan("year")}
          className={`${plan === "year"
            ? "bg-gradient-to-r from-[#777FF7] to-[#604AF5] text-white p-2 min-w-[100px]"
            : "bg-primary-base text-white p-2 min-w-[100px]"
            }`}
        >
          Yearly
        </button>
      </div>
      <div className="grid grid-cols-12  w-full">
        <div className={`col-span-12 sm:col-span-3`}>
          <div className="flex items-center  justify-start h-full">
            <div>
              <p
                className={`text-[16px] xl:text-[24px] leading-[1.5] font-[700] py-2 !text-left`}
              >
                Compare plans
              </p>
            </div>
          </div>
        </div>

        {plansArr.map((obj, index) => (
          <div className={`col-span-12 sm:col-span-3`} key={"plan" + index}>
            <div className="flex flex-col justify-center items-center md:border-r-[0.3px] md:border-white p-3">
              <p
                className={`text-[14px] leading-[1.5]  px-4 sm:px-6 lg:px-8 text-center`}
              >
                {obj.name}
              </p>
              <p
                className={`text-[40px] leading-[1] font-[700] py-2 text-center`}
              >
                {obj.price}
                <span className="capitalize text-[14px] font-[500]">
                  {" "}
                  / Per {plan}
                </span>
              </p>
              <p
                className={`text-[16px] leading-[1.5] font-[400] py-2 text-center`}
                dangerouslySetInnerHTML={{ __html: obj.desc }} />
              {pathname.includes('tools') ? (
                <a href="/pricing" target="_blank" className="w-full">
                  <button
                    className="bg-gradient-to-r from-[#6960F5] to-[#757BF6] w-full py-4 px-6 text-[14px] font-[700]"
                    type="button"
                  >
                    Learn more
                  </button>
                </a>
              ) : <a href="/pricing" target="_blank" className="w-full">
                <button
                  className="bg-gradient-to-r from-[#6960F5] to-[#757BF6] w-full py-4 px-6 text-[14px] font-[700]"
                  type="button"
                >
                  Get Started
                </button>
              </a>}

            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PricingTableMerch;
