'use client'
import React from 'react'
import { Send } from 'lucide-react'

const InputBar = ({ value, onChange, onSend, disabled }) => (
  <div className='p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-lg'>
    <div className='flex gap-3'>
      <input
        type='text'
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyPress={e => (e.key === 'Enter' && !e.shiftKey ? onSend() : null)}
        placeholder='Ask about HS code classification...'
        className='flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        disabled={disabled}
      />
      <button
        onClick={onSend}
        disabled={!value.trim() || disabled}
        className='px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors inline-flex items-center gap-2'
      >
        <Send size={16} />
        <span>Send</span>
      </button>
    </div>
  </div>
)

export default InputBar
