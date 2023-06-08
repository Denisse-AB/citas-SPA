<script setup>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

defineProps({
  label: String
})

const hour = [
  { text: '' },
  { text: '11:00 am' },
  { text: '12:00 pm' },
  { text: '1:00 pm' },
  { text: '2:00 pm' },
  { text: '3:00 pm' }
]
const selected = ref(hour[0])

const emit = defineEmits(['customChange'])

const handleChange = (time) => {
  emit('customChange', time)
}
</script>

<template>
  <div class="my-1 mx-auto">
    <Listbox v-model="selected">
      <div>
        <ListboxButton
          class="w-full tablet:w-56 border border-input-border cursor-default bg-white py-2 pl-3 pr-10 text-left shadow-sm rounded-sm focus:outline-none focus-visible:border-vue-green focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-vue-green text-sm"
        >
          <span class="block truncate">{{ label + selected.text }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="time in hour"
              :key="time.text"
              :value="time"
              as="template"
            >
              <li
                @click="handleChange(time.text)"
                :class="[
                  active ? 'bg-input-hover text-gray-font' : 'text-gray-font',
                  'relative cursor-default select-none py-2 pl-10 pr-9'
                ]"
              >
                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                  time.text
                }}</span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-vue-green"
                >
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
