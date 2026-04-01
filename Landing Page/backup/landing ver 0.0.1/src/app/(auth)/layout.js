'use client'
import dynamic from 'next/dynamic'
const AppLayout = dynamic(() => import('@/layout'), {
  ssr: false
})

export default function RootLayout ({ children }) {
  return <AppLayout>{children}</AppLayout>
}
