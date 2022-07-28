<template>
  <div v-show="responseOk" class="text-gray-font">
    <div>
      <p class="text-5xl tablet:text-7xl flex mt-10 justify-center">
        <svg class="w-20 mobile:w-10" viewBox="0 0 24 24">
          <path class="fill-vue-green" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
        </svg>
        {{ t('thankyou')}}!
      </p>
      <h5 class="ml-20 mb-5 mt-3 tablet:mt-0">
        {{ t('check')}}!
      </h5>
      <hr>
      <p class="my-4">{{ t('day')}}
        <strong>{{ date }}</strong>
        {{ t('time')}}
        <strong>{{ time }}</strong>.
      </p>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})

defineProps({
  responseOk: Boolean,
  date: String,
  time: String
})
</script>
