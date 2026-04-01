'use client'
import React from 'react'
import {
  CheckCircle,
  RefreshCw,
  FileText,
  Pause,
  XCircle,
  Clock
} from 'lucide-react'

export const parseSizeMB = (sizeStr = '0MB') => {
  const n = parseInt(String(sizeStr).replace(/[^0-9]/g, ''), 10)
  return Number.isFinite(n) ? n : 0
}

export const formatDate = isoString => {
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return isoString || '-'
  }
}

// status badge
export const statusBadge = status => {
  const map = {
    active:
      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    building:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    draft:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  }
  const cls =
    map[status] ||
    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${cls}`}>
      {status?.[0]?.toUpperCase() + status?.slice(1)}
    </span>
  )
}

// environment badge
export const envBadge = env => {
  const map = {
    production:
      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    staging:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    development:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
  }
  const cls =
    map[env] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${cls}`}>
      {env}
    </span>
  )
}

// status icon
export const statusIcon = status => {
  switch (status) {
    case 'active':
      return (
        <CheckCircle size={16} className='text-green-500 dark:text-green-400' />
      )
    case 'building':
      return (
        <RefreshCw
          size={16}
          className='text-blue-500 dark:text-blue-400 animate-spin'
        />
      )
    case 'draft':
      return (
        <FileText size={16} className='text-yellow-500 dark:text-yellow-400' />
      )
    case 'inactive':
      return <Pause size={16} className='text-gray-500 dark:text-gray-400' />
    case 'failed':
      return <XCircle size={16} className='text-red-500 dark:text-red-400' />
    default:
      return <Clock size={16} className='text-gray-500 dark:text-gray-400' />
  }
}
