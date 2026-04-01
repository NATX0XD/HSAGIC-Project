import { ArrowRight } from 'lucide-react'
import React from 'react'

const SectionHero = () => {
  return (
    <section className='py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>
            AI-Powered <span className='text-blue-600'>Customs</span>{' '}
            Classification
          </h1>
          <p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            Get accurate HS codes and tariff classifications instantly. Upload
            product images or describe your goods - our AI will provide precise
            customs codes and duty rates.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center'>
              Try for Free
              <ArrowRight className='w-5 h-5 ml-2' />
            </button>
            <button className='border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50'>
              View Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionHero
