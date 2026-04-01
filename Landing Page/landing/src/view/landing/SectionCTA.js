import React from 'react'
import { useTranslation } from 'react-i18next'

const SectionCTA = () => {
  const { t } = useTranslation()
  return (
    <section className='py-20 relative z-10'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <div className='bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20'>
          <h2 className='text-4xl font-bold text-white mb-6'>
            {t('sectionCTA.title')}
          </h2>
          <p className='text-xl text-gray-300 mb-8'>
            {t('sectionCTA.subTitle')}
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg'>
              {t('sectionCTA.buttonAction')}
            </button>
            <button className='bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300'>
              {t('sectionCTA.buttonDefault')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionCTA
