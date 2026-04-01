'use client'
import React, { useEffect, useRef } from 'react'
import { Bot } from 'lucide-react'
import MessageBubble from './MessageBubble'

const MessagesList = ({ messages, isTyping, onCopy, onAccuracy }) => {
  const endRef = useRef(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className='flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-8rem)]'>
      {messages.length === 0 ? (
        <div className='text-center text-gray-500 dark:text-gray-400 mt-20'>
          <Bot
            size={48}
            className='mx-auto mb-4 text-gray-300 dark:text-gray-600'
          />
          <h3 className='text-lg font-medium mb-2'>
            Start Testing AI Responses
          </h3>
          <p>Send a message or open Settings to use quick prompts</p>
        </div>
      ) : (
        messages.map(m => (
          <MessageBubble
            key={m.id}
            message={m}
            onCopy={onCopy}
            onAccuracy={onAccuracy}
          />
        ))
      )}

      {isTyping && (
        <div className='flex justify-start'>
          <div className='bg-gray-100 dark:bg-gray-700 p-4 rounded-lg'>
            <div className='flex items-center space-x-3'>
              <div className='bg-gray-200 dark:bg-gray-600 p-2 rounded-full'>
                <Bot size={16} className='text-gray-600 dark:text-gray-300' />
              </div>
              <div className='flex space-x-1'>
                <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' />
                <div
                  className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                  style={{ animationDelay: '0.1s' }}
                />
                <div
                  className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  )
}

export default MessagesList
