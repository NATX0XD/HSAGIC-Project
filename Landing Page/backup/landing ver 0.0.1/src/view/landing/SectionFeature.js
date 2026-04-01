import { MessageCircle, Search, Upload } from 'lucide-react'
import React from 'react'

const SectionFeature = () => {
  return (
    <section id='features' className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Powerful Features
          </h2>
          <p className='text-xl text-gray-600'>
            Everything you need for accurate customs classification
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          <div className='text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100'>
            <div className='w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Upload className='w-8 h-8 text-white' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-4'>
              Image Recognition
            </h3>
            <p className='text-gray-600'>
              Upload product images and get instant HS code classification using
              advanced AI vision technology.
            </p>
          </div>

          <div className='text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-green-100'>
            <div className='w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6'>
              <MessageCircle className='w-8 h-8 text-white' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-4'>
              Chat Interface
            </h3>
            <p className='text-gray-600'>
              Describe your products in natural language and receive accurate
              customs codes and explanations.
            </p>
          </div>

          <div className='text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100'>
            <div className='w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Search className='w-8 h-8 text-white' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-4'>
              Instant Results
            </h3>
            <p className='text-gray-600'>
              Get HS codes, duty rates, and import/export requirements in
              seconds, not hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionFeature
