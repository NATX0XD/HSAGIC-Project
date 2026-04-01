import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden'>
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
        <div className='w-full max-w-md relative z-10'>
          {children}
          <div className='text-center mt-6'>
            <div className='inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20'>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
              <span className='text-sm text-gray-300 font-mono'>
                {process.env.NEXT_PUBLIC_AI_NAME} Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthLayout
