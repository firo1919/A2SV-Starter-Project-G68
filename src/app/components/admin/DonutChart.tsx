import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Group A', value: 400, color: '#0088FE' },
  { label: 'Group B', value: 300, color: '#00C49F' },
  { label: 'Group C', value: 300, color: '#FFBB28' },
];

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

const total = 1200;

export default function DonutChart() {
  return (
    <div className='w-[448px]'>
        <PieChart
        series={[{ innerRadius: 50, outerRadius: 100, data, arcLabel: 'value' }]}
        {...settings}
        />
    </div>
  );
}