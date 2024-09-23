'use client';
import "./text.css"

const Text = ({ data }: any) => {
  return (
    <div className="mx-2 p-4 rounded-lg bg-white w-full">
      <div className="relative">
        <div className="relative z-10 px-2">
          <p dangerouslySetInnerHTML={{ __html: data?.display_text }} className="text text-base sm:text-xl text-black font-cabin musaics-text"></p>
        </div>
      </div>
    </div>
  )
}

export default Text;