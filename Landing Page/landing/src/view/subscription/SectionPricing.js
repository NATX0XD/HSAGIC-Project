import React from 'react'
import {
  Database,
  FileText,
  Headphones,
  Search,
  Check,
  X,
  Zap,
  Crown,
  Shield,
  Users,
  Upload,
  Clock,
  Sparkles,
  Bot,
  TrendingUp,
  Lock,
  Eye,
  Settings,
  Rocket,
  HeadphonesIcon
} from 'lucide-react'
const SectionPricing = ({ billingCycle = 'monthly' }) => {
  const plans = {
    free: {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started with AI',
      features: [
        { name: 'Basic HS code classification', included: true, icon: Search },
        { name: 'Up to 10 queries per month', included: true, icon: Database },
        { name: 'Text-based queries only', included: true, icon: FileText },
        { name: 'Basic support', included: true, icon: Headphones },
        { name: 'Image recognition', included: false, icon: Eye },
        { name: 'Advanced AI analysis', included: false, icon: Bot },
        { name: 'Bulk processing', included: false, icon: Upload },
        { name: 'API access', included: false, icon: Settings },
        { name: 'Priority support', included: false, icon: Crown },
        { name: 'Custom integrations', included: false, icon: Zap },
        { name: 'Detailed reports', included: false, icon: TrendingUp },
        { name: 'Team collaboration', included: false, icon: Users }
      ],
      color: 'gray',
      popular: false,
      gradient: 'from-gray-600 to-gray-700'
    },
    pro: {
      name: 'Professional',
      price: { monthly: 29, yearly: 290 },
      description: 'AI-powered solution for businesses',
      features: [
        {
          name: 'Advanced HS code classification',
          included: true,
          icon: Search
        },
        { name: 'Unlimited queries', included: true, icon: Database },
        { name: 'Image recognition & analysis', included: true, icon: Eye },
        { name: 'Advanced AI analysis', included: true, icon: Bot },
        {
          name: 'Bulk processing (up to 100 items)',
          included: true,
          icon: Upload
        },
        { name: 'API access', included: true, icon: Settings },
        { name: 'Priority support', included: true, icon: Crown },
        {
          name: 'Detailed reports & analytics',
          included: true,
          icon: TrendingUp
        },
        { name: 'Custom integrations', included: false, icon: Zap },
        {
          name: 'Team collaboration (up to 5 users)',
          included: true,
          icon: Users
        },
        { name: 'Export compliance checking', included: true, icon: Shield },
        { name: 'Historical data access', included: true, icon: Clock }
      ],
      color: 'blue',
      popular: true,
      gradient: 'from-cyan-500 to-purple-500'
    },
    enterprise: {
      name: 'Enterprise',
      price: { monthly: 99, yearly: 990 },
      description: 'Ultimate AI solution for large organizations',
      features: [
        { name: 'All Professional features', included: true, icon: Crown },
        {
          name: 'Unlimited queries & processing',
          included: true,
          icon: Database
        },
        { name: 'Advanced image recognition', included: true, icon: Eye },
        { name: 'Custom AI model training', included: true, icon: Bot },
        { name: 'Unlimited bulk processing', included: true, icon: Upload },
        { name: 'Full API access', included: true, icon: Settings },
        {
          name: 'Dedicated account manager',
          included: true,
          icon: HeadphonesIcon
        },
        { name: 'Custom integrations', included: true, icon: Zap },
        { name: 'Unlimited team collaboration', included: true, icon: Users },
        { name: 'Advanced compliance tools', included: true, icon: Shield },
        { name: 'Custom reporting', included: true, icon: TrendingUp },
        { name: 'SLA guarantee', included: true, icon: Lock }
      ],
      color: 'purple',
      popular: false,
      gradient: 'from-purple-500 to-pink-500'
    }
  }
  return (
    <section className='pb-20 relative z-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-3 gap-8'>
          {Object.entries(plans).map(([key, plan]) => {
            const price = plan.price[billingCycle]

            return (
              <div
                key={key}
                className={`relative rounded-3xl p-8 transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'bg-white/20 backdrop-blur-xl border-2 border-cyan-400 shadow-2xl shadow-cyan-500/20'
                    : 'bg-white/10 backdrop-blur-xl border border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                    <div className='bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg'>
                      <Sparkles className='w-4 h-4 mr-2' />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className='text-center mb-8'>
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} shadow-lg mb-4`}
                  >
                    {plan.name === 'Free' && (
                      <Rocket className='w-8 h-8 text-white' />
                    )}
                    {plan.name === 'Professional' && (
                      <Crown className='w-8 h-8 text-white' />
                    )}
                    {plan.name === 'Enterprise' && (
                      <Shield className='w-8 h-8 text-white' />
                    )}
                  </div>
                  <h3 className='text-2xl font-bold text-white mb-2'>
                    {plan.name}
                  </h3>
                  <p className='text-gray-300 mb-6'>{plan.description}</p>
                  <div className='mb-6'>
                    <span className='text-5xl font-bold text-white'>
                      ${price}
                    </span>
                    <span className='text-gray-400'>
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  <button
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r ${plan.gradient} text-white hover:scale-105`}
                  >
                    {plan.name === 'Free'
                      ? 'Start Free'
                      : `Choose ${plan.name}`}
                  </button>
                </div>

                <div className='space-y-4'>
                  <h4 className='font-semibold text-white mb-4 flex items-center'>
                    <Sparkles className='w-5 h-5 mr-2 text-cyan-400' />
                    What's included:
                  </h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className='flex items-center space-x-3'>
                      {feature.included ? (
                        <div className='w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0'>
                          <Check className='w-4 h-4 text-white' />
                        </div>
                      ) : (
                        <div className='w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0'>
                          <X className='w-4 h-4 text-gray-400' />
                        </div>
                      )}
                      <feature.icon
                        className={`w-5 h-5 ${
                          feature.included ? 'text-cyan-400' : 'text-gray-500'
                        } flex-shrink-0`}
                      />
                      <span
                        className={`text-sm ${
                          feature.included ? 'text-white' : 'text-gray-400'
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
