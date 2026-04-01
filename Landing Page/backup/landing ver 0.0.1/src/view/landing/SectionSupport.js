import React from 'react'

const SectionSupport = () => {
  return (
    <section id='support' className='py-20 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Support & Resources
          </h2>
          <p className='text-xl text-gray-600'>
            Get the help you need to succeed
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-8'>
          <div className='bg-white p-8 rounded-xl shadow-sm'>
            <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
              Documentation
            </h3>
            <p className='text-gray-600 mb-6'>
              Comprehensive guides and API documentation to help you integrate
              and use our services effectively.
            </p>
            <button className='text-blue-600 hover:text-blue-700 font-semibold'>
              View Documentation →
            </button>
          </div>

          <div className='bg-white p-8 rounded-xl shadow-sm'>
            <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
              Expert Support
            </h3>
            <p className='text-gray-600 mb-6'>
              Our customs experts are available 24/7 to help with complex
              classifications and trade compliance questions.
            </p>
            <button className='text-blue-600 hover:text-blue-700 font-semibold'>
              Contact Support →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionSupport
