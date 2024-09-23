'use client';

const Albumart = ({ data, updateGridStyle }: any) => {

  const gotoPhoto = (index: any) => {
    updateGridStyle()
    setTimeout(() => {
      let id = 'image' + index

      let el: any = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }

    }, 1000)
  }
  return (
    <div className="px-4 columns-3 gap-4">
      {data?.main_content?.image.map((img: any, index: number) => (
        <div key={index} className="relative">

          <img
            onClick={() => gotoPhoto(index)}
            loading="lazy"
            className="rounded-lg w-full mb-4 object-cover cursor-pointer"
            src={img.url}
            alt={`Image ${index}`}
          />
          {/* {index === 0 && (
            <div className="absolute bottom-0 left-0 right-0 text-xl p-2">
              {data?.main_content?.image[0]?.description}
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
}

export default Albumart;