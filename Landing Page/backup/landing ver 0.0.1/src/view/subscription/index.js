'use client'
import React, { useState } from 'react'
import SectionPricing from './SectionPricing'
import SectionComparison from './SectionComparison'
import SectionFAQ from './SectionFAQ'
import SectionHero from './SectionHero'

const SubscriptionPageView = () => {
  const [billingCycle, setBillingCycle] = useState('monthly')
  const getColorClasses = (color, popular = false) => {
    const colors = {
      gray: {
        card: 'border-gray-200 bg-white',
        button: 'bg-gray-600 hover:bg-gray-700 text-white',
        badge: 'bg-gray-100 text-gray-800',
        icon: 'text-gray-500'
      },
      blue: {
        card: popular
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
          : 'border-blue-200 bg-white',
        button: 'bg-blue-600 hover:bg-blue-700 text-white',
        badge: 'bg-blue-100 text-blue-800',
        icon: 'text-blue-500'
      },
      purple: {
        card: 'border-purple-200 bg-white',
        button: 'bg-purple-600 hover:bg-purple-700 text-white',
        badge: 'bg-purple-100 text-purple-800',
        icon: 'text-purple-500'
      }
    }
    return colors[color]
  }
  const plans = {
    free: {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        { name: 'Basic HS code classification', included: true },
        { name: 'Up to 10 queries per month', included: true },
        { name: 'Text-based queries only', included: true },
        { name: 'Basic support', included: true },
        { name: 'Image recognition', included: false },
        { name: 'Advanced AI analysis', included: false },
        { name: 'Bulk processing', included: false },
        { name: 'API access', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom integrations', included: false },
        { name: 'Detailed reports', included: false },
        { name: 'Team collaboration', included: false }
      ],
      color: 'gray',
      popular: false
    },
    pro: {
      name: 'Professional',
      price: { monthly: 29, yearly: 290 },
      description: 'For serious traders and businesses',
      features: [
        { name: 'Advanced HS code classification', included: true },
        { name: 'Unlimited queries', included: true },
        { name: 'Image recognition & analysis', included: true },
        { name: 'Advanced AI analysis', included: true },
        { name: 'Bulk processing (up to 100 items)', included: true },
        { name: 'API access', included: true },
        { name: 'Priority support', included: true },
        { name: 'Detailed reports & analytics', included: true },
        { name: 'Custom integrations', included: false },
        { name: 'Team collaboration (up to 5 users)', included: true },
        { name: 'Export compliance checking', included: true },
        { name: 'Historical data access', included: true }
      ],
      color: 'blue',
      popular: true
    },
    enterprise: {
      name: 'Enterprise',
      price: { monthly: 99, yearly: 990 },
      description: 'For large organizations',
      features: [
        { name: 'All Professional features', included: true },
        { name: 'Unlimited queries & processing', included: true },
        { name: 'Advanced image recognition', included: true },
        { name: 'Custom AI model training', included: true },
        { name: 'Unlimited bulk processing', included: true },
        { name: 'Full API access', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Unlimited team collaboration', included: true },
        { name: 'Advanced compliance tools', included: true },
        { name: 'Custom reporting', included: true },
        { name: 'SLA guarantee', included: true }
      ],
      color: 'purple',
      popular: false
    }
  }
  return (
    <>
      <SectionHero
        billingCycle={billingCycle}
        setBillingCycle={setBillingCycle}
      />
      <SectionPricing
        getColorClasses={getColorClasses}
        plans={plans}
        billingCycle={billingCycle}
      />
      <SectionComparison />
      <SectionFAQ />
    </>
  )
}

export default SubscriptionPageView
