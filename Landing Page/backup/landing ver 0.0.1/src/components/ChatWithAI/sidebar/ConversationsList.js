import { MessageCircle } from 'lucide-react'
import React from 'react'

const ConversationsList = ({ conversations = null }) => {
  return (
    <div className='flex-1 overflow-y-auto p-4'>
      <div className='space-y-2'>
        {conversations.map(conv => (
          <div
            key={conv.id}
            className='p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-colors'
          >
            <div className='flex items-start space-x-3'>
              <MessageCircle className='w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0' />
              <div className='flex-1 min-w-0'>
                <h3 className='text-sm font-medium text-gray-900 truncate'>
                  {conv.title}
                </h3>
                <p className='text-xs text-gray-500 mt-1 truncate'>
                  {conv.preview}
                </p>
                <p className='text-xs text-gray-400 mt-1'>{conv.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConversationsList
