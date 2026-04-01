import { Bot, Cpu, MessageCircle, Search, Upload } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const SectionFeature = () => {
  const { t } = useTranslation()
  const features = [
    {
      title: t('sectionFeature.feature1.title'),
      subTitle: t('sectionFeature.feature1.subTitle'),
      color: 'from-cyan-400 to-cyan-600',
      icon: <Upload className='w-8 h-8 text-white' />
    },
    {
      title: t('sectionFeature.feature2.title'),
      subTitle: t('sectionFeature.feature2.subTitle'),
      color: 'from-purple-400 to-purple-600',
      icon: <Bot className='w-8 h-8 text-white' />
    },
    {
      title: t('sectionFeature.feature3.title'),
      subTitle: t('sectionFeature.feature3.subTitle'),
      color: 'from-pink-400 to-pink-600',
      icon: <Cpu className='w-8 h-8 text-white' />
    }
  ]
  return (
    <section id='features' className='py-20 relative z-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-5xl font-bold text-white mb-4'>
            {t('sectionFeature.title')}
          </h2>
          <p className='text-xl text-gray-300'>
            {t('sectionFeature.subTitle')}
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {features.map((item, index) => (
            <div className='group' key={index}>
              <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full'>
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                >
                  {item.icon}
                </div>
                <h3 className='text-xl font-semibold text-white mb-4'>
                  {item.title}
                </h3>
                <p className='text-gray-300'>{item.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectionFeature
