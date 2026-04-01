'use client'
import React, { useState, useRef, useEffect } from 'react'
import {
  Eye,
  Download,
  Trash2,
  Settings,
  Play,
  Pause,
  RefreshCw,
  AlertCircle,
  MoreVertical,
  Edit,
  Copy
} from 'lucide-react'
import { statusBadge, envBadge, statusIcon } from '../../../utils/utilsVector'

const VectorCard = ({
  vector,
  onBuild,
  onToggle,
  onDelete,
  onExport,
  onView,
  formatDate
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const dropdownItems = [
    {
      icon: Eye,
      label: 'View Details',
      action: () => {
        onView()
        setShowDropdown(false)
      },
      className:
        'text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20'
    },
    {
      icon: Edit,
      label: 'Edit Vector',
      action: () => {
        console.log('Edit vector')
        setShowDropdown(false)
      },
      className:
        'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
    },
    {
      icon: Copy,
      label: 'Duplicate',
      action: () => {
        console.log('Duplicate vector')
        setShowDropdown(false)
      },
      className:
        'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
    },
    {
      icon: Download,
      label: 'Export Data',
      action: () => {
        onExport()
        setShowDropdown(false)
      },
      className:
        'text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20'
    },
    {
      icon: Settings,
      label: 'Settings',
      action: () => {
        console.log('Settings')
        setShowDropdown(false)
      },
      className:
        'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
    },
    {
      type: 'divider'
    },
    {
      icon: Trash2,
      label: 'Delete Vector',
      action: () => {
        onDelete()
        setShowDropdown(false)
      },
      className:
        'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'
    }
  ]

  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
      {/* Header */}
      <div className='flex items-start justify-between mb-4'>
        <div className='flex-1'>
          <div className='flex items-center space-x-2 mb-1'>
            {statusIcon(vector.status)}
            <h3 className='font-semibold text-lg text-gray-900 dark:text-gray-100'>
              {vector.name}
            </h3>
          </div>
          <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>
            {vector.description}
          </p>
        </div>

        {/* Dropdown Menu */}
        <div className='relative ml-2' ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className='p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
            title='More actions'
          >
            <MoreVertical size={16} />
          </button>

          {/* Dropdown Panel */}
          {showDropdown && (
            <div className='absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50'>
              <div className='py-1'>
                {dropdownItems.map((item, index) => {
                  if (item.type === 'divider') {
                    return (
                      <div
                        key={index}
                        className='my-1 border-t border-gray-200 dark:border-gray-700'
                      />
                    )
                  }

                  const Icon = item.icon
                  return (
                    <button
                      key={index}
                      onClick={item.action}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left text-sm transition-colors ${item.className}`}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Badges */}
      <div className='flex items-center space-x-2 mb-4'>
        {statusBadge(vector.status)}
        {envBadge(vector.environment)}
        <span className='text-xs text-gray-500 dark:text-gray-400'>
          v{vector.version}
        </span>
      </div>

      {/* Progress */}
      {vector.status === 'building' && typeof vector.progress === 'number' && (
        <div className='mb-4'>
          <div className='flex items-center justify-between mb-1'>
            <span className='text-sm text-gray-600 dark:text-gray-300'>
              Building Progress
            </span>
            <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
              {Math.round(vector.progress)}%
            </span>
          </div>
          <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
            <div
              className='bg-blue-600 h-2 rounded-full transition-all duration-300'
              style={{ width: `${vector.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error */}
      {vector.status === 'failed' && vector.error && (
        <div className='mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded'>
          <div className='flex items-center space-x-2'>
            <AlertCircle size={14} className='text-red-500 dark:text-red-400' />
            <span className='text-sm text-red-700 dark:text-red-400'>
              {vector.error}
            </span>
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className='grid grid-cols-2 gap-4 mb-4'>
        <div>
          <p className='text-xs text-gray-500 dark:text-gray-400'>Documents</p>
          <p className='font-semibold text-gray-900 dark:text-gray-100'>
            {vector.documents.toLocaleString()}
          </p>
        </div>
        <div>
          <p className='text-xs text-gray-500 dark:text-gray-400'>Size</p>
          <p className='font-semibold text-gray-900 dark:text-gray-100'>
            {vector.size}
          </p>
        </div>
        <div>
          <p className='text-xs text-gray-500 dark:text-gray-400'>Accuracy</p>
          <p className='font-semibold text-gray-900 dark:text-gray-100'>
            {vector.accuracy > 0 ? `${vector.accuracy}%` : 'N/A'}
          </p>
        </div>
        <div>
          <p className='text-xs text-gray-500 dark:text-gray-400'>Usage</p>
          <p className='font-semibold text-gray-900 dark:text-gray-100'>
            {vector.usage}%
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3'>
          <span>Updated: {formatDate(vector.lastUpdate)}</span>
          <span>{vector.queries.toLocaleString()} queries</span>
        </div>

        {/* Main Action Button */}
        <div className='flex items-center justify-center'>
          {vector.status === 'draft' || vector.status === 'failed' ? (
            <button
              onClick={onBuild}
              className='w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors'
            >
              <Play size={16} />
              <span>Build Vector</span>
            </button>
          ) : vector.status === 'building' ? (
            <button
              disabled
              className='w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-400 text-white text-sm rounded-lg cursor-not-allowed'
            >
              <RefreshCw size={16} className='animate-spin' />
              <span>Building...</span>
            </button>
          ) : (
            <button
              onClick={onToggle}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                vector.status === 'active'
                  ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30 dark:text-yellow-400'
                  : 'bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:text-green-400'
              }`}
            >
              {vector.status === 'active' ? (
                <>
                  <Pause size={16} />
                  <span>Deactivate</span>
                </>
              ) : (
                <>
                  <Play size={16} />
                  <span>Activate</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default VectorCard
