'use client';

const AlbumartLarge = ({ data, activeTab }: any) => {

    const convertUrl = (url: string) => {
        // Regex pattern to match URLs without http:// or https://
        const regex = /^((?!https?:\/\/).)*$/;
        let convertedUrl = "";
        // Check if inputUrl matches the pattern
        if (regex.test(url)) {
            // Add 'http://' to the input URL
            convertedUrl = "http://" + url;
        } else {
            // If inputUrl already starts with 'http://' or 'https://', keep it as it is
            convertedUrl = url;
        }
        return convertedUrl;
    }
    return (
        <div className="px-4">
            {(
                <div className='columns-1'>
                    {data?.main_content?.image.map((img: any, index: number) => (
                        <div key={index} >
                            <span className="hidden">{img.url}</span>
                            {activeTab === 'Album Art' && (<>
                                <img id={`image` + index}
                                    loading="lazy"
                                    className="  w-full mb-4 object-cover"
                                    src={img.url}
                                />
                            </>)}
                            {activeTab === 'Sponsors' && (
                                <a href={convertUrl(img.link)} target="_blank">
                                    <img id={`image` + index}
                                        loading="lazy"
                                        className="  w-full mb-4 object-cover"
                                        src={img.url}
                                    />

                                    <div
                                        className="text-white text-[14px] px-2"
                                        dangerouslySetInnerHTML={{ __html: img?.description }}
                                    />
                                </a>)}

                        </div>
                    ))}
                    {(data.main_content?.image.length === 1 && activeTab === 'Album Art') && <div className="text-xl">
                        {data?.main_content?.image[0]?.description}
                    </div>}
                </div>
            )}
        </div>
    )
}

export default AlbumartLarge;