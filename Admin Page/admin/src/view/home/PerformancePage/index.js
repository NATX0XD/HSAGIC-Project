'use client'
import React, { useEffect, useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Brain,
  Bot,
  Database,
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw,
  Settings,
  Cpu,
  HardDrive,
  Wifi
} from 'lucide-react'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie
} from 'recharts'
import { usePageTitle } from '@/context/PageTitleContext'

const PerformancePage = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [refreshing, setRefreshing] = useState(false)
  const { setTitle } = usePageTitle()
  useEffect(() => {
    setTitle('Performance Metrics')
  }, [setTitle])
  // Mock data for charts
  const performanceData = [
    { time: '00:00', accuracy: 92, responseTime: 1.2, requests: 45 },
    { time: '04:00', accuracy: 94, responseTime: 1.1, requests: 32 },
    { time: '08:00', accuracy: 96, responseTime: 0.9, requests: 78 },
    { time: '12:00', accuracy: 95, responseTime: 1.3, requests: 124 },
    { time: '16:00', accuracy: 93, responseTime: 1.5, requests: 156 },
    { time: '20:00', accuracy: 91, responseTime: 1.8, requests: 89 }
  ]

  const aiModelUsage = [
    { name: 'GPT-4', value: 45, color: '#3B82F6' },
    { name: 'Claude-3', value: 30, color: '#10B981' },
    { name: 'Gemini Pro', value: 15, color: '#F59E0B' },
    { name: 'GPT-3.5', value: 10, color: '#EF4444' }
  ]

  const weeklyStats = [
    { day: 'Mon', queries: 1240, accuracy: 94.2, errors: 15 },
    { day: 'Tue', queries: 1356, accuracy: 95.1, errors: 12 },
    { day: 'Wed', queries: 1189, accuracy: 93.8, errors: 18 },
    { day: 'Thu', queries: 1478, accuracy: 96.3, errors: 8 },
    { day: 'Fri', queries: 1623, accuracy: 95.7, errors: 11 },
    { day: 'Sat', queries: 892, accuracy: 92.1, errors: 23 },
    { day: 'Sun', queries: 756, accuracy: 91.4, errors: 26 }
  ]

  const systemMetrics = {
    cpu: 68,
    memory: 74,
    storage: 45,
    network: 12
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    // Mock refresh delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setRefreshing(false)
  }

  const exportReport = () => {
    const reportData = {
      timeRange,
      performanceData,
      aiModelUsage,
      weeklyStats,
      systemMetrics,
      generatedAt: new Date().toISOString()
    }

    const dataStr = JSON.stringify(reportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `performance-report-${
      new Date().toISOString().split('T')[0]
    }.json`
    link.click()
  }

  const getSystemHealthColor = value => {
    if (value < 70) return 'bg-green-500'
    if (value < 85) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getSystemHealthStatus = value => {
    if (value < 70) return 'Good'
    if (value < 85) return 'Warning'
    return 'Critical'
  }

  return (
    // <MainLayout currentPage="Performance Metrics">
    <div className='space-y-6'>
      {/* Header Controls */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-semibold'>
            System Performance Dashboard
          </h2>
          <p className='text-gray-500 text-sm'>
            Real-time monitoring and analytics
          </p>
        </div>

        <div className='flex items-center space-x-3'>
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className='px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='1h'>Last Hour</option>
            <option value='24h'>Last 24 Hours</option>
            <option value='7d'>Last 7 Days</option>
            <option value='30d'>Last 30 Days</option>
          </select>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className='flex items-center space-x-2 px-4 py-2 border hover:bg-gray-50 rounded-lg transition-colors'
          >
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <button
            onClick={exportReport}
            className='flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>AI Accuracy</p>
              <p className='text-2xl font-bold'>94.2%</p>
              <div className='flex items-center space-x-1 mt-1'>
                <TrendingUp size={12} className='text-green-500' />
                <span className='text-green-500 text-sm'>+2.1%</span>
              </div>
            </div>
            <Brain className='text-blue-500' size={32} />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Avg Response Time</p>
              <p className='text-2xl font-bold'>1.2s</p>
              <div className='flex items-center space-x-1 mt-1'>
                <TrendingDown size={12} className='text-green-500' />
                <span className='text-green-500 text-sm'>-0.3s</span>
              </div>
            </div>
            <Zap className='text-green-500' size={32} />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Daily Queries</p>
              <p className='text-2xl font-bold'>8,534</p>
              <div className='flex items-center space-x-1 mt-1'>
                <TrendingUp size={12} className='text-green-500' />
                <span className='text-green-500 text-sm'>+12.5%</span>
              </div>
            </div>
            <Bot className='text-purple-500' size={32} />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Error Rate</p>
              <p className='text-2xl font-bold'>2.1%</p>
              <div className='flex items-center space-x-1 mt-1'>
                <TrendingDown size={12} className='text-green-500' />
                <span className='text-green-500 text-sm'>-0.8%</span>
              </div>
            </div>
            <AlertTriangle className='text-orange-500' size={32} />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Performance Trend */}
        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold'>AI Performance Trend</h3>
            <div className='flex items-center space-x-2 text-sm text-gray-500'>
              <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
              <span>Accuracy %</span>
              <div className='w-3 h-3 bg-green-500 rounded-full'></div>
              <span>Response Time (s)</span>
            </div>
          </div>
          <div className='h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <RechartsLineChart data={performanceData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='time' />
                <YAxis />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='accuracy'
                  stroke='#3B82F6'
                  strokeWidth={2}
                />
                <Line
                  type='monotone'
                  dataKey='responseTime'
                  stroke='#10B981'
                  strokeWidth={2}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Model Usage */}
        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <h3 className='text-lg font-semibold mb-4'>
            AI Model Usage Distribution
          </h3>
          <div className='h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <RechartsPieChart>
                <Pie
                  data={aiModelUsage}
                  cx='50%'
                  cy='50%'
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {aiModelUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weekly Statistics */}
      <div className='bg-white p-6 rounded-lg shadow-sm border'>
        <h3 className='text-lg font-semibold mb-4'>
          Weekly Performance Statistics
        </h3>
        <div className='h-64'>
          <ResponsiveContainer width='100%' height='100%'>
            <RechartsBarChart data={weeklyStats}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='day' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='queries' fill='#3B82F6' name='Queries' />
              <Bar dataKey='errors' fill='#EF4444' name='Errors' />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Health */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* System Resources */}
        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <h3 className='text-lg font-semibold mb-4'>System Resources</h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Cpu className='text-blue-500' size={20} />
                <span className='font-medium'>CPU Usage</span>
              </div>
              <span className='text-sm font-medium'>{systemMetrics.cpu}%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className={`h-2 rounded-full ${getSystemHealthColor(
                  systemMetrics.cpu
                )}`}
                style={{ width: `${systemMetrics.cpu}%` }}
              ></div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Database className='text-green-500' size={20} />
                <span className='font-medium'>Memory Usage</span>
              </div>
              <span className='text-sm font-medium'>
                {systemMetrics.memory}%
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className={`h-2 rounded-full ${getSystemHealthColor(
                  systemMetrics.memory
                )}`}
                style={{ width: `${systemMetrics.memory}%` }}
              ></div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <HardDrive className='text-purple-500' size={20} />
                <span className='font-medium'>Storage Usage</span>
              </div>
              <span className='text-sm font-medium'>
                {systemMetrics.storage}%
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className={`h-2 rounded-full ${getSystemHealthColor(
                  systemMetrics.storage
                )}`}
                style={{ width: `${systemMetrics.storage}%` }}
              ></div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Wifi className='text-orange-500' size={20} />
                <span className='font-medium'>Network I/O</span>
              </div>
              <span className='text-sm font-medium'>
                {systemMetrics.network} MB/s
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='h-2 rounded-full bg-green-500'
                style={{ width: `${systemMetrics.network * 2}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Recent Alerts & Status */}
        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <h3 className='text-lg font-semibold mb-4'>System Status & Alerts</h3>
          <div className='space-y-4'>
            {/* Overall Status */}
            <div className='flex items-center justify-between p-3 bg-green-50 rounded-lg'>
              <div className='flex items-center space-x-2'>
                <CheckCircle className='text-green-500' size={20} />
                <span className='font-medium'>System Status</span>
              </div>
              <span className='text-green-600 font-medium'>Healthy</span>
            </div>

            {/* Recent Alerts */}
            <div className='space-y-3'>
              <h4 className='font-medium text-gray-700'>Recent Alerts</h4>

              <div className='flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg'>
                <AlertTriangle className='text-yellow-500 mt-0.5' size={16} />
                <div className='flex-1'>
                  <p className='text-sm font-medium'>High Memory Usage</p>
                  <p className='text-xs text-gray-600'>
                    Memory usage exceeded 70% threshold
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>2 hours ago</p>
                </div>
              </div>

              <div className='flex items-start space-x-3 p-3 bg-blue-50 rounded-lg'>
                <CheckCircle className='text-blue-500 mt-0.5' size={16} />
                <div className='flex-1'>
                  <p className='text-sm font-medium'>Vector Database Updated</p>
                  <p className='text-xs text-gray-600'>
                    HS_Codes_Vector_v2.4 successfully updated
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>4 hours ago</p>
                </div>
              </div>

              <div className='flex items-start space-x-3 p-3 bg-green-50 rounded-lg'>
                <CheckCircle className='text-green-500 mt-0.5' size={16} />
                <div className='flex-1'>
                  <p className='text-sm font-medium'>Performance Improved</p>
                  <p className='text-xs text-gray-600'>
                    Average response time improved by 15%
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>6 hours ago</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className='pt-4 border-t'>
              <h4 className='font-medium text-gray-700 mb-3'>Quick Actions</h4>
              <div className='grid grid-cols-2 gap-2'>
                <button className='flex items-center justify-center space-x-1 p-2 text-sm border rounded hover:bg-gray-50 transition-colors'>
                  <Settings size={14} />
                  <span>Settings</span>
                </button>
                <button className='flex items-center justify-center space-x-1 p-2 text-sm border rounded hover:bg-gray-50 transition-colors'>
                  <RefreshCw size={14} />
                  <span>Restart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className='bg-white p-6 rounded-lg shadow-sm border'>
        <h3 className='text-lg font-semibold mb-4'>Performance Summary</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='text-center'>
            <div className='text-3xl font-bold text-green-500'>99.2%</div>
            <div className='text-sm text-gray-500'>Uptime</div>
            <div className='text-xs text-gray-400 mt-1'>Last 30 days</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-blue-500'>2.4M</div>
            <div className='text-sm text-gray-500'>Total Queries</div>
            <div className='text-xs text-gray-400 mt-1'>This month</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-purple-500'>847</div>
            <div className='text-sm text-gray-500'>Active Users</div>
            <div className='text-xs text-gray-400 mt-1'>Current session</div>
          </div>
        </div>
      </div>
    </div>
    // {/* </MainLayout> */}
  )
}

export default PerformancePage
