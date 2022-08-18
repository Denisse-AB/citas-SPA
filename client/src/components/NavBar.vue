<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@vee-validate/i18n'
import i18n from '@/plugins/i18n'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})

const languages = ref([
  { language: 'en', title: 'English' },
  { language: 'es', title: 'Español' }
])

const changeLocale = (locale) => {
  i18n.global.locale.value = locale
  setLocale(locale)
}
</script>

<template>
  <header class="shadow-lg items-center justify-between flex p-5">
    <div>
      <a class="text-lg" href="/">{{ t('home')}}</a>
    </div>
    <a href="/">
      <img class="w-16 mx-auto" alt="Vue logo" src="../assets/logo.svg">
    </a>
    <Menu
      as="div"
      class="relative text-left justify-end flex"
    >
      <div>
        <MenuButton
          class="inline-flex justify-center w-full rounded-md
          shadow-sm px-4 py-1 bg-white text-sm font-medium
          text-gray-font hover:bg-input-hover-bg focus:outline-none
          focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          Lang
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
          </svg>
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="origin-top-right absolute right-0 mt-2 w-56
          rounded-md shadow-lg bg-white ring-1 ring-black
          ring-opacity-5 focus:outline-none"
        >
          <div class="py-1 justify-end">
            <MenuItem
              v-slot="{ active }"
              v-for="entry in languages"
              :key="entry.title"
            >
              <div>
                <a type="button" @click="changeLocale(entry.language)" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{ entry.title }}</a>
              </div>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </header>
</template>
