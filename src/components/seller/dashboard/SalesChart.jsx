// src/components/seller/dashboard/SalesChart.jsx
import React from 'react';
import { Card } from 'antd';
import { Line } from '@ant-design/plots';

const SalesChart = ({ data }) => {
  const config = {
    data,
    padding: 'auto',
    xField: 'date',
    yField: 'amount',
    xAxis: {
      tickCount: 5,
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
    color: '#FFA940',
    tooltip: {
      formatter: (datum) => {
        return { name: 'Sales', value: `$${datum.amount.toFixed(2)}` };
      },
    },
    lineStyle: {
      lineWidth: 3,
    },
  };

  return (
    <Card title="Sales Trend" className="shadow-sm mb-8">
      <Line {...config} height={300} />
    </Card>
  );
};

export default SalesChart;