'use client'

import React from 'react'
import Providers from './providers'
import dynamic from 'next/dynamic'

const AppLayout = dynamic(() => import('@/layouts'), {
  ssr: false
})
const RootLayout = ({ children }) => {
  return (
    <Providers>
      <AppLayout>{children}</AppLayout>
    </Providers>
  )
}

export default RootLayout
