<script setup>
import { Field } from 'vee-validate'
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

<template>
  <div>
    <label class="px-3" for="name">{{ name }}</label>
    <Field :name="name" :rules="rules" v-slot="{ field, errors }">
      <input
        :class="[
          'bg-white rounded-[3px] w-48 mobile:w-52 tablet:w-96 p-2 my-2 border-solid border-input-border border focus:outline-none focus:ring-0 ' +
            (errors[0]
              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
              : 'focus:valid:border-vue-green focus:ring-1 focus:ring-vue-green')
        ]"
        v-bind="field"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="t('input') + name"
      />
      <br />
      <span class="text-rose-500 tablet:ml-16">{{ errors[0] }}</span>
    </Field>
  </div>
</template>
