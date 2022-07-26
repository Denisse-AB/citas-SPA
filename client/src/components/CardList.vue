<template>
  <div v-show="!responseOK">
    <Form @submit="Submit(t('lang'))">
      <CardInput
        v-model="name"
        :name="t('name')"
        type="text"
        rules="required|alpha_spaces"
      />
      <CardInput
        v-model="email"
        name="email"
        type="email"
        rules="required|email"
      />
      <CardInput
        v-model="tel"
        :name="t('tel')"
        type="tel"
        rules="required|digits:10"
      />
      <div class="m-5 tablet:flex laptop:flex">
        <!-- https://vue3datepicker.com/api/props/#selecttext -->
        <!-- https://vue3datepicker.com/customization/theming/ -->
        <Datepicker
          class="mt-1 mx-auto mobile:max-w-sm"
          v-model="date"
          :placeholder="t('date')"
          :enableTimePicker="false"
          :locale="t('lang')"
        />
        <SelectInput
          v-model="selected"
          :label="t('label')"
          @custom-change="(time) => selected = time"
        />
      </div>
      <div class="justify-center">
        <!-- TODO: DISABLE BUTTON AND BRING SPINNER -->
        <button class="border border-black" type="submit">
          {{ t('submit') }}
        </button>
      </div>
    </Form>
    <p
      v-show="rejected"
      class="text-danger font-weight-bold mb-0 mt-2"
    >
      {{ t('rejected')}}
    </p>
  </div>
  <ThankYou
    :responseOk="responseOK"
    :date="data.date"
    :time="data.time"
  />
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Form } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import CardInput from './CardInput.vue'
import SelectInput from './SelectInput.vue'
import ThankYou from './ThankYou.vue'
import Datepicker from '@vuepic/vue-datepicker'
import PostService from '@/PostService'
import '@vuepic/vue-datepicker/dist/main.css'

// TODO: https://vuejs.org/guide/reusability/composables.html#composables
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})

const data = reactive({
  date: '',
  time: ''
})

const name = ref('')
const email = ref('')
const tel = ref('')
const date = ref('')
const selected = ref('')
const rejected = ref(false)
const responseOK = ref(false)

const Submit = async (lang) => {
  try {
    const res = await PostService.insertAppointment(
      name.value,
      email.value,
      tel.value,
      date.value,
      selected.value,
      lang
    )
    if (res.status === 201) {
      responseOK.value = true
      data.date = res.data.date
      data.time = res.data.time
    } else {
      rejected.value = true
    }
  } catch (error) {
    alert(t('alert'))
  }
}
</script>
