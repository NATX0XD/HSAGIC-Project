// import { Bot } from 'lucide-react'
// import React from 'react'

// const SectionHero = ({ billingCycle = 'monthly', setBillingCycle = null }) => {
//   return (
//     <section className='py-20 relative z-10'>
//       <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
//         <div className='inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 mb-6'>
//           <Bot className='w-5 h-5 text-cyan-400' />
//           <span className='text-sm text-gray-300 font-mono'>
//             AI-Powered Pricing
//           </span>
//         </div>

//         <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6'>
//           Choose Your AI Plan
//         </h1>
//         <p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
//           Unlock the power of AI-driven customs classification. Start free,
//           scale with intelligence.
//         </p>

//         {/* Billing Toggle */}
//         <div className='flex items-center justify-center space-x-4 mb-16'>
//           <span
//             className={`text-sm font-medium ${
//               billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'
//             }`}
//           >
//             Monthly
//           </span>
//           <button
//             onClick={() =>
//               setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')
//             }
//             className='relative inline-flex h-7 w-14 items-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 shadow-lg'
//           >
//             <span
//               className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-md ${
//                 billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
//               }`}
//             />
//           </button>
//           <span
//             className={`text-sm font-medium ${
//               billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'
//             }`}
//           >
//             Yearly
//           </span>
//           <span className='bg-gradient-to-r from-green-400 to-green-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg'>
//             Save 17%
//           </span>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default SectionHero
import { Bot, Cpu, Zap, Brain, Sparkles } from 'lucide-react'
import React, { useState, useEffect } from 'react'

const SectionHero = ({ billingCycle = 'monthly', setBillingCycle = null }) => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  const texts = [
    'Choose Your AI Plan',
    'Unlock AI Intelligence',
    'Scale with Smart AI',
    'Experience Next-Gen AI'
  ]

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100
    const fullText = texts[currentIndex]

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(fullText.substring(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length)
        }
      }
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [currentText, currentIndex, isDeleting, texts])

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <section className='py-20 relative z-10'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        {/* AI Badge */}
        <div className='inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-cyan-400/30 mb-8 shadow-lg hover:shadow-cyan-400/25 transition-all duration-300'>
          <div className='relative'>
            <Bot className='w-5 h-5 text-cyan-400 animate-pulse' />
            <div className='absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping'></div>
          </div>
          <span className='text-sm text-cyan-300 font-mono font-medium'>
            AI-Powered Intelligence
          </span>
          <Sparkles className='w-4 h-4 text-purple-400 animate-pulse delay-300' />
        </div>

        {/* Typewriter Title */}
        <div className='relative mb-8'>
          <h1 className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent min-h-[1.2em] flex items-center justify-center'>
            {currentText}
            <span
              className={`ml-2 inline-block w-1 bg-gradient-to-b from-cyan-400 to-purple-400 ${
                showCursor ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-100`}
              style={{ height: '0.8em' }}
            ></span>
          </h1>

          {/* Floating AI Icons */}
          <div className='absolute -top-4 -left-4 opacity-20 animate-float'>
            <Cpu className='w-8 h-8 text-cyan-400' />
          </div>
          <div className='absolute -top-2 -right-8 opacity-20 animate-float delay-1000'>
            <Brain className='w-6 h-6 text-purple-400' />
          </div>
          <div className='absolute -bottom-2 left-8 opacity-20 animate-float delay-2000'>
            <Zap className='w-7 h-7 text-pink-400' />
          </div>
        </div>

        {/* AI Description */}
        <div className='max-w-3xl mx-auto mb-12'>
          <p className='text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed'>
            Unlock the power of{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold'>
              next-generation AI
            </span>{' '}
            with intelligent automation that scales with your ambitions.
          </p>
          <p className='text-lg text-gray-400'>
            Experience lightning-fast processing, adaptive learning, and
            seamless integration in one powerful platform.
          </p>
        </div>

        {/* AI Features Pills */}
        <div className='flex flex-wrap justify-center gap-3 mb-12'>
          <div className='bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 border border-cyan-400/30 rounded-full px-4 py-2 backdrop-blur-sm'>
            <span className='text-cyan-300 text-sm font-medium'>
              Neural Processing
            </span>
          </div>
          <div className='bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-400/30 rounded-full px-4 py-2 backdrop-blur-sm'>
            <span className='text-purple-300 text-sm font-medium'>
              Machine Learning
            </span>
          </div>
          <div className='bg-gradient-to-r from-pink-500/10 to-pink-600/10 border border-pink-400/30 rounded-full px-4 py-2 backdrop-blur-sm'>
            <span className='text-pink-300 text-sm font-medium'>
              Smart Analytics
            </span>
          </div>
          <div className='bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-400/30 rounded-full px-4 py-2 backdrop-blur-sm'>
            <span className='text-emerald-300 text-sm font-medium'>
              Auto-Scale
            </span>
          </div>
        </div>

        {/* Enhanced Billing Toggle */}
        <div className='flex items-center justify-center space-x-6 mb-16'>
          <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 shadow-lg'>
            <div className='flex items-center space-x-4'>
              <span
                className={`text-sm font-medium transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'text-white scale-105'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Monthly
              </span>

              {/* Enhanced Toggle */}
              <button
                onClick={() =>
                  setBillingCycle(
                    billingCycle === 'monthly' ? 'yearly' : 'monthly'
                  )
                }
                className='relative inline-flex h-8 w-16 items-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/50'
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                    billingCycle === 'yearly'
                      ? 'translate-x-9'
                      : 'translate-x-1'
                  }`}
                >
                  <div className='w-full h-full rounded-full bg-gradient-to-r from-cyan-100 to-purple-100 flex items-center justify-center'>
                    <div className='w-2 h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full'></div>
                  </div>
                </span>
              </button>

              <span
                className={`text-sm font-medium transition-all duration-300 ${
                  billingCycle === 'yearly'
                    ? 'text-white scale-105'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Yearly
              </span>
            </div>
          </div>

          {/* Save Badge */}
          <div className='relative'>
            <div className='bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm px-4 py-2 rounded-full font-medium shadow-lg animate-pulse'>
              <Zap className='w-4 h-4 inline-block mr-1' />
              Save 17%
            </div>
            <div className='absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping'></div>
          </div>
        </div>

        {/* AI Stats */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
          <div className='text-center'>
            <div className='text-2xl md:text-3xl font-bold text-cyan-400 mb-1'>
              99.9%
            </div>
            <div className='text-sm text-gray-400'>AI Accuracy</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl md:text-3xl font-bold text-purple-400 mb-1'>
              {'<'} 50ms
            </div>
            <div className='text-sm text-gray-400'>Response Time</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl md:text-3xl font-bold text-pink-400 mb-1'>
              24/7
            </div>
            <div className='text-sm text-gray-400'>AI Learning</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl md:text-3xl font-bold text-emerald-400 mb-1'>
              ∞
            </div>
            <div className='text-sm text-gray-400'>Scalability</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-10px) rotate(5deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-5px) rotate(-5deg);
            opacity: 1;
          }
          75% {
            transform: translateY(-15px) rotate(3deg);
            opacity: 0.8;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  )
}

export default SectionHero
