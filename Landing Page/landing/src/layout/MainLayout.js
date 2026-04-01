import Footer from '@/components/landing/Footer'
import Navbar from '@/components/landing/Navbar'
import React from 'react'

const MainLayout = ({ children }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden'>
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
        <div className='absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000'></div>
        <div className='absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000'></div>
      </div>
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-10 left-10 text-cyan-400 opacity-30 font-mono text-sm animate-float'>
          {"{ ai: 'powered' }"}
        </div>
        <div className='absolute top-32 right-20 text-purple-400 opacity-30 font-mono text-sm animate-float delay-1000'>
          {process.env.NEXT_PUBLIC_APP_NAME}
        </div>
        <div className='absolute bottom-20 left-20 text-pink-400 opacity-30 font-mono text-sm animate-float delay-2000'>
          {"import ai from 'future'"}
        </div>
        <div className='absolute bottom-40 right-10 text-green-400 opacity-30 font-mono text-sm animate-float delay-3000'>
          {'const smart = true'}
        </div>
      </div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
