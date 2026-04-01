'use client'
import React, { useEffect, useRef } from 'react'

const DetailModal = ({ vector, onClose }) => {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!vector) return
    // focus เมื่อเปิด
    panelRef.current?.focus()
    // ปิดด้วย Esc
    const onKey = e => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    // ล็อคสกอลล์พื้นหลังแบบง่าย ๆ
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [vector, onClose])

  if (!vector) return null

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
      onClick={onClose} // คลิกฉากหลังเพื่อปิด
      aria-hidden='false'
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='vector-modal-title'
        className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg w-full max-w-2xl mx-4 max-h-[28rem] overflow-y-auto shadow-lg outline-none'
        onClick={e => e.stopPropagation()} // กันคลิกทะลุ
        tabIndex={-1}
        ref={panelRef}
      >
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
          <h3
            id='vector-modal-title'
            className='text-lg font-semibold text-gray-900 dark:text-gray-100'
          >
            {vector.name}
          </h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors'
            aria-label='Close'
            title='Close'
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className='px-6 py-5 space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              Description
            </label>
            <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
              {vector.description}
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Model
              </label>
              <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                {vector.model}
              </p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Dimensions
              </label>
              <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                {vector.dimensions}
              </p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Build Time
              </label>
              <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                {vector.buildTime}
              </p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Environment
              </label>
              <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                {vector.environment}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200 text-gray-700 
                       dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition-colors'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetailModal
