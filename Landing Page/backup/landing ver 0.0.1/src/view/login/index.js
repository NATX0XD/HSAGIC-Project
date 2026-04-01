'use client'
import React from 'react'
import {
  Search,
  Upload,
  MessageCircle,
  CheckCircle,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Star,
  Bot,
  Code,
  Cpu
} from 'lucide-react'

const Login = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden'>
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

      {/* Header */}
      <header className='bg-white/10 backdrop-blur-xl border-b border-white/20 relative z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div className='flex items-center space-x-3'>
              <div className='w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg'>
                <Search className='w-7 h-7 text-white' />
              </div>
              <span className='text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
                CustomsAI
              </span>
            </div>
            <nav className='hidden md:flex space-x-8'>
              <a
                href='#features'
                className='text-gray-300 hover:text-cyan-400 transition-colors'
              >
                Features
              </a>
              <a
                href='#pricing'
                className='text-gray-300 hover:text-cyan-400 transition-colors'
              >
                Pricing
              </a>
              <a
                href='#support'
                className='text-gray-300 hover:text-cyan-400 transition-colors'
              >
                Support
              </a>
            </nav>
            <div className='flex items-center space-x-4'>
              <button className='text-gray-300 hover:text-cyan-400 transition-colors'>
                Sign In
              </button>
              <button className='bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg'>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='py-20 relative z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <div className='mb-8'>
              <div className='inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 mb-6'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-sm text-gray-300 font-mono'>
                  AI Systems Online
                </span>
              </div>
            </div>
            <h1 className='text-6xl md:text-7xl font-bold text-white mb-6'>
              AI-Powered{' '}
              <span className='bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
                Customs
              </span>
              <br />
              Classification
            </h1>
            <p className='text-xl text-gray-300 mb-8 max-w-3xl mx-auto'>
              Get accurate HS codes and tariff classifications instantly. Upload
              product images or describe your goods - our AI will provide
              precise customs codes and duty rates.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
              <button className='bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center shadow-lg'>
                Try for Free
                <ArrowRight className='w-5 h-5 ml-2' />
              </button>
              <button className='bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300'>
                View Demo
              </button>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20'>
                <div className='text-3xl font-bold text-cyan-400 mb-2'>
                  99.5%
                </div>
                <div className='text-gray-300'>Accuracy Rate</div>
              </div>
              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20'>
                <div className='text-3xl font-bold text-purple-400 mb-2'>
                  10K+
                </div>
                <div className='text-gray-300'>Classifications Daily</div>
              </div>
              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20'>
                <div className='text-3xl font-bold text-pink-400 mb-2'>
                  24/7
                </div>
                <div className='text-gray-300'>AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='py-20 relative z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-5xl font-bold text-white mb-4'>
              Powerful AI Features
            </h2>
            <p className='text-xl text-gray-300'>
              Everything you need for accurate customs classification
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='group'>
              <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full'>
                <div className='w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform'>
                  <Upload className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-semibold text-white mb-4'>
                  AI Image Recognition
                </h3>
                <p className='text-gray-300'>
                  Upload product images and get instant HS code classification
                  using advanced AI vision technology powered by neural
                  networks.
                </p>
              </div>
            </div>

            <div className='group'>
              <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full'>
                <div className='w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform'>
                  <Bot className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-semibold text-white mb-4'>
                  Smart Chat Interface
                </h3>
                <p className='text-gray-300'>
                  Describe your products in natural language and receive
                  accurate customs codes with AI-powered explanations.
                </p>
              </div>
            </div>

            <div className='group'>
              <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full'>
                <div className='w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform'>
                  <Cpu className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-semibold text-white mb-4'>
                  Lightning Fast AI
                </h3>
                <p className='text-gray-300'>
                  Get HS codes, duty rates, and import/export requirements in
                  seconds using our optimized AI algorithms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Showcase Section */}
      <section className='py-20 relative z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20'>
            <div className='text-center text-white'>
              <h2 className='text-4xl font-bold mb-6'>
                Experience the Future of Trade
              </h2>
              <p className='text-xl mb-8 max-w-3xl mx-auto text-gray-300'>
                Powered by cutting-edge AI technology, our system learns and
                adapts to provide increasingly accurate classifications.
              </p>
              <div className='grid md:grid-cols-3 gap-8 mt-12'>
                <div className='text-center'>
                  <div className='w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-4'>
                    <Zap className='w-10 h-10 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>
                    Neural Processing
                  </h3>
                  <p className='text-gray-300'>
                    Advanced deep learning models trained on millions of trade
                    classifications
                  </p>
                </div>
                <div className='text-center'>
                  <div className='w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4'>
                    <Shield className='w-10 h-10 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>AI Compliance</h3>
                  <p className='text-gray-300'>
                    Automatically updated with latest regulations using machine
                    learning
                  </p>
                </div>
                <div className='text-center'>
                  <div className='w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-4'>
                    <Code className='w-10 h-10 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>
                    Smart Integration
                  </h3>
                  <p className='text-gray-300'>
                    Seamless API integration with intelligent error handling
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id='support' className='py-20 relative z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              AI-Powered Support
            </h2>
            <p className='text-xl text-gray-300'>
              Get intelligent help whenever you need it
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300'>
              <h3 className='text-2xl font-semibold text-white mb-4'>
                Smart Documentation
              </h3>
              <p className='text-gray-300 mb-6'>
                AI-generated guides and interactive API documentation that
                adapts to your use case and provides personalized examples.
              </p>
              <button className='text-cyan-400 hover:text-cyan-300 font-semibold transition-colors'>
                Explore AI Docs →
              </button>
            </div>

            <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300'>
              <h3 className='text-2xl font-semibold text-white mb-4'>
                AI Expert Support
              </h3>
              <p className='text-gray-300 mb-6'>
                Our AI assistants work alongside customs experts to provide
                instant, accurate answers to complex trade questions.
              </p>
              <button className='text-cyan-400 hover:text-cyan-300 font-semibold transition-colors'>
                Chat with AI Support →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className='py-20 relative z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Trusted by AI-Forward Companies
            </h2>
            <p className='text-xl text-gray-300'>
              Join thousands of businesses leveraging AI for customs
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 items-center'>
            <div className='text-center'>
              <div className='w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl mx-auto mb-4 flex items-center justify-center border border-white/20'>
                <span className='text-gray-300 font-bold'>LOGO</span>
              </div>
              <p className='text-gray-300'>Global AI Trade</p>
            </div>
            <div className='text-center'>
              <div className='w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl mx-auto mb-4 flex items-center justify-center border border-white/20'>
                <span className='text-gray-300 font-bold'>LOGO</span>
              </div>
              <p className='text-gray-300'>Smart Imports</p>
            </div>
            <div className='text-center'>
              <div className='w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl mx-auto mb-4 flex items-center justify-center border border-white/20'>
                <span className='text-gray-300 font-bold'>LOGO</span>
              </div>
              <p className='text-gray-300'>AI Customs Pro</p>
            </div>
            <div className='text-center'>
              <div className='w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl mx-auto mb-4 flex items-center justify-center border border-white/20'>
                <span className='text-gray-300 font-bold'>LOGO</span>
              </div>
              <p className='text-gray-300'>Neural Trade</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 relative z-10'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20'>
            <h2 className='text-4xl font-bold text-white mb-6'>
              Ready to Transform Your Trade with AI?
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              Join the AI revolution in customs classification. Start your
              intelligent trade journey today.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg'>
                Start AI Trial
              </button>
              <button className='bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300'>
                Schedule AI Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-black/40 backdrop-blur-xl text-white py-12 border-t border-white/20 relative z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-4 gap-8'>
            <div>
              <div className='flex items-center space-x-3 mb-4'>
                <div className='w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center'>
                  <Search className='w-5 h-5 text-white' />
                </div>
                <span className='text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
                  CustomsAI
                </span>
              </div>
              <p className='text-gray-300'>
                AI-powered customs classification for the future of trade.
              </p>
            </div>
            <div>
              <h4 className='font-semibold mb-4 text-cyan-400'>AI Features</h4>
              <ul className='space-y-2 text-gray-300'>
                <li>
                  <a href='#' className='hover:text-cyan-400 transition-colors'>
                    Neural Classification
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-cyan-400 transition-colors'>
                    Smart Pricing
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-cyan-400 transition-colors'>
                    AI API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4 text-purple-400'>Support</h4>
              <ul className='space-y-2 text-gray-300'>
                <li>
                  <a
                    href='#'
                    className='hover:text-purple-400 transition-colors'
                  >
                    AI Documentation
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-purple-400 transition-colors'
                  >
                    Smart Help
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-purple-400 transition-colors'
                  >
                    AI Chat
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4 text-pink-400'>Company</h4>
              <ul className='space-y-2 text-gray-300'>
                <li>
                  <a href='#' className='hover:text-pink-400 transition-colors'>
                    About AI
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-pink-400 transition-colors'>
                    AI Blog
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-pink-400 transition-colors'>
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='border-t border-white/20 mt-8 pt-8 text-center text-gray-300'>
            <p>
              &copy; 2024 CustomsAI. Powered by Artificial Intelligence. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>

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
