import { MessageCircle } from 'lucide-react'
import React from 'react'

const SectionFAQ = () => {
  return (
    <section className='py-20 relative z-10'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4'>
            Frequently Asked Questions
          </h2>
          <p className='text-xl text-gray-300'>
            Got questions? We've got answers about our AI-powered solutions
          </p>
        </div>

        <div className='space-y-6'>
          {[
            {
              question: 'Can I change my plan anytime?',
              answer:
                "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the charges for a seamless transition."
            },
            {
              question: 'What payment methods do you accept?',
              answer:
                'We accept all major credit cards, PayPal, and bank transfers for enterprise customers. All payments are processed securely with industry-standard encryption.'
            },
            {
              question: 'Is there a free trial for paid plans?',
              answer:
                'Yes, all paid plans come with a 14-day free trial. No credit card required to start. Experience the full power of our AI before committing.'
            },
            {
              question: 'How accurate is the AI classification?',
              answer:
                'Our AI achieves 90% accuracy on the free plan, 95% on Professional, and up to 99% on Enterprise with custom model training. Accuracy improves with usage.'
            }
          ].map((faq, index) => (
            <div
              key={index}
              className='bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300'
            >
              <h3 className='text-lg font-semibold text-white mb-3 flex items-center'>
                <MessageCircle className='w-5 h-5 mr-2 text-cyan-400' />
                {faq.question}
              </h3>
              <p className='text-gray-300 leading-relaxed'>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectionFAQ
