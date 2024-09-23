import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Pie = ({ data }: any) => {
    const truncatedLabels = data?.nameobj.map((label: any) =>
        label.length > 9 ? `${label.slice(0, 9)}...` : label
    );
    const [screenWidth, setScreenWidth] = useState(480);
    const [chartData, setChartData] = useState<any>({
        series: data?.dataobj,
        options: {
            chart: {
                height: 400,
                width: 400,
                type: 'pie',
                foreColor: '#ffffff',
            },
            labels: truncatedLabels,
        },
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setScreenWidth(window.innerWidth);
            };
            setScreenWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return (
        <div id="chart" className='bg-transparent'>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="pie"
                height={400}
                width={screenWidth < 480 ? screenWidth : 480}
            />
        </div>
    );
};

export default Pie;
