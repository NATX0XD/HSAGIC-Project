import { Code, Shield, Users, Zap } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const SectionHighlights = () => {
  const { t } = useTranslation()
  const highlights = [
    {
      title: t('sectionHighlights.highlights1.title'),
      subTitle: t('sectionHighlights.highlights1.subTitle'),
      color: 'from-yellow-400 to-orange-500 ',
      icon: <Zap className='w-10 h-10 text-white' />
    },
    {
      title: t('sectionHighlights.highlights2.title'),
      subTitle: t('sectionHighlights.highlights2.subTitle'),
      color: 'from-purple-400 to-purple-600',
      icon: <Shield className='w-10 h-10 text-white' />
    },
    {
      title: t('sectionHighlights.highlights3.title'),
      subTitle: t('sectionHighlights.highlights3.subTitle'),
      color: 'from-pink-400 to-pink-600',
      icon: <Code className='w-10 h-10 text-white' />
    }
  ]
  return (
    <section className='py-20 relative z-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20'>
          <div className='text-center text-white'>
            <h2 className='text-4xl font-bold mb-6'>
              {t('sectionHighlights.title')}
            </h2>
            <p className='text-xl mb-8 max-w-3xl mx-auto text-gray-300'>
              {t('sectionHighlights.subTitle')}
            </p>
            <div className='grid md:grid-cols-3 gap-8 mt-12'>
              {highlights.map((item, index) => (
                <div key={index} className='text-center'>
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-4`}
                  >
                    {item.icon}
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                  <p className='text-gray-300'>{item.subTitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionHighlights
