'use client'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import I18NextXhrBackend from 'i18next-xhr-backend'
import CommonLandingPageEn from '@/locales/en/landingPage/commonLandingPage.json'
import CommonLandingPageTh from '@/locales/th/landingPage/commonLandingPage.json'
import CommonPricingPageEn from '@/locales/en/pricingPage/commonPricingPage.json'
import CommonPricingPageTh from '@/locales/th/pricingPage/commonPricingPage.json'
i18n
  .use(I18NextXhrBackend)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...CommonLandingPageEn,
          ...CommonPricingPageEn
        }
      },
      th: {
        translation: {
          ...CommonLandingPageTh,
          ...CommonPricingPageTh
        }
      }
    },
    lng: 'th',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })
export default i18n
