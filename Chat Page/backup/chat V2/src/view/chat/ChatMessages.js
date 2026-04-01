// ChatMessages.js
'use client'
import { useState, useEffect, useRef } from 'react'
import {
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  MoreHorizontal,
  User,
  Bot
} from 'lucide-react'

const ChatMessages = ({ messages = [], isTyping = false, onSendMessage }) => {
  const messagesEndRef = useRef(null)
  const [copiedMessageId, setCopiedMessageId] = useState(null)

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const copyToClipboard = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleRegenerate = messageId => {
    // Logic for regenerating AI response
    console.log('Regenerate message:', messageId)
  }

  const handleFeedback = (messageId, type) => {
    // Logic for handling feedback
    console.log(`${type} feedback for message:`, messageId)
  }

  return (
    <div className='flex-1 overflow-y-auto bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 py-6'>
        {messages.length === 0 ? (
          // Welcome Screen
          <div className='flex items-center justify-center h-full'>
            <div className='text-center'>
              <div className='w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Bot className='w-10 h-10 text-white' />
              </div>
              <h3 className='text-2xl font-semibold text-gray-800 mb-3'>
                Welcome to HS Code Assistant!
              </h3>
              <p className='text-gray-600 mb-8 max-w-md'>
                I'm here to help you find the correct Harmonized System (HS)
                codes for your products and assist with customs classification.
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto'>
                <SuggestionCard
                  icon='📱'
                  title='Electronic Devices'
                  description='Smartphones, speakers, computers, and electronic gadgets'
                  onClick={() =>
                    onSendMessage?.(
                      'I need help classifying an electronic device for customs'
                    )
                  }
                />
                <SuggestionCard
                  icon='👕'
                  title='Textiles & Clothing'
                  description='Fabrics, garments, shoes, and fashion accessories'
                  onClick={() =>
                    onSendMessage?.(
                      'I want to classify textile and clothing products'
                    )
                  }
                />
                <SuggestionCard
                  icon='🍎'
                  title='Food & Agriculture'
                  description='Fresh produce, processed foods, and agricultural products'
                  onClick={() =>
                    onSendMessage?.('Help me find HS codes for food products')
                  }
                />
                <SuggestionCard
                  icon='⚙️'
                  title='Machinery & Parts'
                  description='Industrial equipment, automotive parts, and machinery'
                  onClick={() =>
                    onSendMessage?.(
                      'I need classification for machinery and equipment'
                    )
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          // Messages List
          <div className='space-y-6'>
            {messages.map(message => (
              <MessageBubble
                key={message.id}
                message={message}
                onCopy={copyToClipboard}
                onRegenerate={handleRegenerate}
                onFeedback={handleFeedback}
                isCopied={copiedMessageId === message.id}
              />
            ))}

            {/* Typing Indicator */}
            {isTyping && <TypingIndicator />}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  )
}

// Suggestion Card Component
const SuggestionCard = ({ icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    className='p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group'
  >
    <div className='text-2xl mb-2'>{icon}</div>
    <h4 className='font-semibold text-gray-800 mb-1 group-hover:text-blue-600'>
      {title}
    </h4>
    <p className='text-sm text-gray-600'>{description}</p>
  </button>
)

// Message Bubble Component
const MessageBubble = ({
  message,
  onCopy,
  onRegenerate,
  onFeedback,
  isCopied
}) => {
  const [showActions, setShowActions] = useState(false)
  const isUser = message.sender === 'user'
  const isAI = message.sender === 'ai'

  return (
    <div
      className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* AI Avatar */}
      {isAI && (
        <div className='flex-shrink-0'>
          <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
            <Bot className='w-5 h-5 text-white' />
          </div>
        </div>
      )}

      {/* Message Content */}
      <div className={`flex-1 max-w-3xl ${isUser ? 'flex justify-end' : ''}`}>
        <div
          className={`p-4 rounded-2xl ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-200 text-gray-800'
          }`}
        >
          {/* Message Text */}
          <div className='prose prose-sm max-w-none'>
            {message.type === 'code' ? (
              <CodeBlock code={message.content} language={message.language} />
            ) : (
              <div className='whitespace-pre-wrap'>{message.content}</div>
            )}
          </div>

          {/* Timestamp */}
          <div
            className={`text-xs mt-2 ${
              isUser ? 'text-blue-100' : 'text-gray-500'
            }`}
          >
            {message.timestamp}
          </div>
        </div>

        {/* Message Actions */}
        {showActions && isAI && (
          <div className='flex items-center gap-1 ml-2 mt-1'>
            <ActionButton
              icon={<Copy className='w-4 h-4' />}
              tooltip={isCopied ? 'คัดลอกแล้ว!' : 'คัดลอก'}
              onClick={() => onCopy(message.content, message.id)}
              variant={isCopied ? 'success' : 'default'}
            />
            <ActionButton
              icon={<ThumbsUp className='w-4 h-4' />}
              tooltip='ถูกใจ'
              onClick={() => onFeedback(message.id, 'like')}
            />
            <ActionButton
              icon={<ThumbsDown className='w-4 h-4' />}
              tooltip='ไม่ถูกใจ'
              onClick={() => onFeedback(message.id, 'dislike')}
            />
            <ActionButton
              icon={<RotateCcw className='w-4 h-4' />}
              tooltip='สร้างใหม่'
              onClick={() => onRegenerate(message.id)}
            />
            <ActionButton
              icon={<MoreHorizontal className='w-4 h-4' />}
              tooltip='เพิ่มเติม'
              onClick={() => {}}
            />
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className='flex-shrink-0'>
          <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center'>
            <User className='w-5 h-5 text-gray-600' />
          </div>
        </div>
      )}
    </div>
  )
}

// Action Button Component
const ActionButton = ({ icon, tooltip, onClick, variant = 'default' }) => {
  const variants = {
    default: 'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
    success: 'text-green-600 bg-green-50'
  }

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all duration-200 ${variants[variant]}`}
      title={tooltip}
    >
      {icon}
    </button>
  )
}

// Code Block Component
const CodeBlock = ({ code, language = 'javascript' }) => {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code: ', err)
    }
  }

  return (
    <div className='relative bg-gray-900 rounded-lg overflow-hidden'>
      <div className='flex items-center justify-between px-4 py-2 bg-gray-800'>
        <span className='text-sm text-gray-300'>{language}</span>
        <button
          onClick={copyCode}
          className='text-sm text-gray-300 hover:text-white flex items-center gap-1'
        >
          <Copy className='w-4 h-4' />
          {copied ? 'คัดลอกแล้ว!' : 'คัดลอก'}
        </button>
      </div>
      <pre className='p-4 text-sm text-gray-100 overflow-x-auto'>
        <code>{code}</code>
      </pre>
    </div>
  )
}

// Typing Indicator Component
const TypingIndicator = () => (
  <div className='flex gap-4'>
    <div className='flex-shrink-0'>
      <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
        <Bot className='w-5 h-5 text-white' />
      </div>
    </div>
    <div className='bg-white border border-gray-200 rounded-2xl p-4'>
      <div className='flex space-x-1'>
        <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
        <div
          className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
          style={{ animationDelay: '0.1s' }}
        ></div>
        <div
          className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
          style={{ animationDelay: '0.2s' }}
        ></div>
      </div>
    </div>
  </div>
)

export default ChatMessages
