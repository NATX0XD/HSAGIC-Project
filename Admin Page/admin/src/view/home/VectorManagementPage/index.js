'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { usePageTitle } from '@/context/PageTitleContext'
import StatsOverview from './StatsOverview'
import ControlsBar from './ControlsBar'
import VectorCard from './VectorCard'
import DetailModal from './DetailModal'
import { formatDate, parseSizeMB } from '@/utils/utilsVector'

const VectorManagement = () => {
  const { setTitle } = usePageTitle()
  useEffect(() => {
    setTitle('Vector Management')
  }, [setTitle])

  const [vectors, setVectors] = useState([
    {
      id: 1,
      name: 'HS_Codes_Vector_v2.4',
      description:
        'Primary HS code classification vector database with latest trade data',
      status: 'active',
      size: '256MB',
      documents: 15420,
      dimensions: 1536,
      lastUpdate: '2024-08-15T14:30:00Z',
      accuracy: 94.2,
      usage: 85,
      queries: 12847,
      buildTime: '45 minutes',
      model: 'text-embedding-ada-002',
      version: '2.4',
      environment: 'production'
    },
    {
      id: 2,
      name: 'Customs_Rules_Vector_v1.2',
      description:
        'Customs regulations and procedures vector for compliance queries',
      status: 'building',
      size: '128MB',
      documents: 8950,
      dimensions: 1536,
      lastUpdate: '2024-08-18T10:15:00Z',
      accuracy: 0,
      usage: 0,
      queries: 0,
      buildTime: 'In progress',
      progress: 67,
      model: 'text-embedding-ada-002',
      version: '1.2',
      environment: 'staging'
    },
    {
      id: 3,
      name: 'Trade_Classifications_v1.0',
      description: 'International trade classification guidelines and examples',
      status: 'draft',
      size: '64MB',
      documents: 3200,
      dimensions: 1536,
      lastUpdate: '2024-08-10T16:45:00Z',
      accuracy: 89.1,
      usage: 23,
      queries: 1247,
      buildTime: '18 minutes',
      model: 'text-embedding-ada-002',
      version: '1.0',
      environment: 'development'
    },
    {
      id: 4,
      name: 'Historical_Tariffs_Vector_v1.1',
      description: 'Historical tariff data and classification precedents',
      status: 'inactive',
      size: '92MB',
      documents: 5678,
      dimensions: 1536,
      lastUpdate: '2024-07-28T09:20:00Z',
      accuracy: 87.8,
      usage: 5,
      queries: 456,
      buildTime: '32 minutes',
      model: 'text-embedding-ada-002',
      version: '1.1',
      environment: 'production'
    },
    {
      id: 5,
      name: 'Product_Descriptions_Vector_v2.1',
      description: 'Enhanced product description embeddings for classification',
      status: 'failed',
      size: '0MB',
      documents: 0,
      dimensions: 1536,
      lastUpdate: '2024-08-17T12:30:00Z',
      accuracy: 0,
      usage: 0,
      queries: 0,
      buildTime: 'Failed',
      error: 'Insufficient training data',
      model: 'text-embedding-ada-002',
      version: '2.1',
      environment: 'development'
    }
  ])

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [env, setEnv] = useState('All')

  const [detail, setDetail] = useState(null) // vector object or null

  const filtered = useMemo(() => {
    return vectors.filter(v => {
      const q = search.trim().toLowerCase()
      const matchesQ =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
      const matchesS = status === 'All' || v.status === status
      const matchesE = env === 'All' || v.environment === env
      return matchesQ && matchesS && matchesE
    })
  }, [vectors, search, status, env])

  // === handlers ===
  const createNew = () => {
    setVectors(prev => [
      ...prev,
      {
        id: Date.now(),
        name: 'New_Vector_v1.0',
        description: 'New vector database',
        status: 'draft',
        size: '0MB',
        documents: 0,
        dimensions: 1536,
        lastUpdate: new Date().toISOString(),
        accuracy: 0,
        usage: 0,
        queries: 0,
        buildTime: 'Not built',
        model: 'text-embedding-ada-002',
        version: '1.0',
        environment: 'development'
      }
    ])
  }

  const startBuild = id => {
    setVectors(prev =>
      prev.map(v =>
        v.id === id ? { ...v, status: 'building', progress: 0 } : v
      )
    )
    let progress = 0
    const timer = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        clearInterval(timer)
        setVectors(prev =>
          prev.map(v =>
            v.id === id
              ? {
                  ...v,
                  status: 'active',
                  progress: undefined,
                  lastUpdate: new Date().toISOString(),
                  accuracy: Number((Math.random() * 10 + 85).toFixed(1)),
                  buildTime: 'auto'
                }
              : v
          )
        )
      } else {
        setVectors(prev =>
          prev.map(v => (v.id === id ? { ...v, progress } : v))
        )
      }
    }, 1000)
  }

  const toggleActive = id => {
    setVectors(prev =>
      prev.map(v =>
        v.id === id
          ? {
              ...v,
              status: v.status === 'active' ? 'inactive' : 'active',
              lastUpdate: new Date().toISOString()
            }
          : v
      )
    )
  }

  const removeVector = id => {
    if (!window.confirm('Delete this vector? This cannot be undone.')) return
    setVectors(prev => prev.filter(v => v.id !== id))
  }

  const exportData = vector => {
    const payload = { ...vector, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${vector.name.toLowerCase().replace(/\s+/g, '_')}_export.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // === totals ===
  const totals = useMemo(() => {
    const docs = vectors.reduce((s, v) => s + v.documents, 0)
    const storageMB = vectors.reduce((s, v) => s + parseSizeMB(v.size), 0)
    const accArr = vectors.filter(v => v.accuracy > 0).map(v => v.accuracy)
    const avgAcc = accArr.length
      ? accArr.reduce((s, a) => s + a, 0) / accArr.length
      : 0
    const activeCount = vectors.filter(v => v.status === 'active').length
    return { docs, storageMB, avgAcc, activeCount }
  }, [vectors])

  return (
    <div className='space-y-6'>
      <StatsOverview
        total={vectors.length}
        active={totals.activeCount}
        docs={totals.docs}
        storageMB={totals.storageMB}
        avgAcc={totals.avgAcc}
      />

      <ControlsBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        env={env}
        setEnv={setEnv}
        onCreate={createNew}
      />

      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
        {filtered.map(v => (
          <VectorCard
            key={v.id}
            vector={v}
            onBuild={() => startBuild(v.id)}
            onToggle={() => toggleActive(v.id)}
            onDelete={() => removeVector(v.id)}
            onExport={() => exportData(v)}
            onView={() => setDetail(v)}
            formatDate={formatDate}
          />
        ))}
      </div>

      <div className='flex items-center justify-between text-sm text-gray-500'>
        <span>
          Showing {filtered.length} of {vectors.length} vectors
        </span>
        <div className='flex items-center space-x-4'>
          <span>Total storage: {totals.storageMB}MB</span>
          <span>Active vectors: {totals.activeCount}</span>
        </div>
      </div>

      {detail && (
        <DetailModal vector={detail} onClose={() => setDetail(null)} />
      )}
    </div>
  )
}

export default VectorManagement
