import React from 'react'

const SectionPartners = () => {
  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Trusted by Leading Companies
          </h2>
          <p className='text-xl text-gray-600'>
            Join thousands of businesses who trust CustomsAI
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 items-center'>
          <div className='text-center'>
            <div className='w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center'>
              <span className='text-gray-500 font-semibold'>LOGO</span>
            </div>
            <p className='text-gray-600'>Global Trade Co.</p>
          </div>
          <div className='text-center'>
            <div className='w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center'>
              <span className='text-gray-500 font-semibold'>LOGO</span>
            </div>
            <p className='text-gray-600'>Import Solutions</p>
          </div>
          <div className='text-center'>
            <div className='w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center'>
              <span className='text-gray-500 font-semibold'>LOGO</span>
            </div>
            <p className='text-gray-600'>Customs Expert</p>
          </div>
          <div className='text-center'>
            <div className='w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center'>
              <span className='text-gray-500 font-semibold'>LOGO</span>
            </div>
            <p className='text-gray-600'>Trade Flow</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionPartners
