'use client';
import ImageSlider from "@/app/components/ImageSlider";


const ImageGallery = ({ data }: any) => {
  console.log('data from image block', data);
  return (

    <div className="">
      {data?.main_content?.type === 'gallery' && (
        <>
          {(
            <>
              <div className={data.main_content?.image?.length === 1 ? 'col-12' : 'columns-3'}>
                {data?.main_content?.image?.map((img: any, index: number) => (
                  <div key={index} className={`${img.description && data?.main_content?.image.showCaptions ? 'bg-red-100' : ''}  relative group rounded-lg`}>
                    <img
                      loading="lazy"
                      className=" rounded-md w-full  object-cover"
                      src={img.url}
                    />

                    {img.description && data?.main_content?.image.showCaptions && (
                      <div
                        style={{
                          textShadow: '2px 2px 4px #000000',
                          borderBottomRightRadius: '8px',
                          borderBottomLeftRadius: '8px',
                        }}
                        className="p-2 opacity-0 leading-3 group-hover:opacity-60 duration-300 absolute left-0 bottom-0 right-0 z-10 flex justify-center items-end text-[8px] bg-gray-700 text-white font-semibold"
                      >
                        <span dangerouslySetInnerHTML={{ __html: img.description }} />
                      </div>
                    )}

                  </div>
                ))}

              </div>
              {data.main_content?.image?.length > 0 && data.is_text &&
                <div className="col-span-12 my-2">

                  <div
                    className={`text-md text-base `}
                    dangerouslySetInnerHTML={{ __html: data?.display_text }}
                  />

                </div>}
            </>
          )}
        </>
      )}
      {data?.main_content?.type === 'slider' && (
        <div className="w-full grid grid-cols-12  h-full max-w-[550px]">
          <div className="col-span-12">
            <ImageSlider data={data} />
          </div>
          {<div className="col-span-12 my-2">
            {data.main_content?.image?.length > 0 && data.is_text &&
              <div className="flex items-center justify-start">
                <p
                  className={`text-md text-base`}
                  dangerouslySetInnerHTML={{ __html: data?.display_text }}
                />
              </div>

            }
          </div>}
        </div>
      )}

    </div>
  )
}

export default ImageGallery;