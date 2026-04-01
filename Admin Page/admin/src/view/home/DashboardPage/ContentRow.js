'use client'
import React from 'react'
import { CheckCircle, AlertTriangle, Bell } from 'lucide-react'

const ContentRow = ({ recentActivities = [], systemAlerts = [] }) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      {/* Recent Activity */}
      <div className='lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
            Recent Activity
          </h3>
          <button className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium'>
            View All
          </button>
        </div>

        <div className='space-y-4'>
          {recentActivities.map(activity => {
            const IconComponent = activity.icon
            return (
              <div key={activity.id} className='flex items-start space-x-3'>
                <div
                  className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 ${
                    activity.color || ''
                  }`}
                >
                  <IconComponent size={16} />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                    {activity.message}
                  </p>
                  <div className='flex items-center space-x-2 mt-1'>
                    <span className='text-xs text-gray-500 dark:text-gray-400'>
                      by {activity.user}
                    </span>
                    <span className='text-xs text-gray-400 dark:text-gray-500'>
                      •
                    </span>
                    <span className='text-xs text-gray-500 dark:text-gray-400'>
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
          {recentActivities.length === 0 && (
            <div className='text-sm text-gray-500 dark:text-gray-400'>
              No recent activity.
            </div>
          )}
        </div>
      </div>

      {/* System Alerts */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
            System Alerts
          </h3>
          <Bell className='text-gray-400 dark:text-gray-500' size={20} />
        </div>

        <div className='space-y-3'>
          {systemAlerts.map(alert => {
            const isWarn = alert.type === 'warning'
            const isSuccess = alert.type === 'success'

            // พื้นหลัง/เส้นนำตามธีม
            const baseClass = 'p-3 rounded-lg border-l-4 transition-colors'
            const lightClass = isWarn
              ? 'bg-yellow-50 border-yellow-400'
              : isSuccess
              ? 'bg-green-50 border-green-400'
              : 'bg-blue-50 border-blue-400'
            const darkClass = isWarn
              ? 'dark:bg-yellow-900/20 dark:border-yellow-500'
              : isSuccess
              ? 'dark:bg-green-900/20 dark:border-green-500'
              : 'dark:bg-blue-900/20 dark:border-blue-500'

            return (
              <div
                key={alert.id}
                className={`${baseClass} ${lightClass} ${darkClass}`}
              >
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <h4 className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                      {alert.title}
                    </h4>
                    <p className='text-xs text-gray-600 dark:text-gray-300 mt-1'>
                      {alert.message}
                    </p>
                    <span className='text-xs text-gray-500 dark:text-gray-400'>
                      {alert.time}
                    </span>
                  </div>

                  {isWarn && (
                    <AlertTriangle
                      size={16}
                      className='text-yellow-600 dark:text-yellow-400'
                    />
                  )}
                  {isSuccess && (
                    <CheckCircle
                      size={16}
                      className='text-green-600 dark:text-green-400'
                    />
                  )}
                </div>
              </div>
            )
          })}
          {systemAlerts.length === 0 && (
            <div className='text-sm text-gray-500 dark:text-gray-400'>
              No alerts.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentRow
