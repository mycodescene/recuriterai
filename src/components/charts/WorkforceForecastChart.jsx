import React from 'react';
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const WorkforceForecastChart = ({
  data = [],
  height = 300
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="bandColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6D5EF5" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card)',
              borderRadius: '0.75rem',
              color: 'var(--text-main)',
              fontSize: '12px',
            }}
          />
          {/* Upper confidence band */}
          <Area
            type="monotone"
            dataKey="upperBand"
            stroke="none"
            fill="url(#bandColor)"
            name="Upper Range"
          />
          {/* Lower band subtraction visual */}
          <Area
            type="monotone"
            dataKey="lowerBand"
            stroke="none"
            fill="var(--bg-card)"
            name="Lower Range"
          />
          {/* Expected Mean Demand */}
          <Line
            type="monotone"
            dataKey="demand"
            stroke="#6D5EF5"
            strokeWidth={3}
            dot={{ r: 4, fill: '#6D5EF5' }}
            activeDot={{ r: 6 }}
            name="Projected Headcount Demand"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
