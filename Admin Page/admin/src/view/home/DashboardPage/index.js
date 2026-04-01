'use client'
import React, { useEffect } from 'react'
import { Users, Settings, Upload, MessageSquare, Database } from 'lucide-react'

import KeyMetrics from './KeyMetrics'
import ChartsRow from './ChartsRow'
import ContentRow from './ContentRow'
import QuickActions from './QuickActions'
import TopClassifications from './TopClassifications'
import SystemStatus from './SystemStatus'
import { usePageTitle } from '@/context/PageTitleContext'

const DashboardPage = () => {
  const { setTitle } = usePageTitle()
  useEffect(() => {
    setTitle('Dashboard')
  }, [setTitle])
  // Mock data for charts
  const weeklyData = [
    { day: 'Mon', queries: 1240, accuracy: 94.2, users: 145 },
    { day: 'Tue', queries: 1356, accuracy: 95.1, users: 152 },
    { day: 'Wed', queries: 1189, accuracy: 93.8, users: 138 },
    { day: 'Thu', queries: 1478, accuracy: 96.3, users: 167 },
    { day: 'Fri', queries: 1623, accuracy: 95.7, users: 189 },
    { day: 'Sat', queries: 892, accuracy: 92.1, users: 98 },
    { day: 'Sun', queries: 756, accuracy: 91.4, users: 87 }
  ]
  const hourlyData = [
    { time: '00:00', queries: 45, responseTime: 1.2 },
    { time: '03:00', queries: 32, responseTime: 1.1 },
    { time: '06:00', queries: 78, responseTime: 0.9 },
    { time: '09:00', queries: 124, responseTime: 1.3 },
    { time: '12:00', queries: 189, responseTime: 1.5 },
    { time: '15:00', queries: 156, responseTime: 1.4 },
    { time: '18:00', queries: 145, responseTime: 1.2 },
    { time: '21:00', queries: 89, responseTime: 1.1 }
  ]

  const modelUsage = [
    { name: 'GPT-4', value: 45, color: '#3B82F6', queries: 3847 },
    { name: 'Claude-3', value: 30, color: '#10B981', queries: 2564 },
    { name: 'Gemini Pro', value: 15, color: '#F59E0B', queries: 1282 },
    { name: 'GPT-3.5', value: 10, color: '#EF4444', queries: 854 }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'user_query',
      message: 'User classified electronic components',
      user: 'Sarah Chen',
      time: '2 minutes ago',
      icon: MessageSquare,
      color: 'text-blue-500'
    },
    {
      id: 2,
      type: 'vector_update',
      message: 'Vector database updated successfully',
      user: 'System',
      time: '15 minutes ago',
      icon: Database,
      color: 'text-green-500'
    },
    {
      id: 3,
      type: 'file_upload',
      message: 'New training data uploaded',
      user: 'Mike Rodriguez',
      time: '1 hour ago',
      icon: Upload,
      color: 'text-purple-500'
    },
    {
      id: 4,
      type: 'ai_config',
      message: 'AI model configuration updated',
      user: 'John Anderson',
      time: '2 hours ago',
      icon: Settings,
      color: 'text-orange-500'
    },
    {
      id: 5,
      type: 'user_login',
      message: 'New user account created',
      user: 'Emma Thompson',
      time: '3 hours ago',
      icon: Users,
      color: 'text-indigo-500'
    }
  ]

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Memory Usage',
      message: 'System memory usage is at 78%',
      time: '30 minutes ago',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'Vector database optimization scheduled for tonight',
      time: '2 hours ago',
      priority: 'low'
    },
    {
      id: 3,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily data backup completed successfully',
      time: '4 hours ago',
      priority: 'low'
    }
  ]

  const topClassifications = [
    {
      code: '8517.12.00',
      description: 'Smartphones',
      count: 1247,
      percentage: 15.2
    },
    {
      code: '6203.42.40',
      description: 'Cotton trousers',
      count: 1089,
      percentage: 13.3
    },
    {
      code: '8471.30.01',
      description: 'Laptops',
      count: 967,
      percentage: 11.8
    },
    {
      code: '9403.30.80',
      description: 'Office furniture',
      count: 834,
      percentage: 10.2
    },
    {
      code: '8518.30.20',
      description: 'Headphones',
      count: 723,
      percentage: 8.8
    }
  ]

  return (
    <div className='space-y-6'>
      {/* Welcome Header */}
      <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold mb-2'>Welcome back, Admin!</h2>
            <p className='text-blue-100'>
              {`Here's what's happening with your HS Code AI system today.`}
            </p>
          </div>
          <div className='text-right'>
            <div className='text-3xl font-bold'>8,534</div>
            <div className='text-blue-100'>Queries Today</div>
          </div>
        </div>
      </div>
      {/* Key Metrics */}
      <KeyMetrics />
      {/* Charts Row */}
      <ChartsRow modelUsage={modelUsage} weeklyData={weeklyData} />
      {/* Content Row */}
      <ContentRow
        recentActivities={recentActivities}
        systemAlerts={systemAlerts}
      />
      {/* Quick Actions & Top Classifications */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Quick Actions */}
        <QuickActions />
        {/* Top Classifications */}
        <TopClassifications topClassifications={topClassifications} />
      </div>
      {/* System Status */}
      <SystemStatus />
    </div>
  )
}

export default DashboardPage
