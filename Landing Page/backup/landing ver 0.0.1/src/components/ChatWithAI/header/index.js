import { Menu, Trash2 } from 'lucide-react'
import React from 'react'

const HeaderChat = ({ sidebarOpen = 'block', setSidebarOpen = null }) => {
  return (
    <div className='bg-white border-b border-gray-200 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <button
            onClick={() => setSidebarOpen(true)}
            className={`p-2 hover:bg-gray-100 rounded-lg ${
              sidebarOpen ? 'hidden' : 'block'
            }`}
          >
            <Menu className='w-5 h-5 text-gray-500' />
          </button>
          <div>
            <h1 className='text-lg font-semibold text-gray-900'>
              Electronics Classification
            </h1>
            <p className='text-sm text-gray-500'>
              Get accurate HS codes for your products
            </p>
          </div>
        </div>
        <button className='p-2 hover:bg-gray-100 rounded-lg'>
          <Trash2 className='w-5 h-5 text-gray-400' />
        </button>
      </div>
    </div>
  )
}

export default HeaderChat
