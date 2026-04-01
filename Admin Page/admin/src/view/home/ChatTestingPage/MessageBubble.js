'use client'
import React from 'react'
import { Bot, User, Clock, Copy, Zap, ThumbsUp, ThumbsDown } from 'lucide-react'

const MessageBubble = ({ message, onCopy, onAccuracy }) => {
  const isUser = message.type === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-3xl p-4 rounded-lg ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
        }`}
      >
        <div className='flex items-start space-x-3'>
          <div
            className={`p-2 rounded-full ${
              isUser ? 'bg-blue-700' : 'bg-gray-200 dark:bg-gray-600'
            }`}
          >
            {isUser ? (
              <User size={16} className='text-white' />
            ) : (
              <Bot size={16} className='text-gray-600 dark:text-gray-300' />
            )}
          </div>

          <div className='flex-1'>
            <div className='whitespace-pre-wrap'>{message.content}</div>

            {message.type === 'ai' ? (
              <div className='mt-3 pt-3 border-t border-gray-200 dark:border-gray-600'>
                <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
                  <div className='flex items-center space-x-4'>
                    <span className='flex items-center space-x-1'>
                      <Clock size={12} />
                      <span>{message.responseTime}s</span>
                    </span>
                    <span className='flex items-center space-x-1'>
                      <Zap size={12} />
                      <span>{message.confidence}%</span>
                    </span>
                    <span>{message._formattedTime}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <button
                      onClick={() => onAccuracy(message.id, 'correct')}
                      className={`p-1 rounded ${
                        message.accuracy === 'correct'
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400'
                          : 'hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-400'
                      }`}
                    >
                      <ThumbsUp size={12} />
                    </button>
                    <button
                      onClick={() => onAccuracy(message.id, 'incorrect')}
                      className={`p-1 rounded ${
                        message.accuracy === 'incorrect'
                          ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400'
                          : 'hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400'
                      }`}
                    >
                      <ThumbsDown size={12} />
                    </button>
                    <button
                      onClick={() => onCopy(message.content)}
                      className='p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400'
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className='mt-2 text-xs text-blue-200'>
                {message._formattedTime}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
