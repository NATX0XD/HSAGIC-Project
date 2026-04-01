'use client'
import React from 'react'
import { Bot } from 'lucide-react'

const ChatHeader = ({ model, vector }) => (
  <div className='p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-lg'>
    <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-3'>
        <Bot className='text-blue-500' size={24} />
        <div>
          <h3 className='font-semibold'>HS Code AI Assistant</h3>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            {model} • {vector}
          </p>
        </div>
      </div>
      <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
        <span className='w-2 h-2 bg-green-500 rounded-full' />
        <span>Online</span>
      </div>
    </div>
  </div>
)

export default ChatHeader
