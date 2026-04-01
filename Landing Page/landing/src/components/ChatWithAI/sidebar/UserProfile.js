import { LogOut, Settings, User } from 'lucide-react'
import React from 'react'

const UserProfile = () => {
  return (
    <div className='p-4 border-t border-gray-200'>
      <div className='flex items-center space-x-3'>
        <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
          <User className='w-5 h-5 text-blue-600' />
        </div>
        <div className='flex-1'>
          <p className='text-sm font-medium text-gray-900'>John Doe</p>
          <p className='text-xs text-gray-500'>Free Plan</p>
        </div>
        <div className='flex items-center space-x-1'>
          <button className='p-1 hover:bg-gray-100 rounded-lg'>
            <Settings className='w-4 h-4 text-gray-400' />
          </button>
          <button className='p-1 hover:bg-gray-100 rounded-lg'>
            <LogOut className='w-4 h-4 text-gray-400' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
