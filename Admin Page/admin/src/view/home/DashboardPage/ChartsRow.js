'use client'
import React from 'react'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  AreaChart,
  Area
} from 'recharts'
import { useTheme } from 'next-themes'

const ChartsRow = ({ modelUsage = [], weeklyData = [] }) => {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  // สีตามธีม (ใช้คู่คอนทราสต์อ่านง่าย)
  const colors = {
    bgCard: isDark ? '#1F2937' : '#FFFFFF', // gray-800 / white
    border: isDark ? '#374151' : '#E5E7EB', // gray-700 / gray-200
    text: isDark ? '#F3F4F6' : '#111827', // gray-100 / gray-900
    subText: isDark ? '#9CA3AF' : '#6B7280', // gray-400 / gray-500
    grid: isDark ? '#374151' : '#E5E7EB', // gray-700 / gray-200
    axis: isDark ? '#D1D5DB' : '#374151', // gray-300 / gray-700
    tooltipBg: isDark ? '#111827' : '#FFFFFF', // gray-900 / white
    tooltipBorder: isDark ? '#374151' : '#E5E7EB', // gray-700 / gray-200

    // ซีรีส์
    area: '#3B82F6', // blue-500
    line: '#10B981' // emerald-500
  }

  const tooltipStyle = {
    backgroundColor: colors.tooltipBg,
    border: `1px solid ${colors.tooltipBorder}`,
    borderRadius: 8,
    color: colors.text
  }

  const axisCommon = {
    tick: { fill: colors.axis, fontSize: 12 },
    axisLine: { stroke: colors.axis },
    tickLine: { stroke: colors.axis }
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {/* Weekly Performance */}
      <div
        className='rounded-lg shadow-sm border'
        style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
      >
        <div className='p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h3
              className='text-lg font-semibold'
              style={{ color: colors.text }}
            >
              Weekly Performance
            </h3>
            <div className='flex items-center space-x-4 text-sm'>
              <div className='flex items-center space-x-1'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: colors.area }}
                />
                <span style={{ color: colors.subText }}>Queries</span>
              </div>
              <div className='flex items-center space-x-1'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: colors.line }}
                />
                <span style={{ color: colors.subText }}>Accuracy %</span>
              </div>
            </div>
          </div>

          <div className='h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray='3 3' stroke={colors.grid} />
                <XAxis dataKey='day' {...axisCommon} />
                <YAxis {...axisCommon} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type='monotone'
                  dataKey='queries'
                  stackId='1'
                  stroke={colors.area}
                  fill={colors.area}
                  fillOpacity={0.25}
                />
                <Line
                  type='monotone'
                  dataKey='accuracy'
                  stroke={colors.line}
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Model Usage */}
      <div
        className='rounded-lg shadow-sm border p-6'
        style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
      >
        <h3
          className='text-lg font-semibold mb-4'
          style={{ color: colors.text }}
        >
          AI Model Usage
        </h3>

        <div className='flex'>
          <div className='w-1/2 h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <RechartsPieChart>
                <Pie
                  data={modelUsage}
                  cx='50%'
                  cy='50%'
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey='value'
                >
                  {modelUsage.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={isDark ? '#111827' : '#FFFFFF'}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          <div className='w-1/2 space-y-3'>
            {modelUsage.map((model, index) => (
              <div key={index} className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <div
                    className='w-3 h-3 rounded-full'
                    style={{ backgroundColor: model.color }}
                  />
                  <span
                    className='text-sm font-medium'
                    style={{ color: colors.text }}
                  >
                    {model.name}
                  </span>
                </div>
                <div className='text-right'>
                  <div
                    className='text-sm font-semibold'
                    style={{ color: colors.text }}
                  >
                    {model.value}%
                  </div>
                  <div className='text-xs' style={{ color: colors.subText }}>
                    {model.queries} queries
                  </div>
                </div>
              </div>
            ))}

            {/* กรณีไม่มีข้อมูล */}
            {modelUsage.length === 0 && (
              <div className='text-sm' style={{ color: colors.subText }}>
                No model usage data.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartsRow
