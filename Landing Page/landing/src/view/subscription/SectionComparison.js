import { Bot, Check, HeadphonesIcon, Sparkles, Users, X } from 'lucide-react'
import React from 'react'

const SectionComparison = () => {
  const featureCategories = [
    {
      name: 'Core Features',
      icon: Bot,
      features: [
        {
          name: 'Monthly Queries',
          free: '10',
          pro: 'Unlimited',
          enterprise: 'Unlimited'
        },
        {
          name: 'AI Classification',
          free: 'Basic',
          pro: 'Advanced',
          enterprise: 'Custom Models'
        },
        {
          name: 'Processing Speed',
          free: 'Standard',
          pro: 'Fast',
          enterprise: 'Ultra Fast'
        },
        { name: 'Accuracy Rate', free: '90%', pro: '95%', enterprise: '99%' }
      ]
    },
    {
      name: 'Advanced Capabilities',
      icon: Sparkles,
      features: [
        { name: 'Image Recognition', free: false, pro: true, enterprise: true },
        {
          name: 'Bulk Processing',
          free: false,
          pro: 'Up to 100',
          enterprise: 'Unlimited'
        },
        { name: 'API Access', free: false, pro: true, enterprise: true },
        {
          name: 'Custom Integrations',
          free: false,
          pro: false,
          enterprise: true
        }
      ]
    },
    {
      name: 'Team & Collaboration',
      icon: Users,
      features: [
        {
          name: 'Team Members',
          free: '1',
          pro: 'Up to 5',
          enterprise: 'Unlimited'
        },
        { name: 'Shared Workspaces', free: false, pro: true, enterprise: true },
        {
          name: 'Role Management',
          free: false,
          pro: 'Basic',
          enterprise: 'Advanced'
        },
        { name: 'Audit Logs', free: false, pro: false, enterprise: true }
      ]
    },
    {
      name: 'Support & Services',
      icon: HeadphonesIcon,
      features: [
        {
          name: 'Support Level',
          free: 'Email',
          pro: 'Priority',
          enterprise: 'Dedicated Manager'
        },
        {
          name: 'Response Time',
          free: '48 hours',
          pro: '12 hours',
          enterprise: '2 hours'
        },
        {
          name: 'Training Sessions',
          free: false,
          pro: false,
          enterprise: true
        },
        { name: 'SLA Guarantee', free: false, pro: false, enterprise: '99.9%' }
      ]
    }
  ]

  return (
    <section className='py-20 bg-white/5 backdrop-blur-xl border-y border-white/20 relative z-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4'>
            Feature Comparison
          </h2>
          <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
            Compare all features across our AI-powered plans to find the perfect
            fit for your needs
          </p>
        </div>

        <div className='space-y-12'>
          {featureCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20'
            >
              <div className='flex items-center mb-8'>
                <div className='w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4'>
                  <category.icon className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-white'>
                  {category.name}
                </h3>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-white/20'>
                      <th className='text-left py-4 px-6 font-semibold text-gray-300'>
                        Feature
                      </th>
                      <th className='text-center py-4 px-6 font-semibold text-gray-300'>
                        Free
                      </th>
                      <th className='text-center py-4 px-6 font-semibold text-cyan-400'>
                        Professional
                      </th>
                      <th className='text-center py-4 px-6 font-semibold text-purple-400'>
                        Enterprise
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.features.map((feature, index) => (
                      <tr
                        key={index}
                        className={`border-b border-white/10 ${
                          index % 2 === 0 ? 'bg-white/5' : ''
                        }`}
                      >
                        <td className='py-4 px-6 text-white font-medium'>
                          {feature.name}
                        </td>
                        <td className='py-4 px-6 text-center'>
                          {typeof feature.free === 'boolean' ? (
                            feature.free ? (
                              <div className='inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full'>
                                <Check className='w-5 h-5 text-white' />
                              </div>
                            ) : (
                              <div className='inline-flex items-center justify-center w-8 h-8 bg-gray-600 rounded-full'>
                                <X className='w-5 h-5 text-gray-400' />
                              </div>
                            )
                          ) : (
                            <span className='text-gray-300 font-medium'>
                              {feature.free}
                            </span>
                          )}
                        </td>
                        <td className='py-4 px-6 text-center'>
                          {typeof feature.pro === 'boolean' ? (
                            feature.pro ? (
                              <div className='inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full'>
                                <Check className='w-5 h-5 text-white' />
                              </div>
                            ) : (
                              <div className='inline-flex items-center justify-center w-8 h-8 bg-gray-600 rounded-full'>
                                <X className='w-5 h-5 text-gray-400' />
                              </div>
                            )
                          ) : (
                            <span className='text-cyan-300 font-medium'>
                              {feature.pro}
                            </span>
                          )}
                        </td>
                        <td className='py-4 px-6 text-center'>
                          {typeof feature.enterprise === 'boolean' ? (
                            feature.enterprise ? (
                              <div className='inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full'>
                                <Check className='w-5 h-5 text-white' />
                              </div>
                            ) : (
                              <div className='inline-flex items-center justify-center w-8 h-8 bg-gray-600 rounded-full'>
                                <X className='w-5 h-5 text-gray-400' />
                              </div>
                            )
                          ) : (
                            <span className='text-purple-300 font-medium'>
                              {feature.enterprise}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectionComparison
