'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Upload, Database } from 'lucide-react'
import { usePageTitle } from '@/context/PageTitleContext'
import UploadArea from './UploadArea'
import VectorManagement from './VectorManagement'

const DataUploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: 'hs_codes_database_2024.xlsx',
      size: '12.5 MB',
      type: 'Excel',
      status: 'processed',
      uploadDate: '2024-08-15',
      records: 15420,
      vectorStatus: 'ready'
    },
    {
      id: 2,
      name: 'customs_regulations.pdf',
      size: '8.2 MB',
      type: 'PDF',
      status: 'processing',
      uploadDate: '2024-08-18',
      records: 0,
      vectorStatus: 'building',
      progress: 65
    },
    {
      id: 3,
      name: 'trade_classification_guide.docx',
      size: '3.1 MB',
      type: 'Word',
      status: 'failed',
      uploadDate: '2024-08-17',
      records: 0,
      vectorStatus: 'failed',
      error: 'Unsupported format'
    }
  ])

  const [vectors, setVectors] = useState([
    {
      id: 1,
      name: 'HS_Codes_Vector_v2.4',
      description: 'Primary HS code classification vector database',
      status: 'active',
      size: '256MB',
      documents: 15420,
      lastUpdate: '2024-08-15',
      accuracy: 94.2,
      usage: 85
    },
    {
      id: 2,
      name: 'Customs_Rules_Vector_v1.2',
      description: 'Customs regulations and procedures vector',
      status: 'building',
      size: '128MB',
      documents: 8950,
      lastUpdate: '2024-08-18',
      accuracy: 0,
      usage: 0,
      progress: 65
    },
    {
      id: 3,
      name: 'Trade_Classifications_v1.0',
      description: 'International trade classification guidelines',
      status: 'draft',
      size: '64MB',
      documents: 3200,
      lastUpdate: '2024-08-10',
      accuracy: 89.1,
      usage: 23
    }
  ])

  const [dragActive, setDragActive] = useState(false)
  const [activeTab, setActiveTab] = useState('upload')
  const fileInputRef = useRef(null)

  const { setTitle } = usePageTitle()
  useEffect(() => setTitle('Data Upload & Vector Management'), [setTitle])

  // ==== Upload handlers ====
  const handleDrag = e => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const detectType = file => {
    const t = (file.type || '').toLowerCase()
    const n = (file.name || '').toLowerCase()
    if (t.includes('pdf') || n.endsWith('.pdf')) return 'PDF'
    if (t.includes('excel') || n.endsWith('.xlsx') || n.endsWith('.csv'))
      return 'Excel'
    if (t.includes('word') || n.endsWith('.docx')) return 'Word'
    return 'Unknown'
  }

  const handleFiles = files => {
    Array.from(files).forEach(file => {
      const id = Date.now() + Math.random()
      const newFile = {
        id,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: detectType(file),
        status: 'uploading',
        uploadDate: new Date().toISOString().split('T')[0],
        records: 0,
        vectorStatus: 'pending',
        progress: 0
      }
      setUploadedFiles(prev => [...prev, newFile])

      // simulate upload
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 20
        if (progress >= 100) {
          clearInterval(interval)
          setUploadedFiles(prev =>
            prev.map(f =>
              f.id === id
                ? {
                    ...f,
                    status: 'processed',
                    progress: 100,
                    records: Math.floor(Math.random() * 10000) + 1000,
                    vectorStatus: 'ready'
                  }
                : f
            )
          )
        } else {
          setUploadedFiles(prev =>
            prev.map(f => (f.id === id ? { ...f, progress } : f))
          )
        }
      }, 500)
    })
  }

  const handleDeleteFile = id => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id))
  }

  // ==== Vector handlers ====
  const buildVector = fileId => {
    const newId = Date.now()
    const newVector = {
      id: newId,
      name: `Vector_${newId}`,
      description: 'Auto-generated vector from uploaded file',
      status: 'building',
      size: '0MB',
      documents: 0,
      lastUpdate: new Date().toISOString().split('T')[0],
      accuracy: 0,
      usage: 0,
      progress: 0
    }
    setVectors(prev => [...prev, newVector])

    // simulate building
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        clearInterval(interval)
        setVectors(prev =>
          prev.map(v =>
            v.id === newId
              ? {
                  ...v,
                  status: 'active',
                  progress: 100,
                  size: `${Math.floor(Math.random() * 200) + 50}MB`,
                  documents: Math.floor(Math.random() * 10000) + 1000,
                  accuracy: Number((Math.random() * 10 + 85).toFixed(1)),
                  lastUpdate: new Date().toISOString().split('T')[0]
                }
              : v
          )
        )
      } else {
        setVectors(prev =>
          prev.map(v => (v.id === newId ? { ...v, progress } : v))
        )
      }
    }, 800)
  }

  const handleDeleteVector = id => {
    setVectors(prev => prev.filter(v => v.id !== id))
  }

  return (
    <div className='space-y-6'>
      {/* Tab Navigation */}
      <div className='flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit border border-gray-200 dark:border-gray-700'>
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            ${
              activeTab === 'upload'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200 dark:border-gray-700'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          aria-pressed={activeTab === 'upload'}
        >
          <Upload size={16} className='inline mr-2 text-current' />
          File Upload
        </button>

        <button
          onClick={() => setActiveTab('vectors')}
          className={`px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            ${
              activeTab === 'vectors'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200 dark:border-gray-700'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          aria-pressed={activeTab === 'vectors'}
        >
          <Database size={16} className='inline mr-2 text-current' />
          Vector Management
        </button>
      </div>

      {activeTab === 'upload' && (
        <UploadArea
          dragActive={dragActive}
          onDrag={handleDrag}
          onDrop={handleDrop}
          fileInputRef={fileInputRef}
          onPickFiles={() => fileInputRef.current?.click()}
          onSelectFiles={e => handleFiles(e.target.files)}
          uploadedFiles={uploadedFiles}
          onBuildVector={buildVector}
          onDeleteFile={handleDeleteFile}
        />
      )}

      {activeTab === 'vectors' && (
        <VectorManagement
          vectors={vectors}
          onDeleteVector={handleDeleteVector}
        />
      )}
    </div>
  )
}

export default DataUploadPage
