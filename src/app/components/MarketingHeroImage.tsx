import Image from 'next/image'

interface Props {
  title: string,
  title2?: string,
  subtitle?: string,
  backgroundimage?: string,
  image?: string,
  className?: string,
  description?: string,
  tab?: string
}

const MarketingHeroImage = (props: Props) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${props.backgroundimage})`, // Set the background image dynamically
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className={`  w-screen   inset-0 ${props.className}`} style={backgroundImageStyle}>


      <div className="grid grid-cols-12 px-4 sm:px-6 lg:px-[100px] pt-[100px]  pb-[50px]">
        <div className='col-span-12 sm:col-span-6 md:col-span-6 lg:px-6'>
          <div className='h-full flex'>
            <div>
              <p className="text-[16px] xl:text-[24px] font-[600]  font- lg:px-4  leading-[24px] lg:leading-[36px]  py-2 text-left">{props.subtitle}</p>
              <h1 className="text-[32px] xl:text-[48px] font-[600] lg:px-4 text-left leading-[38.4px] lg:leading-[57.6px]">{props.title}</h1>

              <div className="text-[32px] xl:text-[48px] font-[600] lg:px-4 text-left leading-[38.4px] lg:leading-[57.6px]  py-2">{props.title2}</div>
              <p className='text-[18px] font-[400] text-left py-2 lg:px-4'>{props?.description}</p>
              {props?.tab === 'home' && (
                <div className='w-full flex items-center justify-center my-2 pt-[10px]'>
                  <a type="button" className='text-white font-[400] bg-[#7A38FE] rounded-full px-[13px] py-[9px] ' href="/about-us" target='_blank'>Tell Me More!</a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='col-span-12 sm:col-span-6'>
          <div className='flex items-center justify-end'>
            <img src={`${props.image}`} className='w-full h-[516px] object-contain' />
          </div>

        </div>


      </div>




    </div>
  )
}

export default MarketingHeroImage;