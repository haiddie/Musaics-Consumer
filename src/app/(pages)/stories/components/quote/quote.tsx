'use client';



const Quote = ({ data }: any) => {
  return (
    <div className=" pt-[50px]  w-full relative">
      <div className="flex flex-col items-center">
        {data?.is_title && data.title && data.title !== "null" && (<span className="text-white text-center capitalize text-xl font-bold  px-[10px] pt-[20px]'" style={{ overflowWrap: 'anywhere' }} dangerouslySetInnerHTML={{ __html: data.title }} />)}
        <div
          className="bg-white h-[60px] w-[60px] text-black absolute -top-5 left-1/2 -translate-x-1/2 border-2 border-dotted border-primary-base rounded-full">

          <div className="flex justify-center items-center h-full">
            <svg width="40" height="30" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M31.99 26.55c3.484-3.565 5.59-8.264 5.59-12.235V5.322C37.58 2.891 36.688 2 34.259 2H26.32C23.891 2 23 2.891 23 5.322v8.102c0 2.431.89 3.322 3.321 3.322h1.134c-.324 2.188-1.378 4.537-2.35 6.32-.243.486-.404.891-.404 1.296 0 .648.404 1.215 1.295 1.702l2.026 1.053c.728.405 1.214.567 1.863.567.729 0 1.296-.243 2.106-1.134zm-20 0c3.484-3.565 5.59-8.264 5.59-12.235V5.322C17.58 2.891 16.688 2 14.259 2H6.32C3.891 2 3 2.891 3 5.322v8.102c0 2.431.89 3.322 3.321 3.322h1.134c-.324 2.188-1.378 4.537-2.35 6.32-.243.486-.404.891-.404 1.296 0 .648.404 1.215 1.295 1.702l2.026 1.053c.728.405 1.214.567 1.863.567.729 0 1.296-.243 2.106-1.134z"
                fill="currentColor" />
              <path
                d="M29.798 25.197c3.483-3.565 5.589-8.264 5.589-12.235V3.969c0-2.431-.892-3.322-3.321-3.322h-7.938c-2.43 0-3.321.891-3.321 3.322v8.102c0 2.431.89 3.322 3.321 3.322h1.134c-.324 2.188-1.378 4.537-2.35 6.32-.243.486-.404.891-.404 1.296 0 .648.404 1.215 1.295 1.702l2.026 1.053c.728.405 1.214.567 1.863.567.729 0 1.296-.243 2.106-1.134zm-20 0c3.483-3.565 5.589-8.264 5.589-12.235V3.969c0-2.431-.892-3.322-3.321-3.322H4.128c-2.43 0-3.321.891-3.321 3.322v8.102c0 2.431.89 3.322 3.321 3.322h1.134c-.324 2.188-1.378 4.537-2.35 6.32-.243.486-.404.891-.404 1.296 0 .648.404 1.215 1.295 1.702l2.026 1.053c.728.405 1.214.567 1.863.567.729 0 1.296-.243 2.106-1.134z"
                strokeWidth="2" fill="#fff" stroke="currentColor" />
            </svg>
          </div>
        </div>

        <div className="my-6">
          <p className=" text-base text-center sm:text-xl text-white"><em>
            <span dangerouslySetInnerHTML={{ __html: data?.main_content?.text }} />

          </em></p>
        </div>

        {
          data?.main_content?.speaker && <div className="flex flex-col items-center justify-center mr-2 text-base font-semibold text-center ">
            <span >-</span>
            <a href={data?.url} target="_blank" className=" mr-2 text-xl font-semibold text-center text-violet-500 cursor-pointer">

              <div dangerouslySetInnerHTML={{ __html: data?.main_content?.speaker }} /></a>
          </div>

        }



      </div>
      {
        data?.main_content?.pubName &&
        <a target="_blank" href={data?.url} className="flex w-full justify-end  hover:underline text-violet-500 cursor-pointer mt-6">
          <div dangerouslySetInnerHTML={{ __html: data?.main_content?.pubName }} />
        </a>
      }



    </div>
  )
}

export default Quote;