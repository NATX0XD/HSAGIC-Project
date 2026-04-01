import React from 'react'

const SectionCTA = () => {
  return (
    <section className='py-20 bg-gradient-to-r from-blue-600 to-purple-600'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h2 className='text-4xl font-bold text-white mb-6'>
          Ready to Transform Your Trade Operations?
        </h2>
        <p className='text-xl text-blue-100 mb-8'>
          Start classifying your products with AI precision today.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button className='bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100'>
            Start Free Trial
          </button>
          <button className='border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600'>
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  )
}

export default SectionCTA
