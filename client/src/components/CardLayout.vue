<template>
  <div class="mx-auto mt-10 container laptop:max-w-3xl">
    <div class="position-relative p-4 border text-white
    border-black rounded-md bg-gradient-to-r from-vue-green to-teal-500 shadow-md mobile:mx-2">
      <p class="text-dark font-weight-bold pb-3">
        {{ t('message') }}! {{ t('title')}}.
      </p>
      <div class="border rounded-md border-black bg-white shadow">
        <CardList />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import CardList from './CardList'

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})

</script>
