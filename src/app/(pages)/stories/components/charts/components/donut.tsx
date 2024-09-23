import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Donut = ({ data }: any) => {
    const truncatedLabels = data?.nameobj.map((label: any) =>
        label.length > 9 ? `${label.slice(0, 9)}...` : label
    );
    const [screenWidth, setScreenWidth] = useState(480);
    const [chartData, setChartData] = useState<any>({
        series: data?.dataobj,
        options: {
            chart: {
                width: 380,
                height: 380,
                type: 'donut',
                foreColor: '#ffffff',
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 270,
                },
            },
            labels: truncatedLabels,
            fill: {
                type: 'gradient',
            },
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
        <div>
            <div id="chart" className='bg-transparent'>
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="donut"
                    width={screenWidth < 480 ? screenWidth : 480}
                />
            </div>
        </div>
    );
};

export default Donut;
