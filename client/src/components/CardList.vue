<script setup>
import { ref, reactive } from 'vue'
import { Form } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import CardInput from './CardInput.vue'
import SelectInput from './SelectInput.vue'
import ThankYou from './ThankYou.vue'
import Datepicker from '@vuepic/vue-datepicker'
import PostService from '@/utils/PostService'
import '@vuepic/vue-datepicker/dist/main.css'

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
const disabled = ref(false)
const responseOK = ref(false)

const Submit = async (lang) => {
  disabled.value = true
  const formatDate = date.value ? date.value.toLocaleDateString() : ''

  try {
    const res = await PostService.insertAppointment(
      name.value,
      email.value,
      tel.value,
      formatDate,
      selected.value,
      lang
    )
    if (res.status === 201) {
      responseOK.value = true
      disabled.value = false
      data.date = res.data.date
      data.time = res.data.time
    } else {
      rejected.value = true
      disabled.value = false
    }
  } catch (error) {
    disabled.value = false
    alert(t('alert'))
  }
}
</script>

<template>
  <div v-show="!responseOK" class="my-3 text-black">
    <Form @submit="Submit(t('lang'))">
      <CardInput
        v-model="email"
        name="E-mail"
        type="email"
        rules="required|email"
      />
      <CardInput
        v-model="name"
        :name="t('name')"
        type="text"
        rules="required|alpha_spaces"
      />
      <CardInput
        v-model="tel"
        :name="t('tel')"
        type="tel"
        rules="required|digits:10"
      />
      <div class="my-3 mobile:mx-3 tablet:flex laptop:flex">
        <!-- Datepicker config: https://vue3datepicker.com/ -->
        <Datepicker
          class="mt-1 mx-auto mobile:max-w-sm"
          v-model="date"
          :placeholder="t('date')"
          :enableTimePicker="false"
          :locale="t('lang')"
          :closeOnAutoApply="true"
          autoApply
        />
        <SelectInput
          v-model="selected"
          :label="t('label')"
          @custom-change="(time) => selected = time"
        />
      </div>
      <div class="justify-center">
        <button
          class="text-white font-semibold border border-vue-green
          rounded-sm shadow-lg w-24 p-2 justify-center bg-vue-green
          inline-flex items-center ease-in hover:scale-110 hover:bg-gradient-to-r from-emerald-600 duration-300"
          type="submit"
          :disabled="disabled"
        >
          <svg v-show="disabled" class="inline mr-2 w-8 h-8 text-white animate-spin fill-gray-font" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          {{ t('submit') }}
        </button>
      </div>
    </Form>
    <p
      v-show="rejected"
      class="text-rose-500 font-weight-bold mb-0 mt-2"
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

<style lang="css">
/* date picker overwrite */
  .dp__theme_light {
    --dp-icon-color: #374151;
    --dp-success-color: #42b883;
    --dp-border-color: #a1a1a1;
  }
  .dp__active_date {
    background:var(--dp-success-color)
  }
</style>
