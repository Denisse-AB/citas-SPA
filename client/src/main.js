/* eslint-disable camelcase */
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import { defineRule, configure } from 'vee-validate'
import { required, email, alpha_spaces, digits } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import es from '@vee-validate/i18n/dist/locale/es.json'
import en from '@vee-validate/i18n/dist/locale/en.json'

// tailwind
import './index.css'

// vee-validate rules
defineRule('required', required)
defineRule('email', email)
defineRule('alpha_spaces', alpha_spaces)
defineRule('digits', digits)

configure({
  validateOnInput: true,
  generateMessage: localize({
    es,
    en
  })
})

// Set initial locale
setLocale('es')

createApp(App).use(i18n).mount('#app')
