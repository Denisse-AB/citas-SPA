/* eslint-disable camelcase */
import { extend, configure } from 'vee-validate'
import { required, email, alpha_spaces, digits } from 'vee-validate/dist/rules'
import i18n from '@/plugins/i18n'

configure({
  defaultMessage: (field, values) => {
    // override the field name.
    values._field_ = i18n.t(`fields.${field}`)

    return i18n.t(`validation.${values._rule_}`, values)
  }
})

// Install required rule and message.
extend('required', required)

extend('email', email)

extend('alpha_spaces', alpha_spaces)

extend('digits', digits)
