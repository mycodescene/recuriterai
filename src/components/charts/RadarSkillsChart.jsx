import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

export const RadarSkillsChart = ({
  data = [],
  candidates = [], // [{ name, color, dataKey }]
  singleCandidateKey = "A",
  singleColor = "#6D5EF5",
  height = 320
}) => {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="rgba(148, 163, 184, 0.2)" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'JetBrains Mono' }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
            stroke="rgba(148, 163, 184, 0.2)"
          />

          {candidates && candidates.length > 0 ? (
            candidates.map((c, index) => (
              <Radar
                key={c.dataKey || index}
                name={c.name}
                dataKey={c.dataKey}
                stroke={c.color || '#6D5EF5'}
                fill={c.color || '#6D5EF5'}
                fillOpacity={0.25}
                strokeWidth={2}
              />
            ))
          ) : (
            <Radar
              name="Proficiency"
              dataKey={singleCandidateKey}
              stroke={singleColor}
              fill={singleColor}
              fillOpacity={0.3}
              strokeWidth={2.5}
            />
          )}

          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-card)',
              borderRadius: '0.75rem',
              color: 'var(--text-main)',
              fontSize: '12px',
              fontFamily: 'Inter',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
            }}
          />
          {candidates && candidates.length > 0 && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
