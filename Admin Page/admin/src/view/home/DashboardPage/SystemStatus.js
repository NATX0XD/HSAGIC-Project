'use client'
import React from 'react'
import { Database, HardDrive, Cpu, Wifi } from 'lucide-react'

const SystemStatus = () => {
  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
      <h3 className='text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100'>
        System Status
      </h3>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        {/* CPU Usage */}
        <div className='text-center'>
          <div className='flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-2'>
            <Cpu className='text-blue-600 dark:text-blue-400' size={24} />
          </div>
          <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
            68%
          </div>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            CPU Usage
          </div>
          <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2'>
            <div
              className='bg-blue-500 h-2 rounded-full'
              style={{ width: '68%' }}
            ></div>
          </div>
        </div>

        {/* Storage */}
        <div className='text-center'>
          <div className='flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-2'>
            <HardDrive
              className='text-green-600 dark:text-green-400'
              size={24}
            />
          </div>
          <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
            45%
          </div>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            Storage
          </div>
          <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2'>
            <div
              className='bg-green-500 h-2 rounded-full'
              style={{ width: '45%' }}
            ></div>
          </div>
        </div>

        {/* Memory */}
        <div className='text-center'>
          <div className='flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mx-auto mb-2'>
            <Database
              className='text-yellow-600 dark:text-yellow-400'
              size={24}
            />
          </div>
          <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
            74%
          </div>
          <div className='text-sm text-gray-500 dark:text-gray-400'>Memory</div>
          <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2'>
            <div
              className='bg-yellow-500 h-2 rounded-full'
              style={{ width: '74%' }}
            ></div>
          </div>
        </div>

        {/* Network */}
        <div className='text-center'>
          <div className='flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mx-auto mb-2'>
            <Wifi className='text-purple-600 dark:text-purple-400' size={24} />
          </div>
          <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
            12
          </div>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            MB/s Network
          </div>
          <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2'>
            <div
              className='bg-purple-500 h-2 rounded-full'
              style={{ width: '24%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemStatus
