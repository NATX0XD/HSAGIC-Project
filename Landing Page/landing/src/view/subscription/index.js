'use client'
import React, { useState } from 'react'
import SectionPricing from './SectionPricing'
import SectionComparison from './SectionComparison'
import SectionFAQ from './SectionFAQ'
import SectionHero from './SectionHero'

const SubscriptionPageView = () => {
  const [billingCycle, setBillingCycle] = useState('monthly')

  return (
    <>
      <SectionHero
        billingCycle={billingCycle}
        setBillingCycle={setBillingCycle}
      />
      <SectionPricing billingCycle={billingCycle} />
      <SectionComparison />
      <SectionFAQ />
    </>
  )
}

export default SubscriptionPageView
