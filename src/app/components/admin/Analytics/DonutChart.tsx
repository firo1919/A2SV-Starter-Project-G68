'use client'
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { AnalyticsType } from '@/types/AdminTypes';

const COLORS = ['#4F46E5', '#0088FE', '#A1BFFAFF', '#00C49F', '#FFBB28', '#FF8042'];

const settings = {
  margin: { right: 5 },
  width: 480,
  height: 480,
  hideLegend: true,
};

interface DonutChartProps {
  analysis: AnalyticsType;
}

export default function DonutChart({ analysis }: DonutChartProps) {
  const school_distribution = analysis?.school_distribution ?? {};
  const total_applicants = analysis?.total_applicants ?? 0;

const data = Object.entries(school_distribution).map(([name, count], index) => {
  const percentage = total_applicants > 0 ? (count / total_applicants) * 100 : 0;
  return {
    label: name,
    value: parseFloat(percentage.toFixed(2)),
    color: COLORS[index % COLORS.length],
    arcLabel: `${percentage.toFixed(2)}%`
  };
});

  return (
    <div className="flex flex-col bg-white p-4 rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] gap-4">
      <div className='flex flex-col'>
        <h1 className="font-semibold text-[#111827] text-[20px]">University Distribution</h1>
        <p className="font-normal text-[#6B7280]">Breakdown of applicants by their university.</p>
      </div>
      <PieChart
        series={[{ innerRadius: 180, outerRadius: 240, data, arcLabel: (item) => `${item.value.toFixed(2)}%` }]}
        {...settings}
      />
    </div>
  );
}
