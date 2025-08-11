"use client";

import React from "react";
import { AnalyticsType } from "@/types/AdminTypes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FunnelCardProps {
  analysis: AnalyticsType;
}

const FunnelCard = ({ analysis }: FunnelCardProps) => {
  const chartData = [
    { stage: "Applied", value: analysis.total_applicants },
    { stage: "Under Review", value: analysis.application_funnel.pending_review },
    { stage: "Interview", value: analysis.application_funnel.in_progress },
    { stage: "Accepted", value: analysis.acceptance_rate },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] w-full justify-self-center">
      <h1 className="font-semibold text-[#111827] text-[20px]">Application Funnel</h1>
      <p className="font-normal text-[#6B7280]">
        This chart visualizes the applicant's journey from submission to acceptance.
      </p>

      {/* Responsive container for width scaling */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 20, right: 20, left: 50, bottom: 20 }}
        >
          <CartesianGrid stroke="#E5E7EB" />
          <XAxis
            type="number"
            domain={[0, 1400]}
            tickCount={8}
            ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400]}
          />
          <YAxis
            dataKey="stage"
            type="category"
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="value" fill="#4F46E5" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FunnelCard;
