'use client'
import Sidebar from '@/components/ChatWithAI/Sidebar'
import HeaderChat from '@/components/ChatWithAI/HeaderChat'
import React, { useState } from 'react'

const MainLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeChat, setActiveChat] = useState(null)
  const [chatHistory, setChatHistory] = useState([
    {
      id: '1',
      title: 'Electronic Device Classification',
      timestamp: '2 ชั่วโมงที่แล้ว'
    },
    { id: '2', title: 'Bluetooth Speaker HS Code', timestamp: 'เมื่อวาน' },
    { id: '3', title: 'Textile Products Import', timestamp: '3 วันที่แล้ว' }
  ])
  const [folders, setFolders] = useState([
    { id: 'folder1', name: 'Electronics & Tech', chats: [] },
    { id: 'folder2', name: 'Textiles & Apparel', chats: ['2'] }
  ])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const addNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New Classification',
      timestamp: 'Just created'
    }
    setChatHistory([newChat, ...chatHistory])
    setActiveChat(newChat)
  }

  const addNewFolder = () => {
    const newFolder = {
      id: Date.now().toString(),
      name: 'New Category',
      chats: []
    }
    setFolders([...folders, newFolder])
  }

  const selectChat = chat => {
    setActiveChat(chat)
  }

  const updateChatHistory = (chatId, updates) => {
    setChatHistory(prev =>
      prev.map(chat => (chat.id === chatId ? { ...chat, ...updates } : chat))
    )
  }
  const ChatHistoryItem = ({ chat, isActive, onClick }) => {
    const [showMenu, setShowMenu] = useState(false)

    return (
      <div className='relative group'>
        <div
          className={`flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer ${
            isActive ? 'bg-blue-50 border-l-2 border-blue-500' : ''
          }`}
          onClick={onClick}
        >
          <div className='flex-1 min-w-0'>
            <p
              className={`text-sm font-medium truncate ${
                isActive ? 'text-blue-700' : 'text-gray-800'
              }`}
            >
              {chat.title}
            </p>
            <p className='text-xs text-gray-500'>{chat.timestamp}</p>
          </div>
          <button
            onClick={e => {
              e.stopPropagation()
              setShowMenu(!showMenu)
            }}
            className='opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded'
          >
            <span className='text-gray-400'>⋮</span>
          </button>
        </div>

        {showMenu && (
          <div className='absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32'>
            <button className='w-full text-left px-3 py-2 text-sm hover:bg-gray-50'>
              Edit
            </button>
            <button className='w-full text-left px-3 py-2 text-sm hover:bg-gray-50'>
              Move to folder
            </button>
            <button className='w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50'>
              Delete
            </button>
          </div>
        )}
      </div>
    )
  }
  return (
    // <div className='flex h-screen bg-gray-50'>
    //   <Sidebar
    //     toggleSidebar={toggleSidebar}
    //     addNewChat={addNewChat}
    //     addNewFolder={addNewFolder}
    //     folders={folders}
    //     chatHistory={chatHistory}
    //     ChatHistoryItem={ChatHistoryItem}
    //     sidebarCollapsed={sidebarCollapsed}
    //     activeChat={activeChat}
    //   />
    //   <div className='flex-1 flex flex-col'>
    //     <HeaderChat
    //       activeChat={activeChat}
    //       toggleSidebar={toggleSidebar}
    //       sidebarCollapsed={sidebarCollapsed}
    //     />
    <>{children}</>
    //   </div>
    // </div>
  )
}

export default MainLayout
