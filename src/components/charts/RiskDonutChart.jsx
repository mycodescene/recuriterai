import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const RiskDonutChart = ({
  data = [
    { name: "Low Risk (<25%)", value: 74, color: "#10B981" },
    { name: "Medium Risk (25-60%)", value: 19, color: "#F59E0B" },
    { name: "High Risk (>60%)", value: 7, color: "#F43F5E" }
  ],
  height = 240
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#6D5EF5'} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card)',
              borderRadius: '0.75rem',
              color: 'var(--text-main)',
              fontSize: '12px',
              fontFamily: 'Inter',
            }}
            formatter={(value) => [`${value}% of candidates`, 'Share']}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
