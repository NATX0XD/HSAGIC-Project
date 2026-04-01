import Footer from '@/components/landing/Footer'
import Navbar from '@/components/landing/Navbar'
import React from 'react'

const MainLayout = ({ children }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
