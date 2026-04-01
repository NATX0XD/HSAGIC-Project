import { File, Image, Paperclip, Send, X } from 'lucide-react'
import React from 'react'

const SectionMessageInput = ({
  selectedFile,
  setSelectedFile = null,
  message,
  setMessage = null,
  handleSendMessage = null,
  handleFileSelect = null,
  handleKeyPress = null,
  fileInputRef
}) => {
  return (
    <div className='bg-white border-t border-gray-200 p-4'>
      {/* File Preview */}
      {selectedFile && (
        <div className='mb-4 p-3 bg-gray-50 rounded-lg flex items-center space-x-3'>
          <File className='w-5 h-5 text-gray-400' />
          <div className='flex-1'>
            <p className='text-sm font-medium text-gray-900'>
              {selectedFile.name}
            </p>
            <p className='text-xs text-gray-500'>
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            onClick={() => setSelectedFile(null)}
            className='p-1 hover:bg-gray-200 rounded'
          >
            <X className='w-4 h-4 text-gray-500' />
          </button>
        </div>
      )}

      <div className='flex items-end space-x-4'>
        {/* File Upload */}
        <div className='flex items-center space-x-2'>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept='image/*,.pdf,.doc,.docx'
            className='hidden'
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className='p-2 hover:bg-gray-100 rounded-lg text-gray-500'
          >
            <Paperclip className='w-5 h-5' />
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className='p-2 hover:bg-gray-100 rounded-lg text-gray-500'
          >
            <Image className='w-5 h-5' />
          </button>
        </div>

        {/* Message Input */}
        <div className='flex-1 relative'>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Ask about customs classification, upload product images, or describe your goods...'
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
            rows='1'
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendMessage}
          disabled={!message.trim() && !selectedFile}
          className={`p-3 rounded-lg transition-colors ${
            message.trim() || selectedFile
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className='w-5 h-5' />
        </button>
      </div>

      {/* Helper Text */}
      <p className='text-xs text-gray-500 mt-2 text-center'>
        Upload images of your products or describe them in detail for accurate
        HS code classification
      </p>
    </div>
  )
}

export default SectionMessageInput
