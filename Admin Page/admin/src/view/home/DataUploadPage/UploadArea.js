'use client'
import React from 'react'
import { Upload, FileText, BarChart3, File, Trash2 } from 'lucide-react'

const getFileIcon = type => {
  switch (type) {
    case 'PDF':
      return <FileText className='text-red-500' size={24} />
    case 'Excel':
      return <BarChart3 className='text-green-500' size={24} />
    case 'Word':
      return <FileText className='text-blue-500' size={24} />
    default:
      return <File className='text-gray-500 dark:text-gray-400' size={24} />
  }
}

const getStatusColor = status => {
  switch (status) {
    case 'processed':
      return 'text-green-500'
    case 'processing':
    case 'uploading':
      return 'text-yellow-500'
    case 'failed':
      return 'text-red-500'
    default:
      return 'text-gray-500 dark:text-gray-400'
  }
}

const getVectorColor = st => {
  switch (st) {
    case 'ready':
      return 'text-green-500'
    case 'building':
    case 'pending':
      return 'text-blue-500'
    case 'failed':
      return 'text-red-500'
    default:
      return 'text-gray-500 dark:text-gray-400'
  }
}

const UploadArea = ({
  dragActive,
  onDrag,
  onDrop,
  fileInputRef,
  onPickFiles,
  onSelectFiles,
  uploadedFiles,
  onBuildVector,
  onDeleteFile
}) => {
  return (
    <>
      {/* Upload box */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
        <h3 className='text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100'>
          Upload Training Data
        </h3>
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
          onDragEnter={onDrag}
          onDragLeave={onDrag}
          onDragOver={onDrag}
          onDrop={onDrop}
        >
          <Upload
            className='mx-auto mb-4 text-gray-400 dark:text-gray-500'
            size={48}
          />
          <h4 className='text-lg font-medium mb-2 text-gray-900 dark:text-gray-100'>
            Drag and drop files here, or click to browse
          </h4>
          <p className='text-gray-500 dark:text-gray-400 mb-4'>
            Supports: Excel (.xlsx), PDF, Word (.docx), CSV files
          </p>
          <button
            onClick={onPickFiles}
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors'
          >
            Choose Files
          </button>
          <input
            ref={fileInputRef}
            type='file'
            multiple
            accept='.xlsx,.pdf,.docx,.csv'
            onChange={onSelectFiles}
            className='hidden'
          />
        </div>
      </div>

      {/* Uploaded list */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
            Uploaded Files
          </h3>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            {uploadedFiles.length} files
          </span>
        </div>

        <div className='space-y-3'>
          {uploadedFiles.map(file => (
            <div
              key={file.id}
              className='flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
            >
              <div className='flex items-center space-x-3'>
                {getFileIcon(file.type)}
                <div>
                  <h4 className='font-medium text-gray-900 dark:text-gray-100'>
                    {file.name}
                  </h4>
                  <div className='flex flex-wrap items-center gap-x-4 text-sm text-gray-500 dark:text-gray-400'>
                    <span>{file.size}</span>
                    <span>{file.uploadDate}</span>
                    {file.records > 0 && (
                      <span>{file.records.toLocaleString()} records</span>
                    )}
                  </div>

                  {file.status === 'uploading' &&
                    typeof file.progress === 'number' && (
                      <div className='mt-2'>
                        <div className='flex items-center space-x-2'>
                          <div className='w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                            <div
                              className='bg-blue-600 h-2 rounded-full transition-all'
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                          <span className='text-xs text-gray-700 dark:text-gray-300'>
                            {Math.round(file.progress)}%
                          </span>
                        </div>
                      </div>
                    )}

                  {file.error && (
                    <p className='text-red-500 text-sm mt-1'>{file.error}</p>
                  )}
                </div>
              </div>

              <div className='flex items-center space-x-3'>
                <div className='text-right'>
                  <div
                    className={`text-sm font-medium ${getStatusColor(
                      file.status
                    )}`}
                  >
                    {file.status === 'uploading'
                      ? 'Uploading...'
                      : file.status === 'processing'
                      ? 'Processing...'
                      : file.status === 'processed'
                      ? 'Processed'
                      : 'Failed'}
                  </div>
                  <div
                    className={`text-xs ${getVectorColor(file.vectorStatus)}`}
                  >
                    Vector: {file.vectorStatus}
                  </div>
                </div>

                {file.status === 'processed' && file.vectorStatus === 'ready' && (
                  <button
                    onClick={() => onBuildVector(file.id)}
                    className='bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors'
                  >
                    Build Vector
                  </button>
                )}

                <button
                  onClick={() => onDeleteFile(file.id)}
                  className='text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors'
                  aria-label='Delete file'
                  title='Delete'
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default UploadArea
