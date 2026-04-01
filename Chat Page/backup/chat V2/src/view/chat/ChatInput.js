// ChatInput.js
'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Paperclip,
  Mic,
  Square,
  Image,
  FileText,
  Smile
} from 'lucide-react'

const ChatInput = ({
  onSendMessage,
  disabled = false,
  placeholder = 'Describe your product for HS code classification...',
  isRecording = false,
  onStartRecording,
  onStopRecording
}) => {
  const [message, setMessage] = useState('')
  const [attachments, setAttachments] = useState([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isComposing, setIsComposing] = useState(false)
  const textareaRef = useRef(null)
  const fileInputRef = useRef(null)

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }, [message])

  const handleSubmit = e => {
    e.preventDefault()
    if (message.trim() || attachments.length > 0) {
      const messageData = {
        id: Date.now().toString(),
        content: message.trim(),
        attachments: [...attachments],
        timestamp: new Date().toLocaleTimeString('th-TH', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        sender: 'user',
        type: 'text'
      }

      onSendMessage(messageData)
      setMessage('')
      setAttachments([])
      setShowEmojiPicker(false)
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleFileSelect = e => {
    const files = Array.from(e.target.files)
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }))

    setAttachments(prev => [...prev, ...newAttachments])
    e.target.value = '' // Reset file input
  }

  const removeAttachment = id => {
    setAttachments(prev => {
      const updated = prev.filter(att => att.id !== id)
      // Clean up object URLs
      const removed = prev.find(att => att.id === id)
      if (removed?.preview) {
        URL.revokeObjectURL(removed.preview)
      }
      return updated
    })
  }

  const insertEmoji = emoji => {
    setMessage(prev => prev + emoji)
    setShowEmojiPicker(false)
    textareaRef.current?.focus()
  }

  const canSend = message.trim() || attachments.length > 0

  return (
    <div className='bg-white border-t border-gray-200'>
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className='px-4 py-2 border-b border-gray-100'>
          <div className='flex flex-wrap gap-2'>
            {attachments.map(attachment => (
              <AttachmentPreview
                key={attachment.id}
                attachment={attachment}
                onRemove={() => removeAttachment(attachment.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className='px-4 py-2 border-b border-gray-100'>
          <EmojiPicker onEmojiSelect={insertEmoji} />
        </div>
      )}

      {/* Input Area */}
      <div className='p-4'>
        <div className='max-w-4xl mx-auto'>
          <form onSubmit={handleSubmit} className='flex items-end gap-3'>
            {/* Attachment Button */}
            <div className='flex-shrink-0'>
              <button
                type='button'
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className='p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                title='แนบไฟล์'
              >
                <Paperclip className='w-5 h-5' />
              </button>
              <input
                ref={fileInputRef}
                type='file'
                multiple
                onChange={handleFileSelect}
                className='hidden'
                accept='image/*,video/*,audio/*,.pdf,.doc,.docx,.txt'
              />
            </div>

            {/* Message Input */}
            <div className='flex-1 relative'>
              <textarea
                ref={textareaRef}
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                placeholder={placeholder}
                disabled={disabled}
                className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed'
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />

              {/* Emoji Button */}
              <button
                type='button'
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                disabled={disabled}
                className='absolute right-2 bottom-2 p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors disabled:opacity-50'
                title='อีโมจิ'
              >
                <Smile className='w-4 h-4' />
              </button>
            </div>

            {/* Voice/Send Button */}
            <div className='flex-shrink-0'>
              {canSend ? (
                <button
                  type='submit'
                  disabled={disabled}
                  className='p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  title='ส่งข้อความ'
                >
                  <Send className='w-5 h-5' />
                </button>
              ) : (
                <button
                  type='button'
                  onClick={isRecording ? onStopRecording : onStartRecording}
                  disabled={disabled}
                  className={`p-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    isRecording
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  title={isRecording ? 'หยุดบันทึกเสียง' : 'บันทึกเสียง'}
                >
                  {isRecording ? (
                    <Square className='w-5 h-5' />
                  ) : (
                    <Mic className='w-5 h-5' />
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Input Hints */}
          <div className='mt-2 text-xs text-gray-500 text-center'>
            Press Enter to send, Shift + Enter for new line
          </div>
        </div>
      </div>
    </div>
  )
}

// Attachment Preview Component
const AttachmentPreview = ({ attachment, onRemove }) => {
  const getIcon = () => {
    if (attachment.type.startsWith('image/'))
      return <Image className='w-4 h-4' />
    if (attachment.type.startsWith('video/'))
      return <FileText className='w-4 h-4' />
    if (attachment.type.startsWith('audio/')) return <Mic className='w-4 h-4' />
    return <FileText className='w-4 h-4' />
  }

  const formatFileSize = bytes => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className='flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border'>
      {attachment.preview ? (
        <img
          src={attachment.preview}
          alt={attachment.name}
          className='w-8 h-8 object-cover rounded'
        />
      ) : (
        <div className='w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-gray-500'>
          {getIcon()}
        </div>
      )}

      <div className='flex-1 min-w-0'>
        <p className='text-sm font-medium text-gray-800 truncate'>
          {attachment.name}
        </p>
        <p className='text-xs text-gray-500'>
          {formatFileSize(attachment.size)}
        </p>
      </div>

      <button
        onClick={onRemove}
        className='text-gray-400 hover:text-red-500 transition-colors'
        title='ลบไฟล์'
      >
        ✕
      </button>
    </div>
  )
}

// Simple Emoji Picker Component
const EmojiPicker = ({ onEmojiSelect }) => {
  const emojis = [
    '😊',
    '😂',
    '🥰',
    '😍',
    '🤔',
    '😎',
    '😢',
    '😭',
    '😡',
    '🤯',
    '😴',
    '🥳',
    '🤝',
    '👍',
    '👎',
    '❤️',
    '🔥',
    '💯',
    '✨',
    '🎉',
    '🚀',
    '💡',
    '🌟',
    '⭐'
  ]

  return (
    <div className='grid grid-cols-8 gap-1 max-w-sm'>
      {emojis.map((emoji, index) => (
        <button
          key={index}
          onClick={() => onEmojiSelect(emoji)}
          className='p-2 text-lg hover:bg-gray-100 rounded transition-colors'
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}

export default ChatInput
