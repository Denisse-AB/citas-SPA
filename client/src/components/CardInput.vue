<template>
  <div>
    <label class="px-3" for="name">{{ name }}</label>
    <Field
      class="placeholder:text-input-placeholder"
      :value="modelValue"
      :name="name"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="t('input') + name"
      :type="type"
      :rules="rules"
    />
    <ErrorMessage :name="name" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})

defineProps({
  modelValue: String,
  name: String,
  type: String,
  rules: String
})

defineEmits(['update:modelValue'])
</script>
