import { Search } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <header className='bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-6'>
          <div className='flex items-center space-x-2'>
            <div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center'>
              <Search className='w-6 h-6 text-white' />
            </div>
            <span className='text-2xl font-bold text-gray-900'>CustomsAI</span>
          </div>
          <nav className='hidden md:flex space-x-8'>
            <a href='/#features' className='text-gray-600 hover:text-blue-600'>
              Features
            </a>
            <a
              href='/subscription'
              className='text-gray-600 hover:text-blue-600'
            >
              Pricing
            </a>
            <a href='#support' className='text-gray-600 hover:text-blue-600'>
              Support
            </a>
          </nav>
          <div className='flex items-center space-x-4'>
            <button className='text-gray-600 hover:text-blue-600'>
              Sign In
            </button>
            <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
