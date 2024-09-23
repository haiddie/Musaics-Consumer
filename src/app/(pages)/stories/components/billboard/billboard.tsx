'use client';



const Billboard = ({ widget }: any) => {
  return (
    <div className="grid grid-cols-12 w-full px-2">
      <div className="col-span-12">
        {widget?.is_title && widget.title && widget.title !== "null" && (<span className="text-white text-center capitalize text-xl font-bold  px-[10px] py-[10px]'" style={{ overflowWrap: 'anywhere' }} dangerouslySetInnerHTML={{ __html: widget.title }} />)}
      </div>
      <div className="col-span-12 w-full bg-primary-base text-white p-2 rounded-t-lg rounded-b-r-lg bg-primary-100">

        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <p className="text-white font-semibold text-[14px] break-word py-2 px-2">
              {widget?.main_content?.selected_country} Top 10
            </p>
          </div>
        </div>
      </div>
      <div className="border-primary-100 border-b-2 pb-1 w-full col-span-12 rounded-b-lg">
        <div className="grid grid-cols-12">
          {widget?.main_content?.bill_board_data_arr.map((billboard: any, index: number) => (
            <div key={index} className="col-span-12 border-primary-100  border-t-2 border-x-2 py-2">
              <div className="flex items-center justify-start">
                <div className="bg-primary-base text-white justify-center !h-[80px] !w-[60px] flex items-center">
                  <p className="text-white font-semibold text-[15px] break-word">{index + 1}</p>
                </div>

                <img src={billboard.image} className="w-full !h-[80px] max-w-[70px] object-cover" />
                <div className="ml-6 sm:ml-12">
                  <span className="text-sm sm:text-[20px] font-semibold !py-0">
                    {(billboard.track_name.length > 20
                      ? billboard.track_name.slice(0, 20) + '...'
                      : billboard.track_name)}
                  </span>
                  <br />
                  (
                  <span className=" text-[15px] !py-0 mr-[4px]">
                    {billboard.artist}
                  </span>
                  )
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12">
        {
          widget.is_text &&
          <div
            className={`text-md text-base`}
            dangerouslySetInnerHTML={{ __html: widget?.display_text }}
          />
        }
      </div>
    </div>
  )
}

export default Billboard;