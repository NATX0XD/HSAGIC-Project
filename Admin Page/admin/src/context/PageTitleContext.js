// context/PageTitleContext.js
'use client'
import { createContext, useContext, useState, useMemo } from 'react'

const PageTitleContext = createContext(null)

export function PageTitleProvider ({ children }) {
  const [title, setTitle] = useState('Dashboard')
  const value = useMemo(() => ({ title, setTitle }), [title])
  return (
    <PageTitleContext.Provider value={value}>
      {children}
    </PageTitleContext.Provider>
  )
}

export function usePageTitle () {
  const ctx = useContext(PageTitleContext)
  if (!ctx)
    throw new Error('usePageTitle must be used within PageTitleProvider')
  return ctx
}
