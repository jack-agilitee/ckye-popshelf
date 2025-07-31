'use client';

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import type { DropdownOption } from '../../atoms/Dropdown/Dropdown';
import styles from './PointsChart.module.scss';

export interface ChartDataPoint {
  month: string;
  points: number;
  displayMonth: string;
}

export interface PointsChartProps {
  data: ChartDataPoint[];
  totalPoints?: number;
  period?: 'monthly' | 'yearly';
  onPeriodChange?: (period: 'monthly' | 'yearly') => void;
  className?: string;
}

const periodOptions: DropdownOption[] = [
  { value: 'monthly', label: 'last 6 months' },
  { value: 'yearly', label: '2024' },
];

const PointsChart: React.FC<PointsChartProps> = ({
  data = [],
  totalPoints = 2400,
  period = 'monthly',
  onPeriodChange,
  className
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'yearly'>(period);

  const handlePeriodChange = (value: string) => {
    const newPeriod = value as 'monthly' | 'yearly';
    setSelectedPeriod(newPeriod);
    if (onPeriodChange) {
      onPeriodChange(newPeriod);
    }
  };

  // Get the maximum value for Y-axis scaling
  const maxPoints = Math.max(...data.map(d => d.points), 1000);
  const yAxisMax = Math.ceil(maxPoints / 250) * 250;

  // Generate Y-axis tick values
  const generateYAxisTicks = () => {
    const ticks = [];
    for (let i = 0; i <= yAxisMax; i += 250) {
      ticks.push(i);
    }
    return ticks.reverse(); // Reverse to match Figma layout (1000 at top, 0 at bottom)
  };

  return (
    <div className={`${styles['points-chart']} ${className || ''}`}>
      {/* Header with title and dropdown */}
      <div className={styles['points-chart__header']}>
        <h2 className={styles['points-chart__title']}>points earned</h2>
        <div className={styles['points-chart__dropdown']}>
          <Dropdown
            id="points-chart-period"
            options={periodOptions}
            value={selectedPeriod}
            onChange={handlePeriodChange}
            placeholder="Select period"
            className={styles['points-chart__dropdown-field']}
            aria-label="Select time period for points chart"
          />
        </div>
      </div>

      {/* Chart container */}
      <div className={styles['points-chart__container']}>
        {/* Y-axis labels */}
        <div className={styles['points-chart__y-axis']}>
          {generateYAxisTicks().map((tick) => (
            <div key={tick} className={styles['points-chart__y-label']}>
              {tick}
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className={styles['points-chart__chart']}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={data}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="pointsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#87189D" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#87189D" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={false}
                height={0}
              />
              <YAxis
                domain={[0, yAxisMax]}
                axisLine={false}
                tickLine={false}
                tick={false}
                width={0}
              />
              <Area
                type="monotone"
                dataKey="points"
                stroke="#87189D"
                strokeWidth={2}
                fill="url(#pointsGradient)"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: '#87189D',
                  stroke: '#FFFFFF',
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* X-axis labels */}
      <div className={styles['points-chart__x-axis']}>
        {data.map((item, index) => (
          <div
            key={item.month}
            className={`${styles['points-chart__x-label']} ${
              index === Math.floor(data.length / 2) ? styles['points-chart__x-label--current'] : ''
            }`}
          >
            {item.displayMonth}
          </div>
        ))}
      </div>

      {/* Summary text */}
      <div className={styles['points-chart__summary']}>
        you&apos;ve earned {totalPoints} points this year!
      </div>
    </div>
  );
};

export default PointsChart;