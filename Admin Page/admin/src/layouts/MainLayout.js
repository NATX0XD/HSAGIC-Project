'use client'
import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/aside'
import Navigation from '@/configurations/menuNavigations/navigations'
import { useTheme } from 'next-themes'
import { PageTitleProvider } from '@/context/PageTitleContext'

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <PageTitleProvider>
      <div className='min-h-screen transition-colors duration-200 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white'>
        {/* Top Navigation */}
        <Navbar
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          notifications={3}
          // ไม่ต้องส่ง darkMode / setDarkMode แล้ว
        />

        {/* Sidebar (ถ้า Sidebar ยังใช้ prop นี้อยู่ ส่ง isDark ไปเพื่อไม่ต้องแก้ไฟล์ Sidebar) */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          menuItems={Navigation}
          darkMode={isDark}
          // ถ้าได้แก้ Sidebar ให้ใช้ dark:class แล้ว ควรถอด prop นี้ออกในอนาคต
        />

        {/* Main content */}
        <main
          className={`transition-all duration-300 pt-16 ${
            sidebarOpen ? 'ml-72' : 'ml-16'
          }`}
        >
          <div className='p-6'>{children}</div>
        </main>
      </div>
    </PageTitleProvider>
  )
}

export default MainLayout
