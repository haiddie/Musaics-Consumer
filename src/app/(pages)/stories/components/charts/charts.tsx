import React, { useEffect, useState } from 'react';
import Donut from './components/donut';
import Pie from './components/pie';
import BarChart from './components/BarChart';
import Table from './components/table';
import "./chart.css"
const ApexChart = ({ data }: any) => {
    const [screenWidth, setScreenWidth] = useState('');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                const screenWidth_ = window.innerWidth;
                if (screenWidth_ < 550 && screenWidth_ > 270) {
                    setScreenWidth('250px')

                }
                if (screenWidth_ < 550 && screenWidth_ > 350) {
                    setScreenWidth('350px')
                }
                if (screenWidth_ < 550 && screenWidth_ > 400) {
                    setScreenWidth('400px')

                }

                if (screenWidth_ > 550) {
                    setScreenWidth('500px')
                }
            };
            setScreenWidth(window.innerWidth + 'px');
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);
    return (

        <div className={`w-full max-w-[${screenWidth}]`}>
            {data?.is_title && data.title && (<span className='text-xl font-bold text-center flex justify-center items-center w-full mb-3' dangerouslySetInnerHTML={{ __html: data.title }} />)}
            {data?.main_content?.charttype === 'donut' && <div className='flex justify-center w-full'>

                <Donut data={data?.main_content}></Donut>
            </div>}
            {data?.main_content?.charttype === 'pie' && <div className='flex justify-center w-full'>

                <Pie data={data?.main_content}></Pie>
            </div>}


            {data?.main_content?.charttype === 'bar' && <div className='flex justify-center w-full'>

                <BarChart data={data?.main_content}></BarChart>
            </div>}

            {data?.main_content?.charttype === 'table' && <div className='flex justify-center w-full'>

                <Table data={data?.main_content}></Table>
            </div>}
        </div>
    );
};

export default ApexChart;
