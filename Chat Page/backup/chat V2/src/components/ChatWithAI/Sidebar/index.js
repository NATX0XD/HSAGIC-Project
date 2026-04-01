import React from 'react'
import { MessageCircle, Menu, X, Plus, FolderPlus } from 'lucide-react'

const Sidebar = ({
  toggleSidebar,
  addNewChat,
  addNewFolder,
  folders,
  chatHistory,
  ChatHistoryItem,
  sidebarCollapsed,
  activeChat
}) => {
  return (
    <div
      className={`${
        sidebarCollapsed ? 'w-0' : 'w-80'
      } transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}
    >
      {/* Sidebar Header */}
      <div className='p-4 border-b border-gray-200'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-2'>
            <MessageCircle className='w-6 h-6 text-blue-600' />
            <h1 className='text-lg font-semibold text-gray-800'>
              HS Code Assistant
            </h1>
          </div>
          <button
            onClick={toggleSidebar}
            className='p-1 hover:bg-gray-100 rounded'
          >
            <X className='w-4 h-4' />
          </button>
        </div>

        <div className='flex space-x-2'>
          <button
            onClick={addNewChat}
            className='flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex-1'
          >
            <Plus className='w-4 h-4' />
            <span className='text-sm'>New Chat</span>
          </button>
          <button
            onClick={addNewFolder}
            className='p-2 border border-gray-300 rounded-lg hover:bg-gray-50'
          >
            <FolderPlus className='w-4 h-4' />
          </button>
        </div>
      </div>

      {/* Chat History - Middle Section */}
      <div className='flex-1 overflow-y-auto p-4'>
        {/* Folders */}
        {folders.map(folder => (
          <div key={folder.id} className='mb-4'>
            <div className='flex items-center space-x-2 p-2 text-sm font-medium text-gray-600 bg-gray-50 rounded'>
              <span>📁</span>
              <span>{folder.name}</span>
            </div>
            {folder.chats.map(chatId => {
              const chat = chatHistory.find(c => c.id === chatId)
              return chat ? (
                <div key={chat.id} className='ml-4 mt-1'>
                  <ChatHistoryItem
                    chat={chat}
                    isActive={activeChat?.id === chat.id}
                    onClick={() => selectChat(chat)}
                  />
                </div>
              ) : null
            })}
          </div>
        ))}

        {/* Ungrouped Chats */}
        <div className='space-y-1'>
          {chatHistory
            .filter(
              chat => !folders.some(folder => folder.chats.includes(chat.id))
            )
            .map(chat => (
              <ChatHistoryItem
                key={chat.id}
                chat={chat}
                isActive={activeChat?.id === chat.id}
                onClick={() => selectChat(chat)}
              />
            ))}
        </div>
      </div>

      {/* Footer - Mini Profile */}
      <div className='p-4 border-t border-gray-200'>
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
            <span className='text-white text-sm font-medium'>U</span>
          </div>
          <div className='flex-1'>
            <p className='text-sm font-medium text-gray-800'>User</p>
            <p className='text-xs text-gray-500'>user@example.com</p>
          </div>
          <button className='text-gray-400 hover:text-gray-600'>
            <span className='text-lg'>⚙️</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
