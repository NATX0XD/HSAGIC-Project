import { usePathname } from 'next/navigation'
import React from 'react'
import MainLayout from './MainLayout'
import ChatLayout from './ChatLayout'
import AuthLayout from './AuthLayout'

const layouts = {
  MainLayout,
  ChatLayout,
  AuthLayout
}
const AppLayout = ({ children }) => {
  const pathname = usePathname()
  const authPage = ['/login', '/register', '/auth']
  const errorPage = ['/404', '/500']
  const chatPage = ['/chat']
  const LayoutWrapper = authPage.includes(pathname)
    ? layouts['AuthLayout']
    : errorPage.includes(pathname)
    ? layouts['ErrorLayout']
    : chatPage.includes(pathname)
    ? layouts['ChatLayout']
    : layouts['MainLayout']

  return <LayoutWrapper>{children}</LayoutWrapper>
}

export default AppLayout
