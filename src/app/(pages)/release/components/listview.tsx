import React from 'react';
import getIcon from './getIcons';

const Listview = ({ data }: any) => {

    return (

        //         <div className="mt-2 w-full">
        //     <table className="min-w-full divide-y divide-gray-300">
        //         <thead>
        //             <tr>
        //                 <th className="whitespace-nowrap px-3 py-4 text-lg text-white text-left font-bold"> Icon</th>
        //                 <th className="whitespace-nowrap px-3 py-4 text-lg text-white text-left font-bold">List</th>
        //             </tr>
        //         </thead>
        //         <tbody className="divide-y divide-gray-200">
        //             {data?.main_content?.listarray.map((item: any, index: number) => (
        //                 <tr key={index}>
        //                     <td className="whitespace-nowrap px-3 py-4 text-sm text-blue-500 cursor-pointer hover:underline">{getIcon(item.text)}</td>
        //                     <td
        //                         onClick={() => {
        //                             if (item?.text) {
        //                                 window.open(item?.text, '_blank');
        //                             }
        //                         }}
        //                         className="whitespace-nowrap px-3 py-4 text-sm text-blue-500 cursor-pointer hover:underline">{item?.username}</td>

        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>
        <>
            {data?.main_content?.listarray.map((item: any, index: number) => (
                <a key={index} className="grid grid-cols-12 gap-2 my-2" href={item?.text ? `${item?.text}` : "#"} target='_blank'>
                    <div className="col-span-12">
                        <div className="flex flex-grow items-center justify-between gap-x-2 p-5 bg-primary-base rounded-lg border-[0.3px] border-gray-500">
                            <span dangerouslySetInnerHTML={{ __html: item?.username }} className="break-words truncate !text-[18px] text-violet-500"></span>
                            {getIcon(item.text)}
                        </div>
                    </div>
                </a>
            ))}
        </>



        // <div className="max-w-md w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        //     <div className="flex flex-col space-y-4 py-4 px-6">
        //         {data?.main_content?.listarray.map((item: any, index: number) => (
        //             <a key={index}
        //                 href={item?.text ? `${item?.text}` : "#"} target='_blank'
        //                 className="flex items-center justify-between py-2 px-4 bg-gray-900 rounded-lg hover:bg-blue-600 transition duration-300"
        //             >
        //                 <span>{item?.username}</span>
        //                 {getIcon(item.text)}
        //             </a>
        //         ))}

        //         {/* Add more social links following the same pattern */}
        //     </div>
        // </div>

    );
};

export default Listview;