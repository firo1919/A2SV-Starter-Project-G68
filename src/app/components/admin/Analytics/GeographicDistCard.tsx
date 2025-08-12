"use client";

import React from "react";
import { AnalyticsType } from "@/types/AdminTypes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  ResponsiveContainer,
} from "recharts";

interface GeographicDistCardProps {
  analysis: AnalyticsType;
}

const GeographicDistCard = ({ analysis }: GeographicDistCardProps) => {
  const country_distribution = analysis?.country_distribution ?? {};

  const chartData = Object.entries(country_distribution).map(
    ([name, count]) => ({
      country: name,
      applicants: count,
    })
  );

  return (
    <div className="bg-white p-4 rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] w-9/10 md:w-[1280px] justify-self-center">
      <h1 className="font-semibold text-[#111827] text-[20px]">
        Geographic Distribution
      </h1>
      <p className="font-normal text-[#6B7280]">
        Shows the number of applicants from each country.
      </p>

      <ResponsiveContainer width="100%" height={700}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity={1} />
              <stop offset="100%" stopColor="#E5E7EB" stopOpacity={1} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke="#E5E7EB" />
          <XAxis
            dataKey="country"
            tickLine={false}
            tickMargin={4}
            axisLine={false}
          />
          <YAxis
            type="number"
            domain={[0, 900]}
            ticks={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900]}
            tickCount={10}
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
          <Bar
            dataKey="applicants"
            fill="url(#colorGradient)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GeographicDistCard;
