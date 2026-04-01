'use client'
import React from 'react'
import {
  Users,
  TrendingUp,
  TrendingDown,
  Zap,
  CheckCircle,
  Brain,
  Server
} from 'lucide-react'

const KeyMetrics = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {/* Total Users */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Total Users
            </p>
            <p className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
              2,847
            </p>
            <div className='flex items-center space-x-1 mt-1'>
              <TrendingUp size={12} className='text-green-500' />
              <span className='text-green-500 text-sm'>+12.5%</span>
              <span className='text-gray-400 dark:text-gray-500 text-xs'>
                vs last month
              </span>
            </div>
          </div>
          <div className='p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full'>
            <Users className='text-blue-600 dark:text-blue-400' size={24} />
          </div>
        </div>
      </div>

      {/* AI Accuracy */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              AI Accuracy
            </p>
            <p className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
              94.2%
            </p>
            <div className='flex items-center space-x-1 mt-1'>
              <TrendingUp size={12} className='text-green-500' />
              <span className='text-green-500 text-sm'>+2.1%</span>
              <span className='text-gray-400 dark:text-gray-500 text-xs'>
                vs last week
              </span>
            </div>
          </div>
          <div className='p-3 bg-green-100 dark:bg-green-900/30 rounded-full'>
            <Brain className='text-green-600 dark:text-green-400' size={24} />
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Response Time
            </p>
            <p className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
              1.2s
            </p>
            <div className='flex items-center space-x-1 mt-1'>
              <TrendingDown size={12} className='text-green-500' />
              <span className='text-green-500 text-sm'>-0.3s</span>
              <span className='text-gray-400 dark:text-gray-500 text-xs'>
                improved
              </span>
            </div>
          </div>
          <div className='p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full'>
            <Zap className='text-yellow-600 dark:text-yellow-400' size={24} />
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              System Health
            </p>
            <p className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
              98.5%
            </p>
            <div className='flex items-center space-x-1 mt-1'>
              <CheckCircle size={12} className='text-green-500' />
              <span className='text-green-500 text-sm'>Excellent</span>
              <span className='text-gray-400 dark:text-gray-500 text-xs'>
                uptime
              </span>
            </div>
          </div>
          <div className='p-3 bg-green-100 dark:bg-green-900/30 rounded-full'>
            <Server className='text-green-600 dark:text-green-400' size={24} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeyMetrics
