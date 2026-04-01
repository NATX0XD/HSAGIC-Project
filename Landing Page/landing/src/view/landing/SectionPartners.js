import React from 'react'
import { useTranslation } from 'react-i18next'

const SectionPartners = () => {
  const { t } = useTranslation()
  const company = [
    {
      name: 'Global AI Trade',
      logo: 'LOGO'
    },
    {
      name: 'Smart Imports',
      logo: 'LOGO'
    },
    {
      name: 'AI Customs Pro',
      logo: 'LOGO'
    },
    {
      name: 'Neural Trade',
      logo: 'LOGO'
    }
  ]
  return (
    <section className='py-20 relative z-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-white mb-4'>
            {t('sectionPartners.title')}
          </h2>
          <p className='text-xl text-gray-300'>
            {t('sectionPartners.subTitle')}{' '}
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 items-center'>
          {company.map((item, index) => (
            <div key={index} className='text-center'>
              <div className='w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl mx-auto mb-4 flex items-center justify-center border border-white/20'>
                <span className='text-gray-300 font-bold'>{item.logo}</span>
              </div>
              <p className='text-gray-300'>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectionPartners
