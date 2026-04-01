'use client'
import React, { useEffect, useRef } from 'react'
import { Settings, X, Play, Save, MessageSquare } from 'lucide-react'

const SettingsModal = ({
  open,
  onClose,
  models,
  vectors,
  testPrompts,
  selectedModel,
  setSelectedModel,
  selectedVector,
  setSelectedVector,
  temperature,
  setTemperature,
  onPickPrompt,
  onSave
}) => {
  const ref = useRef(null)

  // close on outside
  useEffect(() => {
    const handler = e => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    if (open) {
      document.addEventListener('mousedown', handler)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('mousedown', handler)
      document.body.style.overflow = 'unset'
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div
        ref={ref}
        className='bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'
      >
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700'>
          <div className='flex items-center gap-3'>
            <Settings className='text-blue-500' size={24} />
            <div>
              <h2 className='text-xl font-semibold'>Test Configuration</h2>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Configure AI models and testing parameters
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className='p-6 space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <label className='block text-sm font-medium mb-2'>AI Model</label>
              <select
                value={selectedModel}
                onChange={e => setSelectedModel(e.target.value)}
                className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                {models.map(m => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                Choose the AI model for responses
              </p>
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>
                Vector Database
              </label>
              <select
                value={selectedVector}
                onChange={e => setSelectedVector(e.target.value)}
                className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                {vectors.map(v => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                Select knowledge base for AI
              </p>
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>
                Temperature: {temperature}
              </label>
              <input
                type='range'
                min='0'
                max='1'
                step='0.1'
                value={temperature}
                onChange={e => setTemperature(parseFloat(e.target.value))}
                className='w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer'
              />
              <div className='flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1'>
                <span>Conservative (0.0)</span>
                <span>Creative (1.0)</span>
              </div>
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                Controls response creativity
              </p>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-medium mb-3 flex items-center gap-2'>
              <MessageSquare size={20} />
              <span>Quick Test Prompts</span>
            </h3>
            <p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
              Click on any prompt to use it in your chat
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              {testPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => onPickPrompt(p)}
                  className='p-4 text-left text-sm bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors group'
                >
                  <div className='flex items-start justify-between'>
                    <span className='flex-1'>{p}</span>
                    <Play
                      size={14}
                      className='text-gray-400 group-hover:text-blue-500 mt-0.5 ml-2 flex-shrink-0'
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'>
          <button
            onClick={onClose}
            className='px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg'
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg'
          >
            <Save size={16} />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
