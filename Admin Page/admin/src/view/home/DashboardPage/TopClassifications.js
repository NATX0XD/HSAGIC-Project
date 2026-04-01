'use client'
import React from 'react'

const TopClassifications = ({ topClassifications = [] }) => {
  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
          Top HS Classifications
        </h3>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          This week
        </span>
      </div>

      <div className='space-y-3'>
        {topClassifications.map((item, index) => (
          <div key={index} className='flex items-center space-x-3'>
            {/* Rank badge */}
            <div
              className='flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                            bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
            >
              {index + 1}
            </div>

            <div className='flex-1 min-w-0'>
              <div className='flex items-center justify-between'>
                <p className='text-sm font-medium text-gray-900 dark:text-gray-100 truncate'>
                  {item.code}
                </p>
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                  {item.count}
                </span>
              </div>

              <p className='text-xs text-gray-600 dark:text-gray-300 truncate'>
                {item.description}
              </p>

              <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1'>
                <div
                  className='bg-blue-500 h-1 rounded-full'
                  style={{ width: `${item.percentage * 5}%` }} // สมมติ percentage 0–20 เพื่อคูณ 5 ให้เป็น 0–100%
                />
              </div>
            </div>
          </div>
        ))}

        {topClassifications.length === 0 && (
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            No classification data.
          </div>
        )}
      </div>
    </div>
  )
}

export default TopClassifications
