// import { ArrowRight } from 'lucide-react'
// import Link from 'next/link'
// import React from 'react'
// import { useTranslation } from 'react-i18next'
// const SectionHero = () => {
//   const { t } = useTranslation()
//   const state = [
//     {
//       title: t('sectionHero.stats.item1'),
//       value: '99.5%',
//       color: 'text-cyan-400'
//     },
//     {
//       title: t('sectionHero.stats.item2'),
//       value: ' 10K+',
//       color: 'text-purple-400'
//     },
//     {
//       title: t('sectionHero.stats.item3'),
//       value: ' 24/7',
//       color: 'text-pink-400'
//     }
//   ]
//   return (
//     <section className='py-20 relative z-10'>
//       {/* <button onClick={() => i18n.changeLanguage('en')}>EN</button>
//         <button onClick={() => i18n.changeLanguage('th')}>TH</button> */}

//       <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//         <div className='text-center'>
//           <div className='mb-8'>
//             <div className='inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 mb-6'>
//               <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
//               <span className='text-sm text-gray-300 font-mono'>
//                 {process.env.NEXT_PUBLIC_AI_NAME} Online
//               </span>
//             </div>
//           </div>
//           <h1 className='text-6xl md:text-7xl font-bold text-white mb-6'>
//             {t('sectionHero.title.word1')}{' '}
//             <span className='bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
//               {t('sectionHero.title.word2Color')}
//             </span>
//             <br />
//             {t('sectionHero.title.word3')}
//           </h1>
//           <p className='text-xl text-gray-300 mb-8 max-w-3xl mx-auto'>
//             {t('sectionHero.subTitle')}
//           </p>
//           <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
//             <Link
//               href={'/auth'}
//               className='bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center shadow-lg'
//             >
//               {t('sectionHero.buttonAction')}
//               <ArrowRight className='w-5 h-5 ml-2' />
//             </Link>
//             <Link
//               href={'/chat'}
//               className='bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300'
//             >
//               {t('sectionHero.buttonDefault')}
//             </Link>
//           </div>

