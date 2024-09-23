import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({ data }: any) => {
  const truncatedLabels = data?.nameobj.map((label: any) =>
    label.length > 15 ? `${label.slice(0, 20)}...` : label
  );
  const [screenWidth, setScreenWidth] = useState(480);
  const [chartData, setChartData] = useState<any>({
    series: [{
      data: data?.dataobj
    }],
    options: {
      chart: {
        height: 400,
        width: 400,
        type: 'bar',
        background: '#0F172A',
        foreColor: '#ffffff',
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: truncatedLabels,
        labels: {
          style: {
            colors: '#ffffff',
          },
        },
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
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={400}
          width={screenWidth < 480 ? screenWidth - 50 : 480}
        />

      </div>
    </div>
  );
};

export default BarChart;
