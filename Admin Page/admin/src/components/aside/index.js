import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = ({
  sidebarOpen,
  menuItems,
  darkMode,
  currentPage = 'Dashboard'
}) => {
  const pathname = usePathname()
  const isActiveRoute = itemPath => {
    if (itemPath === '/' && pathname === '/') {
      return true
    }

    if (itemPath !== '/' && pathname.startsWith(itemPath)) {
      return true
    }
    return false
  }
  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-30 transition-all duration-300 ${
        sidebarOpen ? 'w-72' : 'w-16'
      } ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-r`}
    >
      <div className='p-4 h-full overflow-y-auto'>
        <div className='space-y-2'>
          {menuItems.map(item => {
            const Icon = item.icon
            const isActive = isActiveRoute(item.path)

            return (
              <Link
                key={item.id}
                href={item.path}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? `${
                        darkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-50 text-blue-600 border border-blue-200'
                      }`
                    : `${
                        darkMode
                          ? 'hover:bg-gray-700 text-gray-300'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`
                }`}
              >
                <Icon size={20} className='flex-shrink-0' />
                {sidebarOpen && (
                  <div className='flex-1 text-left'>
                    <div className='font-medium'>{item.label}</div>
                    <div
                      className={`text-xs mt-1 ${
                        isActive
                          ? darkMode
                            ? 'text-blue-200'
                            : 'text-blue-500'
                          : darkMode
                          ? 'text-gray-400'
                          : 'text-gray-500'
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
