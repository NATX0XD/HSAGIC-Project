'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import MainLayout from './MainLayout'
import AuthLayout from './AuthLayout'
import ErrorLayout from './ErrorLayout'

const layouts = {
  MainLayout,
  AuthLayout,
  ErrorLayout
}
const AppLayout = ({ children }) => {
  const pathname = usePathname()
  const authPage = ['/login', '/register', '/auth']
  const errorPage = ['/404', '/500']
  const LayoutWrapper = authPage.includes(pathname)
    ? layouts['AuthLayout']
    : errorPage.includes(pathname)
    ? layouts['ErrorLayout']
    : layouts['MainLayout']
  return <LayoutWrapper>{children}</LayoutWrapper>
}

export default AppLayout
