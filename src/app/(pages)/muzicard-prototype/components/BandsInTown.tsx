'use client';

const BandsInTown = ({ data }: any) => {
    const shows = data.sort(
        (a: any, b: any) =>
            new Date(b.published_date).getTime() -
            new Date(a.published_date).getTime()
    );

    data = shows;


    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${month}-${day}-${year}`;
    };

    return (
        <div>
            {shows && shows.length > 0 ? (
                shows.map((item: any, index: number) => (
                    <div key={index} className="my-3">
                        {item?.main_content?.bands_in_town || item?.main_content?.code_snippet ? (
                            <>
                                {item?.main_content?.code_snippet ?
                                    <iframe
                                        title="Embedded Widget"
                                        srcDoc={item?.main_content?.code_snippet}
                                        style={{ width: '100%', height: '500px', border: 'none' }}
                                    /> : <></>}
                            </>

                        ) : (
                            <div className="grid grid-cols-12 gap-y-2">
                                <div className="col-span-12 ">
                                    <div className="flex flex-col mx-2 gap-y-2 items-center justify-center border-gray-200 border-[0.2px] p-2 rounded-lg bg-[#0F172A]">
                                        {item.main_content.image_url && (
                                            <img
                                                src={`${item.main_content.image_url}`}
                                                className="h-[80px] w-[80px] object-cover rounded-md"
                                            />
                                        )}
                                        <p className="text-center">{formatDate(item?.main_content?.date_time)}</p>
                                        <div
                                            className={`text-center text-white font-semibold text-[18px]`}
                                            dangerouslySetInnerHTML={{ __html: item?.main_content?.name }}
                                        />
                                        <p className="text-center">{item?.main_content?.location}</p>
                                        {item?.main_content?.ticket_link && (
                                            <a href={item?.main_content?.ticket_link} target="_blank">
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 mx-auto text-black bg-white rounded-lg w-full max-w-[240px] font-semibold text-[15px]"
                                                >
                                                    Get Ticket
                                                </button>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="mt-2 text-base text-gray-500">No Shows Found!</div>
            )}
        </div>
    )
}

export default BandsInTown;