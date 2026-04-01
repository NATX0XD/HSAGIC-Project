import React from 'react'

const SectionFAQ = () => {
  return (
    <section className='py-20 bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Frequently Asked Questions
          </h2>
        </div>

        <div className='space-y-8'>
          <div className='bg-white rounded-lg p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              Can I change my plan anytime?
            </h3>
            <p className='text-gray-600'>
              Yes, you can upgrade or downgrade your plan at any time. Changes
              take effect immediately, and we'll prorate the charges.
            </p>
          </div>

          <div className='bg-white rounded-lg p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              What payment methods do you accept?
            </h3>
            <p className='text-gray-600'>
              We accept all major credit cards, PayPal, and bank transfers for
              enterprise customers.
            </p>
          </div>

          <div className='bg-white rounded-lg p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              Is there a free trial for paid plans?
            </h3>
            <p className='text-gray-600'>
              Yes, all paid plans come with a 14-day free trial. No credit card
              required to start.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionFAQ
