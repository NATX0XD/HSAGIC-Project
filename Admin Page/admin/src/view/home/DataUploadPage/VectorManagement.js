'use client'
import React from 'react'
import { Plus, Eye, Settings, Trash2 } from 'lucide-react'

const VectorManagement = ({ vectors = [], onDeleteVector }) => {
  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
          Vector Databases
        </h3>
        <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors'>
          <Plus size={16} />
          <span>Create Vector</span>
        </button>
      </div>

      {vectors.length === 0 ? (
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          No vectors yet.
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {vectors.map(vector => (
            <div
              key={vector.id}
              className='border rounded-lg p-4 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
            >
              <div className='flex items-start justify-between mb-3'>
                <div>
                  <h4 className='font-medium text-gray-900 dark:text-gray-100'>
                    {vector.name}
                  </h4>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                    {vector.description}
                  </p>
                </div>

                <div
                  className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      vector.status === 'active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : vector.status === 'building'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                >
                  {vector.status}
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 text-sm mb-3'>
                <div>
                  <span className='text-gray-500 dark:text-gray-400'>
                    Size:
                  </span>
                  <span className='ml-2 font-medium text-gray-900 dark:text-gray-100'>
                    {vector.size}
                  </span>
                </div>
                <div>
                  <span className='text-gray-500 dark:text-gray-400'>
                    Documents:
                  </span>
                  <span className='ml-2 font-medium text-gray-900 dark:text-gray-100'>
                    {vector.documents.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className='text-gray-500 dark:text-gray-400'>
                    Accuracy:
                  </span>
                  <span className='ml-2 font-medium text-gray-900 dark:text-gray-100'>
                    {vector.accuracy > 0 ? `${vector.accuracy}%` : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className='text-gray-500 dark:text-gray-400'>
                    Usage:
                  </span>
                  <span className='ml-2 font-medium text-gray-900 dark:text-gray-100'>
                    {vector.usage}%
                  </span>
                </div>
              </div>

              {vector.status === 'building' &&
                typeof vector.progress === 'number' && (
                  <div className='mb-3'>
                    <div className='flex items-center justify-between mb-1'>
                      <span className='text-sm text-gray-500 dark:text-gray-400'>
                        Building Progress
                      </span>
                      <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                        {Math.round(vector.progress)}%
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                      <div
                        className='bg-blue-600 h-2 rounded-full transition-all'
                        style={{ width: `${vector.progress}%` }}
                      />
                    </div>
                  </div>
                )}

              <div className='flex items-center justify-between'>
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  Updated: {vector.lastUpdate}
                </span>
                <div className='flex items-center space-x-2'>
                  <button
                    className='p-1 text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 transition-colors'
                    title='View'
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className='p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors'
                    title='Settings'
                  >
                    <Settings size={16} />
                  </button>
                  <button
                    className='p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors'
                    title='Delete'
                    onClick={() => onDeleteVector?.(vector.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VectorManagement
