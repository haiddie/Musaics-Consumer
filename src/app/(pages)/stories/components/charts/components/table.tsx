
import React from 'react';
const Table = ({ data }: any) => {
    return (
        <div className="mt-8 w-full">
            <table className=" w-[100%] divide-y divide-gray-300 ">
                <tbody className="divide-y divide-gray-200">
                    {data?.nameobj.map((item: any, index: number) => (
                        <tr key={index}>
                            <td className="lg:whitespace-nowrap  py-4 text-sm text-white">{item}</td>
                            <td className="lg:whitespace-nowrap text-right  py-4 text-sm text-white">{data?.dataobj[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
