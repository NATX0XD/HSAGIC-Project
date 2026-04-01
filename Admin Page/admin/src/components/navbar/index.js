'use client'
import React, { useState, useRef, useEffect } from 'react'
import {
  Bell,
  Moon,
  Sun,
  User,
  Menu,
  X,
  Bot,
  Settings,
  LogOut,
  UserCircle,
  Shield,
  HelpCircle,
  ChevronDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { usePageTitle } from '@/context/PageTitleContext'
import { usePathname } from 'next/navigation'

const Navbar = ({ setSidebarOpen, sidebarOpen, notifications = 3 }) => {
  const { resolvedTheme, setTheme } = useTheme()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const notificationRef = useRef(null)
  const userMenuRef = useRef(null)

  const { title } = usePageTitle()
  // const pathname = usePathname()
  // const fallbackTitle = getTitleFromPath(pathname)
  const pageTitle = title || 'AI HS CODE Management System'

  const notificationsList = [
    {
      id: 1,
      type: 'success',
      title: 'Vector Database Updated',
      message: 'HS_Codes_Vector_v2.4 has been successfully updated',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Memory Usage',
      message: 'System memory usage has exceeded 80% threshold',
      time: '15 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New User Registered',
      message: 'Emma Thompson has joined as a Data Analyst',
      time: '1 hour ago',
      read: true
    },
    {
      id: 4,
      type: 'success',
      title: 'AI Model Performance',
      message: 'Classification accuracy improved to 94.2%',
      time: '2 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance scheduled for tonight at 2:00 AM',
      time: '4 hours ago',
      read: true
    }
  ]

  const userMenuItems = [
    {
      icon: UserCircle,
      label: 'Profile Settings',
      action: () => console.log('Profile clicked')
    },
    {
      icon: Shield,
      label: 'Account Security',
      action: () => console.log('Security clicked')
    },
    {
      icon: Settings,
      label: 'Preferences',
      action: () => console.log('Preferences clicked')
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      action: () => console.log('Help clicked')
    },
    { type: 'divider' },
    {
      icon: LogOut,
      label: 'Sign Out',
      action: () => console.log('Logout clicked'),
      className: 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
    }
  ]

  useEffect(() => {
    const handleClickOutside = e => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      )
        setShowNotifications(false)
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setShowUserMenu(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getNotificationIcon = type => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} className='text-green-500' />
      case 'warning':
        return <AlertTriangle size={16} className='text-yellow-500' />
      case 'info':
        return <Info size={16} className='text-blue-500' />
      default:
        return <Info size={16} className='text-gray-500' />
    }
  }

  const unreadCount = notificationsList.filter(n => !n.read).length

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-40 h-16 border-b transition-colors duration-200 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
    >
      <div className='flex items-center justify-between px-4 h-full'>
        {/* Left */}
        <div className='flex items-center space-x-4'>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className='flex items-center space-x-2'>
            <Bot className='text-blue-500' size={24} />
            <div>
              <h1 className='text-lg font-semibold'>{pageTitle}</h1>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                HS CODE AI Management System
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className='flex items-center space-x-3'>
          {/* Theme toggle */}
          <button
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
            className='p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
            aria-label='Toggle theme'
          >
            {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className='relative' ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className='p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className='absolute right-0 mt-2 w-80 rounded-lg shadow-lg border bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 z-50'>
                <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
                  <div className='flex items-center justify-between'>
                    <h3 className='font-semibold'>Notifications</h3>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      {unreadCount} unread
                    </span>
                  </div>
                </div>

                <div className='max-h-96 overflow-y-auto'>
                  {notificationsList.map(n => (
                    <div
                      key={n.id}
                      className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        !n.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className='flex items-start space-x-3'>
                        <div className='flex-shrink-0 mt-1'>
                          {getNotificationIcon(n.type)}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium'>{n.title}</p>
                          <p className='text-sm mt-1 text-gray-600 dark:text-gray-400'>
                            {n.message}
                          </p>
                          <div className='flex items-center mt-2'>
                            <Clock
                              size={12}
                              className='text-gray-500 dark:text-gray-400'
                            />
                            <span className='text-xs ml-1 text-gray-500 dark:text-gray-400'>
                              {n.time}
                            </span>
                            {!n.read && (
                              <div className='w-2 h-2 bg-blue-500 rounded-full ml-auto'></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='p-3 text-center border-t border-gray-200 dark:border-gray-700'>
                  <button className='text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'>
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User */}
          <div className='relative' ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className='flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors'
            >
              <div className='p-2 rounded-full bg-gray-200 dark:bg-gray-700'>
                <User size={20} />
              </div>
              <div className='text-sm text-left'>
                <div className='font-medium'>Admin User</div>
                <div className='text-gray-500 dark:text-gray-400'>
                  Super Admin
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  showUserMenu ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showUserMenu && (
              <div className='absolute right-0 mt-2 w-56 rounded-lg shadow-lg border bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 z-50'>
                <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
                  <div className='flex items-center space-x-3'>
                    <div className='p-2 rounded-full bg-gray-200 dark:bg-gray-700'>
                      <User size={20} />
                    </div>
                    <div>
                      <p className='font-medium'>Admin User</p>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        admin@company.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className='py-2'>
                  {userMenuItems.map((item, i) => {
                    if (item.type === 'divider') {
                      return (
                        <div
                          key={i}
                          className='my-2 border-t border-gray-200 dark:border-gray-700'
                        />
                      )
                    }
                    const Icon = item.icon
                    return (
                      <button
                        key={i}
                        onClick={item.action}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          item.className || ''
                        }`}
                      >
                        <Icon size={16} />
                        <span className='text-sm'>{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
