import { Search } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-4 gap-8'>
          <div>
            <div className='flex items-center space-x-2 mb-4'>
              <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
                <Search className='w-4 h-4 text-white' />
              </div>
              <span className='text-xl font-bold'>CustomsAI</span>
            </div>
            <p className='text-gray-400'>
              AI-powered customs classification for modern trade.
            </p>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Product</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a href='#' className='hover:text-white'>
                  Features
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Pricing
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  API
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Support</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a href='#' className='hover:text-white'>
                  Documentation
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Help Center
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Company</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a href='#' className='hover:text-white'>
                  About
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Blog
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>&copy; 2024 CustomsAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
