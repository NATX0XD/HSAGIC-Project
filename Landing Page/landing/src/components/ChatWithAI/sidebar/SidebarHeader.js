import { Plus, Search, X } from 'lucide-react'
import React from 'react'

const SidebarHeader = ({ setSidebarOpen = null }) => {
  return (
    <div className='p-6 border-b border-gray-200'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-2'>
          <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
            <Search className='w-5 h-5 text-white' />
          </div>
          <span className='text-xl font-bold text-gray-900'>
            {' '}
            {process.env.NEXT_PUBLIC_APP_NAME}
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className='p-1 hover:bg-gray-100 rounded-lg '
        >
          <X className='w-5 h-5 text-gray-500' />
        </button>
      </div>
      <button className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2'>
        <Plus className='w-5 h-5' />
        <span>New Chat</span>
      </button>
    </div>
  )
}

export default SidebarHeader
