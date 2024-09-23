import Image from 'next/image'

interface Props {
  title: string,
  subtitle?: string,
  image: string,
  className?: string,
  description?: string,
  tab?: string
}

const HeroImage = (props: Props) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${props.image})`, // Set the background image dynamically
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className={` font-barlow  w-full px-5 md:px-10 inset-0 ${props.className}`} style={backgroundImageStyle}>
      <div className=" pt-[10rem]  pb-24  md:pt-26 md:pt-[10rem]  2xl:pt-[10rem] 2xl:pb-24">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-[1rem] md:text-[1.2rem] lg:text-[1.2rem] leading-none  px-4 sm:px-6 lg:px-8 py-2 text-left">{props.subtitle}</div>
          <div className="text-white font-[600] text-[2.5rem] md:text-[2.5rem] lg:text-[3rem]  w-full leading-none tracking-wider px-4 sm:px-6 lg:px-8 py-2 text-center">{props.title}</div>
          <p className='text-[#B6C0BF] font-barlow !font-[400] text-[1rem] md:text-[1rem] lg:text-[20px] leading-none tracking-wider px-4 sm:px-6 lg:px-8 py-2 text-center'>{props?.description}</p>
          {props?.tab === 'home' && (
            <div className='w-full flex items-center justify-center my-2 pt-[10px]'>
              <a type="button" className='text-white font-[400] bg-[#7A38FE] rounded-full px-[13px] py-[9px] ' href="/about-us" target='_blank'>Tell Me More!</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeroImage;