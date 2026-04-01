import { Menu } from 'lucide-react'
import React from 'react'

const HeaderChat = ({
  activeChat = null,
  toggleSidebar = null,
  sidebarCollapsed
}) => {
  return (
    <div className='bg-white border-b border-gray-200 p-4'>
      <div className='flex items-center space-x-4'>
        {sidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className='p-2 hover:bg-gray-100 rounded'
          >
            <Menu className='w-5 h-5' />
          </button>
        )}
        <h2 className='text-lg font-medium text-gray-800'>
          {activeChat ? activeChat.title : 'Product Classification'}
        </h2>
      </div>
    </div>
  )
}

export default HeaderChat
