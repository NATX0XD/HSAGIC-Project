'use client'
import ThemeProvider from '@/themes'

const ErrorLayout = ({ children }) => {
  return (
    <ThemeProvider>
      ErrorLayout
      {children}
    </ThemeProvider>
  )
}

export default ErrorLayout
