import { Shield, Users, Zap } from 'lucide-react'
import React from 'react'

const SectionHighlights = () => {
  return (
    <section className='py-20 bg-gradient-to-r from-blue-600 to-purple-600'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center text-white'>
          <h2 className='text-4xl font-bold mb-6'>
            Streamline Your Trade Operations
          </h2>
          <p className='text-xl mb-8 max-w-3xl mx-auto'>
            Reduce classification errors, speed up customs clearance, and ensure
            compliance with international trade regulations.
          </p>
          <div className='grid md:grid-cols-3 gap-8 mt-12'>
            <div className='text-center'>
              <Zap className='w-12 h-12 mx-auto mb-4 text-yellow-300' />
              <h3 className='text-xl font-semibold mb-2'>99.5% Accuracy</h3>
              <p className='text-blue-100'>
                Industry-leading precision in customs classification
              </p>
            </div>
            <div className='text-center'>
              <Shield className='w-12 h-12 mx-auto mb-4 text-green-300' />
              <h3 className='text-xl font-semibold mb-2'>Compliance Ready</h3>
              <p className='text-blue-100'>
                Always up-to-date with latest regulations
              </p>
            </div>
            <div className='text-center'>
              <Users className='w-12 h-12 mx-auto mb-4 text-pink-300' />
              <h3 className='text-xl font-semibold mb-2'>24/7 Support</h3>
              <p className='text-blue-100'>Expert help whenever you need it</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionHighlights
