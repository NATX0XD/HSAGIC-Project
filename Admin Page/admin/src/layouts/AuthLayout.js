'use client'
import ThemeProvider from '@/themes'

const AuthLayout = ({ children }) => {
  return <ThemeProvider>AuthLayout{children}</ThemeProvider>
}

export default AuthLayout
