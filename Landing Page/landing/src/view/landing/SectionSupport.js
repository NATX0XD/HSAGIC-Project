import React from 'react'
import { useTranslation } from 'react-i18next'

const SectionSupport = () => {
  const { t } = useTranslation()
  const support = [
    {
      title: t('sectionSupport.support1.title'),
      subTitle: t('sectionSupport.support1.subTitle'),
      buttonAction: t('sectionSupport.support1.buttonAction')
    },
    {
      title: t('sectionSupport.support2.title'),
      subTitle: t('sectionSupport.support2.subTitle'),
      buttonAction: t('sectionSupport.support2.buttonAction')
    }
  ]
  return (
    <section id='support' className='py-20 relative z-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-white mb-4'>
            {t('sectionSupport.title')}
          </h2>
          <p className='text-xl text-gray-300'>
            {t('sectionSupport.subTitle')}
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-8'>
          {support.map((item, index) => (
            <div
              key={index}
              className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300'
            >
              <h3 className='text-2xl font-semibold text-white mb-4'>
                {item.title}
              </h3>
              <p className='text-gray-300 mb-6'>{item.subTitle}</p>
              <button className='text-cyan-400 hover:text-cyan-300 font-semibold transition-colors'>
                {item.buttonAction}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectionSupport
