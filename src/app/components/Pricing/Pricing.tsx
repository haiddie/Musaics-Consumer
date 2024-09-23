"use client";

import LogoSlider from "@/app/components/LogoSlider";
import PricingTable from "@/app/components/PricingTable";

interface FeatureCategory {
    category: string;
    data: {
        name: string;
        column1: string;
        column2: string;
        column3: string;
    }[];
}
const Pricing = () => {
    const logoArr = [
        {
            img: "/images/logo1.png",
        },
        {
            img: "/images/logo2.png",
        },
        {
            img: "/images/logo3.png",
        },
        {
            img: "/images/logo4.png",
        },
        {
            img: "/images/logo5.png",
        },
    ];

    const plansArr: any[] = [
        {
            name: "Basic Plan",
            price: "Free",
            desc: "Lorem ipsum dolor sit amet",
        },
        {
            name: "Gold",
            price: "$29",
            desc: "Lorem ipsum dolor sit amet",
        },
        {
            name: "Enterprise",
            price: "$49",
            desc: "Lorem ipsum dolor sit amet",
        },
    ];

    const featureCategory: any[] = [
        {
            category: "Feature Category",
            data: [
                {
                    name: "Feature text goes here",
                    column1: "<p>10</p>",
                    column2: "<p>25</p>",
                    column3: "<p>Unlimited</p>",
                },
                {
                    name: "Feature text goes here",
                    column1: '<img src="/icons/verify.png" />',
                    column2: "",
                    column3: '<img src="/icons/verify.png" />',
                },
                {
                    name: "Feature text goes here",
                    column1: '<img src="/icons/verify.png" />',
                    column2: '<img src="/icons/verify.png" />',
                    column3: "",
                },
                {
                    name: "Feature text goes here",
                    column1: '<img src="/icons/verify.png" />',
                    column2: '<img src="/icons/verify.png" />',
                    column3: '<img src="/icons/verify.png" />',
                },
            ],
        },
        {
            category: "Feature Category",
            data: [
                {
                    name: "Feature text goes here",
                    column1: "<p>10</p>",
                    column2: "<p>25</p>",
                    column3: "<p>Unlimited</p>",
                },
                {
                    name: "Feature text goes here",
                    column1: '<img src="/icons/verify.png" />',
                    column2: "",
                    column3: '<img src="/icons/verify.png" />',
                },
                {
                    name: "Feature text goes here",
                    column1: '<img src="/icons/verify.png" />',
                    column2: '<img src="/icons/verify.png" />',
                    column3: "",
                },
                {
                    name: "Feature text goes here",
                    column1: '<img src="/icons/verify.png" />',
                    column2: '<img src="/icons/verify.png" />',
                    column3: '<img src="/icons/verify.png" />',
                },
            ],
        },
        {
            category: "Feature Category",
            data: [
                {
                    name: "Feature text goes here",
                    column1: "<p>10</p>",
                    column2: "<p>25</p>",
                    column3: "<p>Unlimited</p>",
                },
                {
                    name: "Feature text goes here",
                    column1: '<img src="/icons/verify.png" />',
                    column2: "",
                    column3: '<img src="/icons/verify.png" />',
                },
                {
                    name: "Feature text goes here",
                    column1: '<img src="/icons/verify.png" />',
                    column2: '<img src="/icons/verify.png" />',
                    column3: "",
                },
                {
                    name: "Feature text goes here",
                    column1: '<img src="/icons/verify.png" />',
                    column2: '<img src="/icons/verify.png" />',
                    column3: '<img src="/icons/verify.png" />',
                },
            ],
        },
    ];

    return (
        <>
            <div className="pt-[60px] !w-[100%] bg-[#060B28]">
                <div className="flex flex-col items-center justify-center w-full   p-4 sm:p-6 lg:p-[130px] gap-2">
                    <PricingTable data={featureCategory} plansArr={plansArr} />
                </div>


            </div>
        </>
    );
};

export default Pricing;