'use client'
import React, { useState } from 'react'
import {
  Search,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
  Apple
} from 'lucide-react'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleSocialLogin = provider => {
    console.log(`Login with ${provider}`)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
        <div className='absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000'></div>
        <div className='absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000'></div>
      </div>

      {/* Floating Code Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-10 left-10 text-cyan-400 opacity-30 font-mono text-sm animate-float'>
          {"{ ai: 'powered' }"}
        </div>
        <div className='absolute top-32 right-20 text-purple-400 opacity-30 font-mono text-sm animate-float delay-1000'>
          {'<CustomsAI />'}
        </div>
        <div className='absolute bottom-20 left-20 text-pink-400 opacity-30 font-mono text-sm animate-float delay-2000'>
          {"import ai from 'future'"}
        </div>
        <div className='absolute bottom-40 right-10 text-green-400 opacity-30 font-mono text-sm animate-float delay-3000'>
          {'const smart = true'}
        </div>
      </div>

      <div className='w-full max-w-md relative z-10'>
        {/* Logo */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center space-x-3 mb-4'>
            <div className='w-14 h-14 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm'>
              <Search className='w-8 h-8 text-white' />
            </div>
            <span className='text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
              CustomsAI
            </span>
          </div>
          <p className='text-gray-300 text-lg'>
            AI-powered customs classification
          </p>
          <div className='mt-2 text-sm text-gray-400 font-mono'>
            {'// Enter the future of trade'}
          </div>
        </div>

        {/* Auth Card */}
        <div className='bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20'>
          {/* Toggle Buttons */}
          <div className='flex bg-white/5 rounded-xl p-1 mb-8 backdrop-blur-sm'>
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Social Login */}
          <div className='mb-8'>
            <div className='grid grid-cols-3 gap-4 mb-6'>
              <button
                onClick={() => handleSocialLogin('Google')}
                className='flex items-center justify-center py-3 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 group'
              >
                <Chrome className='w-5 h-5 text-white group-hover:text-cyan-400 transition-colors' />
              </button>
              <button
                onClick={() => handleSocialLogin('Apple')}
                className='flex items-center justify-center py-3 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 group'
              >
                <Apple className='w-5 h-5 text-white group-hover:text-cyan-400 transition-colors' />
              </button>
              <button
                onClick={() => handleSocialLogin('GitHub')}
                className='flex items-center justify-center py-3 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 group'
              >
                <Github className='w-5 h-5 text-white group-hover:text-cyan-400 transition-colors' />
              </button>
            </div>

            {/* Divider */}
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-white/20' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-4 bg-gradient-to-r from-transparent via-slate-900 to-transparent text-gray-400'>
                  Or continue with email
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className='space-y-6'>
            <div className='text-center mb-6'>
              <h2 className='text-2xl font-bold text-white mb-2'>
                {isLogin ? 'Welcome back!' : 'Join the AI Revolution'}
              </h2>
              <p className='text-gray-300'>
                {isLogin
                  ? 'Sign in to access your AI-powered dashboard'
                  : 'Create your account and start classifying smarter'}
              </p>
            </div>

            {/* Name field (only for sign up) */}
            {!isLogin && (
              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                  Full Name
                </label>
                <div className='relative'>
                  <User className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    className='w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300'
                    placeholder='Enter your full name'
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label className='block text-sm font-medium text-gray-300 mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300'
                  placeholder='Enter your email'
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className='block text-sm font-medium text-gray-300 mb-2'>
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  className='w-full pl-12 pr-14 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300'
                  placeholder='Enter your password'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors'
                >
                  {showPassword ? (
                    <EyeOff className='w-5 h-5' />
                  ) : (
                    <Eye className='w-5 h-5' />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password field (only for sign up) */}
            {!isLogin && (
              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                  Confirm Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className='w-full pl-12 pr-14 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300'
                    placeholder='Confirm your password'
                    required={!isLogin}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors'
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Remember me / Forgot password */}
            {isLogin && (
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='remember'
                    className='h-4 w-4 text-cyan-400 focus:ring-cyan-400 border-white/20 rounded bg-white/10'
                  />
                  <label
                    htmlFor='remember'
                    className='ml-2 block text-sm text-gray-300'
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href='#'
                  className='text-sm text-cyan-400 hover:text-cyan-300 transition-colors'
                >
                  Forgot password?
                </a>
              </div>
            )}

            {/* Terms and conditions (only for sign up) */}
            {!isLogin && (
              <div className='flex items-start'>
                <input
                  type='checkbox'
                  id='terms'
                  className='h-4 w-4 text-cyan-400 focus:ring-cyan-400 border-white/20 rounded bg-white/10 mt-1'
                  required
                />
                <label
                  htmlFor='terms'
                  className='ml-2 block text-sm text-gray-300'
                >
                  I agree to the{' '}
                  <a
                    href='#'
                    className='text-cyan-400 hover:text-cyan-300 transition-colors'
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href='#'
                    className='text-cyan-400 hover:text-cyan-300 transition-colors'
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type='button'
              onClick={handleSubmit}
              className='w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-cyan-500/25'
            >
              <span>
                {isLogin ? 'Sign In to AI Dashboard' : 'Create AI Account'}
              </span>
              <ArrowRight className='w-5 h-5' />
            </button>
          </div>

          {/* Footer */}
          <div className='mt-8 text-center'>
            <p className='text-gray-400 text-sm'>
              {isLogin
                ? "Don't have an account? "
                : 'Already have an account? '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className='text-cyan-400 hover:text-cyan-300 transition-colors font-medium'
              >
                {isLogin ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>

        {/* AI Badge */}
        <div className='text-center mt-6'>
          <div className='inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span className='text-sm text-gray-300 font-mono'>
              AI Systems Online
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  )
}

export default Login
