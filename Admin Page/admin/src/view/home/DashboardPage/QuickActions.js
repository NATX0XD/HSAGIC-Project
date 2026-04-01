'use client'
import Link from 'next/link'
import React from 'react'
import { Upload, MessageSquare, Database, FileText } from 'lucide-react'

const QuickActions = () => {
  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
      <h3 className='text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100'>
        Quick Actions
      </h3>
      <div className='grid grid-cols-2 gap-4'>
        {/* Upload Data */}
        <Link
          href='/data-upload'
          className='flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg 
                     hover:border-blue-500 hover:bg-blue-50 dark:hover:border-blue-400 dark:hover:bg-blue-900/30 transition-colors group'
        >
          <Upload
            className='text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2'
            size={32}
          />
          <span className='text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-400'>
            Upload Data
          </span>
          <span className='text-xs text-gray-500 dark:text-gray-400'>
            Add training files
          </span>
        </Link>

        {/* Test AI */}
        <Link
          href='/chat-test'
          className='flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg 
                     hover:border-green-500 hover:bg-green-50 dark:hover:border-green-400 dark:hover:bg-green-900/30 transition-colors group'
        >
          <MessageSquare
            className='text-green-500 group-hover:text-green-600 dark:group-hover:text-green-400 mb-2'
            size={32}
          />
          <span className='text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-green-400'>
            Test AI
          </span>
          <span className='text-xs text-gray-500 dark:text-gray-400'>
            Run test queries
          </span>
        </Link>

        {/* Build Vector */}
        <Link
          href='/vectors'
          className='flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg 
                     hover:border-purple-500 hover:bg-purple-50 dark:hover:border-purple-400 dark:hover:bg-purple-900/30 transition-colors group'
        >
          <Database
            className='text-purple-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 mb-2'
            size={32}
          />
          <span className='text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-purple-700 dark:group-hover:text-purple-400'>
            Build Vector
          </span>
          <span className='text-xs text-gray-500 dark:text-gray-400'>
            Create embeddings
          </span>
        </Link>

        {/* Edit Prompts */}
        <Link
          href='/prompt-editor'
          className='flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg 
                     hover:border-orange-500 hover:bg-orange-50 dark:hover:border-orange-400 dark:hover:bg-orange-900/30 transition-colors group'
        >
          <FileText
            className='text-orange-500 group-hover:text-orange-600 dark:group-hover:text-orange-400 mb-2'
            size={32}
          />
          <span className='text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-orange-700 dark:group-hover:text-orange-400'>
            Edit Prompts
          </span>
          <span className='text-xs text-gray-500 dark:text-gray-400'>
            Modify AI behavior
          </span>
        </Link>
      </div>
    </div>
  )
}

export default QuickActions
