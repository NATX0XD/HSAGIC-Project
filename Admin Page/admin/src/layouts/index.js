'use client'
import { usePathname } from 'next/navigation'
import '@/themes/styles/globals.css'
import AuthLayout from './AuthLayout'
import ErrorLayout from './ErrorLayout'
// import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import MainLayout from './MainLayout'
// import { SocketProvider } from '@/context/socketContext'

const layouts = {
  MainLayout,
  AuthLayout,
  ErrorLayout
}
const AppLayout = ({ children }) => {
  const pathname = usePathname()
  const authPage = ['/sign-in']
  const errorPage = ['/403', '/server-error', '/network-error']
  const LayoutWrapper = authPage.includes(pathname)
    ? layouts['AuthLayout']
    : errorPage.includes(pathname)
    ? layouts['ErrorLayout']
    : layouts['MainLayout']

  return (
    // <QueryClientProvider client={queryClient}>
    <LayoutWrapper>
      {/* <SocketProvider> */}
      {children}
      {/* </SocketProvider> */}
    </LayoutWrapper>
    // </QueryClientProvider>
  )
}

export default AppLayout
