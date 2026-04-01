'use client'
import React from 'react'
import { Database, FileText, HardDrive, BarChart3 } from 'lucide-react'

const Card = ({ icon: Icon, title, value, sub, subClass }) => (
  <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
    <div className='flex items-center justify-between'>
      <div>
        <p className='text-sm text-gray-500 dark:text-gray-400'>{title}</p>
        <p className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
          {value}
        </p>
        {sub && (
          <p
            className={`${
              subClass || 'text-gray-500 dark:text-gray-400'
            } text-sm`}
          >
            {sub}
          </p>
        )}
      </div>
      <Icon
        size={32}
        className={
          subClass?.includes('blue')
            ? 'text-blue-500'
            : subClass?.includes('green')
            ? 'text-green-500'
            : subClass?.includes('purple')
            ? 'text-purple-500'
            : subClass?.includes('orange')
            ? 'text-orange-500'
            : 'text-blue-500'
        }
      />
    </div>
  </div>
)

const StatsOverview = ({ total, active, docs, storageMB, avgAcc }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      <Card
        icon={Database}
        title='Total Vectors'
        value={total}
        sub={`${active} active`}
        subClass='text-blue-500'
      />
      <Card
        icon={FileText}
        title='Total Documents'
        value={docs.toLocaleString()}
        sub='Embedded'
        subClass='text-green-500'
      />
      <Card
        icon={HardDrive}
        title='Storage Used'
        value={`${storageMB}MB`}
        sub='Vector data'
        subClass='text-purple-500'
      />
      <Card
        icon={BarChart3}
        title='Avg Accuracy'
        value={`${avgAcc.toFixed(1)}%`}
        sub='Performance'
        subClass='text-orange-500'
      />
    </div>
  )
}

export default StatsOverview
