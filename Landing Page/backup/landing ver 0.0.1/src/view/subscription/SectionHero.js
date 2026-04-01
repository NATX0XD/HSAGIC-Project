import React from 'react'

const SectionHero = ({ billingCycle = 'monthly', setBillingCycle = null }) => {
  return (
    <section className='py-16'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
          Choose Your Perfect Plan
        </h1>
        <p className='text-xl text-gray-600 mb-8'>
          Start free, upgrade when you need more power. All plans include our
          core AI classification engine.
        </p>

        {/* Billing Toggle */}
        <div className='flex items-center justify-center space-x-4 mb-12'>
          <span
            className={`text-sm font-medium ${
              billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() =>
              setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')
            }
            className='relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors'
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'
            }`}
          >
            Yearly
          </span>
          <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium'>
            Save 17%
          </span>
        </div>
      </div>
    </section>
  )
}

export default SectionHero
