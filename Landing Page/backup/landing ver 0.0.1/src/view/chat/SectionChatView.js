import { Bot, Copy, ThumbsDown, ThumbsUp, User } from 'lucide-react'
import React from 'react'

const SectionChatView = ({ chatMessages = null }) => {
  return (
    <div className='flex-1 overflow-y-auto p-6 space-y-6'>
      {chatMessages.map(msg => (
        <div
          key={msg.id}
          className={`flex ${
            msg.type === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`flex space-x-3 max-w-3xl ${
              msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              {msg.type === 'user' ? (
                <User className='w-5 h-5 text-blue-600' />
              ) : (
                <Bot className='w-5 h-5 text-gray-600' />
              )}
            </div>

            {/* Message Content */}
            <div
              className={`flex flex-col ${
                msg.type === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`rounded-2xl px-4 py-3 max-w-none ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt='Uploaded'
                    className='rounded-lg mb-2 max-w-xs'
                  />
                )}
                <p className='text-sm whitespace-pre-wrap'>{msg.content}</p>
              </div>

              {/* Message Actions */}
              <div className='flex items-center space-x-2 mt-2'>
                <span className='text-xs text-gray-500'>{msg.timestamp}</span>
                {msg.type === 'assistant' && (
                  <div className='flex items-center space-x-1'>
                    <button className='p-1 hover:bg-gray-100 rounded'>
                      <Copy className='w-3 h-3 text-gray-400' />
                    </button>
                    <button className='p-1 hover:bg-gray-100 rounded'>
                      <ThumbsUp className='w-3 h-3 text-gray-400' />
                    </button>
                    <button className='p-1 hover:bg-gray-100 rounded'>
                      <ThumbsDown className='w-3 h-3 text-gray-400' />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SectionChatView