//           {/* Stats */}
//           <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
//             {state.map((item, index) => (
//               <div
//                 key={index}
//                 className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20'
//               >
//                 <div className={`text-3xl font-bold ${item.color} mb-2`}>
//                   {item.value}
//                 </div>
//                 <div className='text-gray-300'>{item.title}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default SectionHero
import {
  ArrowRight,
  Bot,
  Cpu,
  Zap,
  Brain,
  Sparkles,
  Star,
  Shield,
  Rocket
} from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const SectionHero = () => {
  const { t } = useTranslation()
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Typewriter texts - can be moved to translation file
  const heroTexts = [
    t('sectionHero.title.word2Color'),
    'Intelligence',
    'Innovation',
    'Evolution'
  ]

  const state = [
    {
      title: t('sectionHero.stats.item1'),
      value: '99.5%',
      color: 'text-cyan-400',
      icon: Shield,
      gradient: 'from-cyan-400/20 to-cyan-600/20',
      border: 'border-cyan-400/30'
    },
    {
      title: t('sectionHero.stats.item2'),
      value: '10K+',
      color: 'text-purple-400',
      icon: Star,
      gradient: 'from-purple-400/20 to-purple-600/20',
      border: 'border-purple-400/30'
    },
    {
      title: t('sectionHero.stats.item3'),
      value: '24/7',
      color: 'text-pink-400',
      icon: Rocket,
      gradient: 'from-pink-400/20 to-pink-600/20',
      border: 'border-pink-400/30'
    }
  ]

  // Typewriter effect
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 120
    const fullText = heroTexts[currentIndex]

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2500)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(fullText.substring(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentIndex(prevIndex => (prevIndex + 1) % heroTexts.length)
        }
      }
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [currentText, currentIndex, isDeleting, heroTexts])

  // Cursor blinking
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <section className='py-20 relative z-10 overflow-hidden'>
      {/* Floating particles */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-40'></div>
        <div className='absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-30 delay-1000'></div>
        <div className='absolute bottom-1/3 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-40 delay-2000'></div>
        <div className='absolute bottom-1/4 right-1/3 w-4 h-4 bg-emerald-400 rounded-full animate-pulse opacity-20 delay-3000'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          {/* Enhanced AI Status Badge */}
          <div className='mb-8'>
            <div className='inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-full px-6 py-3 border border-cyan-400/30 mb-6 shadow-lg hover:shadow-cyan-400/25 transition-all duration-300'>
              <div className='relative flex items-center space-x-2'>
                <Bot className='w-5 h-5 text-cyan-400 animate-pulse' />
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-400/50 rounded-full animate-ping'></div>
              </div>
              <span className='text-sm text-cyan-300 font-mono font-medium'>
                {process.env.NEXT_PUBLIC_AI_NAME} Online
              </span>
              <Sparkles className='w-4 h-4 text-purple-400 animate-pulse delay-300' />
            </div>
          </div>

          {/* Enhanced Hero Title with Typewriter */}
          <div className='relative mb-8'>
            <h1 className='text-6xl md:text-8xl font-bold text-white mb-6 leading-tight'>
              {t('sectionHero.title.word1')}{' '}
              <span className='relative inline-block'>
                <span className='bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                  {currentText}
                </span>
                <span
                  className={`ml-1 inline-block w-1 bg-gradient-to-b from-cyan-400 to-purple-400 ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-100`}
                  style={{ height: '0.8em' }}
                ></span>
              </span>
              <br />
              <span className='relative'>
                {t('sectionHero.title.word3')}
                {/* Floating AI Icons around title */}
                <div className='absolute -top-8 -left-8 opacity-20 animate-float'>
                  <Cpu className='w-12 h-12 text-cyan-400' />
                </div>
                <div className='absolute -top-4 -right-12 opacity-20 animate-float delay-1000'>
                  <Brain className='w-10 h-10 text-purple-400' />
                </div>
                <div className='absolute -bottom-4 left-8 opacity-20 animate-float delay-2000'>
                  <Zap className='w-11 h-11 text-pink-400' />
                </div>
              </span>
            </h1>
          </div>

          {/* Enhanced Subtitle */}
          <div className='max-w-4xl mx-auto mb-12'>
            <p className='text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed'>
              {t('sectionHero.subTitle')}
            </p>
            {/* AI Feature Tags */}
            <div className='flex flex-wrap justify-center gap-2 mt-6'>
              <span className='bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium'>
                Neural Processing
              </span>
              <span className='bg-purple-500/10 border border-purple-400/30 text-purple-300 px-3 py-1 rounded-full text-sm font-medium'>
                Machine Learning
              </span>
              <span className='bg-pink-500/10 border border-pink-400/30 text-pink-300 px-3 py-1 rounded-full text-sm font-medium'>
                Smart Analytics
              </span>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center mb-16'>
            <Link
              href={'/auth'}
              className='group bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 transform'
            >
              <Rocket className='w-5 h-5 mr-2 group-hover:animate-bounce' />
              {t('sectionHero.buttonAction')}
              <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
            </Link>
            <Link
              href={'/chat'}
              className='group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 transform shadow-lg'
            >
              <Bot className='w-5 h-5 mr-2 group-hover:animate-pulse' />
              {t('sectionHero.buttonDefault')}
            </Link>
          </div>

          {/* Enhanced Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
            {state.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br ${item.gradient} backdrop-blur-sm rounded-2xl p-8 border ${item.border} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden`}
                >
                  {/* Background glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-2xl`}
                  ></div>

                  <div className='relative z-10'>
                    <div className='flex items-center justify-center mb-4'>
                      <IconComponent
                        className={`w-8 h-8 ${item.color} group-hover:animate-pulse`}
                      />
                    </div>
                    <div
                      className={`text-4xl font-bold ${item.color} mb-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.value}
                    </div>
                    <div className='text-gray-300 font-medium group-hover:text-white transition-colors duration-300'>
                      {item.title}
                    </div>
                  </div>

                  {/* Animated corner accent */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.color.replace(
                      'text-',
                      'from-'
                    )} to-transparent opacity-10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500`}
                  ></div>
                </div>
              )
            })}
          </div>

          {/* Trust indicators */}
          <div className='mt-16 pt-8 border-t border-white/10'>
            <p className='text-gray-400 text-sm mb-4'>
              Trusted by innovators worldwide
            </p>
            <div className='flex justify-center items-center space-x-8 opacity-40'>
              <div className='text-gray-500 font-semibold'>
                Enterprise Ready
              </div>
              <div className='w-2 h-2 bg-gray-500 rounded-full'></div>
              <div className='text-gray-500 font-semibold'>ISO Certified</div>
              <div className='w-2 h-2 bg-gray-500 rounded-full'></div>
              <div className='text-gray-500 font-semibold'>GDPR Compliant</div>
            </div>
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
            transform: translateY(-15px) rotate(3deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-8px) rotate(-3deg);
            opacity: 1;
          }
          75% {
            transform: translateY(-20px) rotate(2deg);
            opacity: 0.8;
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
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
    </section>
  )
}

export default SectionHero
