import { Check, X } from 'lucide-react'
import React from 'react'

const SectionComparison = () => {
  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Detailed Feature Comparison
          </h2>
          <p className='text-xl text-gray-600'>
            See exactly what's included in each plan
          </p>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='border-b'>
                <th className='text-left py-4 px-6 font-semibold text-gray-900'>
                  Features
                </th>
                <th className='text-center py-4 px-6 font-semibold text-gray-900'>
                  Free
                </th>
                <th className='text-center py-4 px-6 font-semibold text-blue-600'>
                  Professional
                </th>
                <th className='text-center py-4 px-6 font-semibold text-purple-600'>
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b'>
                <td className='py-4 px-6 text-gray-900'>Monthly Queries</td>
                <td className='py-4 px-6 text-center'>10</td>
                <td className='py-4 px-6 text-center'>Unlimited</td>
                <td className='py-4 px-6 text-center'>Unlimited</td>
              </tr>
              <tr className='border-b bg-gray-50'>
                <td className='py-4 px-6 text-gray-900'>Image Recognition</td>
                <td className='py-4 px-6 text-center'>
                  <X className='w-5 h-5 text-gray-400 mx-auto' />
                </td>
                <td className='py-4 px-6 text-center'>
                  <Check className='w-5 h-5 text-green-500 mx-auto' />
                </td>
                <td className='py-4 px-6 text-center'>
                  <Check className='w-5 h-5 text-green-500 mx-auto' />
                </td>
              </tr>
              <tr className='border-b'>
                <td className='py-4 px-6 text-gray-900'>API Access</td>
                <td className='py-4 px-6 text-center'>
                  <X className='w-5 h-5 text-gray-400 mx-auto' />
                </td>
                <td className='py-4 px-6 text-center'>
                  <Check className='w-5 h-5 text-green-500 mx-auto' />
                </td>
                <td className='py-4 px-6 text-center'>
                  <Check className='w-5 h-5 text-green-500 mx-auto' />
                </td>
              </tr>
              <tr className='border-b bg-gray-50'>
                <td className='py-4 px-6 text-gray-900'>Team Collaboration</td>
                <td className='py-4 px-6 text-center'>
                  <X className='w-5 h-5 text-gray-400 mx-auto' />
                </td>
                <td className='py-4 px-6 text-center'>Up to 5 users</td>
                <td className='py-4 px-6 text-center'>Unlimited</td>
              </tr>
              <tr className='border-b'>
                <td className='py-4 px-6 text-gray-900'>Support</td>
                <td className='py-4 px-6 text-center'>Email</td>
                <td className='py-4 px-6 text-center'>Priority</td>
                <td className='py-4 px-6 text-center'>Dedicated Manager</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default SectionComparison
