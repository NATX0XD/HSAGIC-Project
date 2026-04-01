import { BotMessageSquare, Search } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-black/40 backdrop-blur-xl text-white py-12 border-t border-white/20 relative z-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-4 gap-8'>
          <div>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center'>
                <BotMessageSquare className='w-5 h-5 text-white' />
              </div>
              <span className='text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
                {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
            </div>
            <p className='text-gray-300'>
              AI-powered customs classification for the future of trade.
            </p>
          </div>
          <div>
            <h4 className='font-semibold mb-4 text-cyan-400'>AI Features</h4>
            <ul className='space-y-2 text-gray-300'>
              <li>
                <a href='#' className='hover:text-cyan-400 transition-colors'>
                  Neural Classification
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-cyan-400 transition-colors'>
                  Smart Pricing
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-cyan-400 transition-colors'>
                  AI API
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4 text-purple-400'>Support</h4>
            <ul className='space-y-2 text-gray-300'>
              <li>
                <a href='#' className='hover:text-purple-400 transition-colors'>
                  AI Documentation
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-purple-400 transition-colors'>
                  Smart Help
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-purple-400 transition-colors'>
                  AI Chat
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4 text-pink-400'>Company</h4>
            <ul className='space-y-2 text-gray-300'>
              <li>
                <a href='#' className='hover:text-pink-400 transition-colors'>
                  About AI
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-pink-400 transition-colors'>
                  AI Blog
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-pink-400 transition-colors'>
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='border-t border-white/20 mt-8 pt-8 text-center text-gray-300'>
          <p>
            &copy; 2025 {process.env.NEXT_PUBLIC_APP_NAME}. Powered by
            Artificial Intelligence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
