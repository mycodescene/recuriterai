import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const CandidatesAreaChart = ({
  data = [],
  height = 250
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6D5EF5" stopOpacity={0.35}/>
              <stop offset="95%" stopColor="#6D5EF5" stopOpacity={0.0}/>
            </linearGradient>
            <linearGradient id="colorQual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.35}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
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
          <Area
            type="monotone"
            dataKey="applications"
            name="Total Applicants"
            stroke="#6D5EF5"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorApps)"
          />
          <Area
            type="monotone"
            dataKey="qualified"
            name="AI Qualified (≥75%)"
            stroke="#10B981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorQual)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
