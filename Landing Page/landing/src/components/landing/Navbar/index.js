'use client'
import {
  BotMessageSquare,
  ChevronDown,
  Globe,
  Search,
  Menu,
  X
} from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { i18n } = useTranslation()
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const currentLanguage = i18n.language === 'th' ? 'TH' : 'EN'

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const changeLanguage = lang => {
    i18n.changeLanguage(lang)
    setIsLanguageDropdownOpen(false)
    console.log(`Language changed to: ${lang}`)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        isMobileMenuOpen &&
        !event.target.closest('.mobile-menu') &&
        !event.target.closest('.menu-toggle')
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header className='bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4'>
            {/* Left Section - Logo + Name + Menu */}
            <div className='flex items-center space-x-8'>
              {/* Logo + App Name */}
              <Link href='/'>
                <div className='flex items-center space-x-3 hover:scale-105 transition-transform duration-300'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow'>
                    <BotMessageSquare className='w-5 h-5 sm:w-7 sm:h-7 text-white' />
                  </div>
                  <span className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
                    {process.env.NEXT_PUBLIC_APP_NAME}
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Menu */}
              <nav className='hidden lg:flex items-center space-x-8'>
                <Link
                  href='/#features'
                  className='text-gray-300 hover:text-cyan-400 transition-colors font-medium hover:scale-105 transform duration-200'
                >
                  Features
                </Link>
                <Link
                  href='/subscription'
                  className='text-gray-300 hover:text-cyan-400 transition-colors font-medium hover:scale-105 transform duration-200'
                >
                  Pricing
                </Link>
                <Link
                  href='#support'
                  className='text-gray-300 hover:text-cyan-400 transition-colors font-medium hover:scale-105 transform duration-200'
                >
                  Support
                </Link>
              </nav>
            </div>

            {/* Right Section - Actions + Language */}
            <div className='flex items-center space-x-4'>
              {/* Desktop Actions */}
              <div className='hidden lg:flex items-center space-x-4'>
                <Link
                  href='/auth'
                  className='text-gray-300 hover:text-cyan-400 transition-colors font-medium px-4 py-2 rounded-xl hover:bg-white/5'
                >
                  Sign In
                </Link>
                <Link
                  href='/chat'
                  className='bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium'
                >
                  Get Started
                </Link>
              </div>

              {/* Language Dropdown - Desktop */}
              <div className='relative hidden lg:block'>
                <button
                  onClick={toggleLanguageDropdown}
                  className='flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors px-3 py-2 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/20'
                >
                  <Globe className='w-4 h-4' />
                  <span className='font-medium'>{currentLanguage}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isLanguageDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isLanguageDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-40 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl animate-fadeIn'>
                    <button
                      onClick={() => changeLanguage('en')}
                      className='w-full text-left px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/10 transition-colors rounded-t-xl flex items-center space-x-2'
                    >
                      <span className='text-lg'>🇺🇸</span>
                      <span>English</span>
                    </button>
                    <div className='border-t border-white/10'></div>
                    <button
                      onClick={() => changeLanguage('th')}
                      className='w-full text-left px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/10 transition-colors rounded-b-xl flex items-center space-x-2'
                    >
                      <span className='text-lg'>🇹🇭</span>
                      <span>ไทย</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className='lg:hidden p-2 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-white/10 transition-colors menu-toggle'
            >
              {isMobileMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fadeIn'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-r border-white/20 z-50 lg:hidden mobile-menu transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='p-6'>
          {/* Mobile Menu Header */}
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg'>
                <BotMessageSquare className='w-6 h-6 text-white' />
              </div>
              <span className='text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
                Menu
              </span>
            </div>
            <button
              onClick={toggleMobileMenu}
              className='p-2 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-white/10 transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className='space-y-4 mb-8'>
            <Link
              href='/#features'
              className='block text-gray-300 hover:text-cyan-400 transition-colors font-medium py-3 px-4 rounded-xl hover:bg-white/10'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href='/subscription'
              className='block text-gray-300 hover:text-cyan-400 transition-colors font-medium py-3 px-4 rounded-xl hover:bg-white/10'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href='#support'
              className='block text-gray-300 hover:text-cyan-400 transition-colors font-medium py-3 px-4 rounded-xl hover:bg-white/10'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Support
            </Link>
          </nav>

          {/* Mobile Language Selection */}
          <div className='mb-8'>
            <h3 className='text-gray-400 text-sm font-medium mb-3 px-4'>
              Language
            </h3>
            <div className='space-y-2'>
              <button
                onClick={() => {
                  changeLanguage('en')
                  setIsMobileMenuOpen(false)
                }}
                className='w-full text-left px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/10 transition-colors rounded-xl flex items-center space-x-3'
              >
                <span className='text-lg'>🇺🇸</span>
                <span>English</span>
                {i18n.language === 'en' && (
                  <span className='ml-auto text-cyan-400'>✓</span>
                )}
              </button>
              <button
                onClick={() => {
                  changeLanguage('th')
                  setIsMobileMenuOpen(false)
                }}
                className='w-full text-left px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/10 transition-colors rounded-xl flex items-center space-x-3'
              >
                <span className='text-lg'>🇹🇭</span>
                <span>ไทย</span>
                {i18n.language === 'th' && (
                  <span className='ml-auto text-cyan-400'>✓</span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Auth Buttons */}
          <div className='space-y-4'>
            <Link
              href='/auth'
              className='block text-center text-gray-300 hover:text-cyan-400 transition-colors font-medium py-3 px-4 rounded-xl border border-white/20 hover:bg-white/5'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href='/chat'
              className='block text-center bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg font-medium'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
      `}</style>
    </>
  )
}

export default Navbar
