import { Check, Star, X } from 'lucide-react'
import React from 'react'

const SectionPricing = ({
  getColorClasses = null,
  plans = null,
  billingCycle = 'monthly'
}) => {
  return (
    <section className='pb-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-3 gap-8'>
          {Object.entries(plans).map(([key, plan]) => {
            const colorClasses = getColorClasses(plan.color, plan.popular)
            const price = plan.price[billingCycle]

            return (
              <div
                key={key}
                className={`relative rounded-2xl border-2 p-8 ${colorClasses.card}`}
              >
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                    <div className='bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center'>
                      <Star className='w-4 h-4 mr-1' />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className='text-center mb-8'>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                    {plan.name}
                  </h3>
                  <p className='text-gray-600 mb-6'>{plan.description}</p>
                  <div className='mb-6'>
                    <span className='text-4xl font-bold text-gray-900'>
                      ${price}
                    </span>
                    <span className='text-gray-600'>
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${colorClasses.button}`}
                  >
                    {plan.name === 'Free' ? 'Get Started' : 'Choose Plan'}
                  </button>
                </div>

                <div className='space-y-4'>
                  <h4 className='font-semibold text-gray-900 mb-4'>
                    Features included:
                  </h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className='flex items-center space-x-3'>
                      {feature.included ? (
                        <Check className='w-5 h-5 text-green-500 flex-shrink-0' />
                      ) : (
                        <X className='w-5 h-5 text-gray-400 flex-shrink-0' />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included ? 'text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SectionPricing
