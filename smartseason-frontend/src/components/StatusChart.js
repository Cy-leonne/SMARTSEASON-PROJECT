import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

function StatusChart({ statusBreakdown }) {
  const data = Object.entries(statusBreakdown).map(([key, value]) => ({
    name: key,
    value,
  }));

  const COLORS = ['#4caf50', '#ff9800', '#2196f3'];

  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}

export default StatusChart;
