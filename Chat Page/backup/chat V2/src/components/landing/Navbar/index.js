'use client'
import { BotMessageSquare, ChevronDown, Globe, Search } from 'lucide-react'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { i18n } = useTranslation()
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)

  const currentLanguage = i18n.language === 'th' ? 'TH' : 'EN'

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
  }

  const changeLanguage = lang => {
    i18n.changeLanguage(lang)
    setIsLanguageDropdownOpen(false)
    console.log(`Language changed to: ${lang}`)
  }

  return (
    <header
      className='bg-white/10 backdrop-blur-xl border-b border-white/20 relative '
      style={{ zIndex: 1000 }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <Link href='/'>
            <div className='flex items-center space-x-3'>
              <div className='w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg'>
                <BotMessageSquare className='w-7 h-7 text-white' />
              </div>
              <span className='text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
                {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
            </div>
          </Link>
          <nav className='hidden md:flex space-x-8'>
            <Link
              href='/#features'
              className='text-gray-300 hover:text-cyan-400 transition-colors'
            >
              Features
            </Link>
            <Link
              href='/subscription'
              className='text-gray-300 hover:text-cyan-400 transition-colors'
            >
              Pricing
            </Link>
            <Link
              href='#support'
              className='text-gray-300 hover:text-cyan-400 transition-colors'
            >
              Support
            </Link>
          </nav>
          <div className='flex items-center space-x-4'>
            <Link
              href='/auth'
              className='text-gray-300 hover:text-cyan-400 transition-colors'
            >
              Sign In
            </Link>
            <Link
              href='/chat'
              className='bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg'
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className='hidden lg:flex'>
          <div className='absolute top-0 right-0 h-full flex items-center pr-8'>
            <div className='relative'>
              <button
                onClick={toggleLanguageDropdown}
                className='flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/10'
              >
                <Globe className='w-4 h-4' />
                <span>{currentLanguage}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isLanguageDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isLanguageDropdownOpen && (
                <div className='absolute right-0 mt-2 w-32 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg '>
                  <button
                    onClick={() => changeLanguage('en')}
                    className='w-full text-left px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-white/10 transition-colors rounded-t-lg'
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage('th')}
                    className='w-full text-left px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-white/10 transition-colors rounded-b-lg'
                  >
                    ไทย
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Navbar
