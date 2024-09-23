
interface faq {
    question: string;
    answer: string
}

interface Props {
    data: faq[];

}
const FAQS: React.FC<Props> = ({ data }) => {

    return (
        <>
            <div className=" font-inter">
                <p className="text-white font-[700] text-[2.5rem] md:text-[2.5rem] lg:text-[3rem]  w-full leading-[57.6px] !font-inter   py-[64px]  text-left uppercase">Faqs</p>

                {data.map((faq, i) => (
                    <div key={i}>



                        <div className="grid grid-cols-12 gap-2 py-6  border-b-white border-t-[0.3px]" >
                            <div className="col-span-12 lg:col-span-6">

                                <div
                                    className="text-[18px] font-[700] font-inter "
                                    dangerouslySetInnerHTML={{ __html: faq.question }}
                                />
                            </div>
                            <div className="col-span-12 lg:col-span-6">
                                <div
                                    className="text-[18px] font-[400] font-inter "
                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                />

                            </div>
                        </div>

                    </div>
                ))}
            </div>

            <div className="py-16  w-full">
                <h1 className="text-[32px] font-[700] leading-[2]">Still have questions?</h1>
                <p className="text-[18px] font-[400] leading-[1.5]">Visit our Help Center</p>
                <a href="/help-center" target="_self" type="button" className="bg-transparent border-[0.3px] border-white cursor-pointer text-[16px] px-[24px] py-[12px] my-2 min-w-[80px] rounded-md">
                    Help Center
                </a>
            </div>
        </>
    )
}

export default FAQS;