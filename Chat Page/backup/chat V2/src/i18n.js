'use client'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import I18NextXhrBackend from 'i18next-xhr-backend'

i18n
  .use(I18NextXhrBackend)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {}
      },
      th: {
        translation: {}
      }
    },
    lng: 'th',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })
export default i18n
