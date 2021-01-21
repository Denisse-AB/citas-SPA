<template>
  <div class="mx-auto w-75 mt-5 padding">
    <div id="card" class="position-relative p-4">
      <p class="text-dark font-weight-bold">
        {{ $t('welcomeMsg') }}! {{ $t('title')}}.
      </p>
      <b-card class="shadow-sm">
        <!-- form -->
        <b-container v-show="card" fluid>

          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-default">E-mail:</label>
            </b-col>

            <b-col sm="10">
              <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
              <b-form-input
                v-model="email"
                type="email"
                :class="{'is-invalid' : errors[0]}" :placeholder="$t('email')"
                trim
              ></b-form-input>
               <div class="error mt-1">{{ errors[0] }}</div>
              </ValidationProvider>
            </b-col>
          </b-row>

          <b-row class="my-3">
            <b-col sm="2">
              <label for="input-default">{{ $t('name')}}:</label>
            </b-col>
            <b-col sm="10">
              <ValidationProvider name="name" rules="required|alpha_spaces" v-slot="{ errors }">
               <b-form-input
                 v-model="name"
                 :class="{'is-invalid' : errors[0]}" :placeholder="$t('nameHolder')"
                 trim
                ></b-form-input>
               <div class="error mt-1">{{ errors[0] }}</div>
              </ValidationProvider>
            </b-col>
          </b-row>

          <b-row class="my-3">
            <b-col sm="2">
              <label for="input-default">Tel:</label>
            </b-col>
            <b-col sm="10">
          <ValidationProvider name="phone" rules="required|digits:10" v-slot="{ errors }">
            <b-form-input
              v-model="tel"
              :class="{'form-control': 'true', 'is-invalid' : errors[0]}" :placeholder="$t('tel')"
              trim
            ></b-form-input>
            <div class="error mt-1">{{ errors[0] }}</div>
          </ValidationProvider>
            </b-col>
          </b-row>

          <!-- div for pickers -->
          <b-row>
            <b-col class="mt-3" md>
              <b-form-datepicker
                v-model="date"
                :date-disabled-fn="dateDisabled"
                :placeholder="$t('dateHolder')"
                :locale="$t('calendar')"
              ></b-form-datepicker>
            </b-col>
            <b-col class="mt-3" md>
              <b-form-select
                v-model="selected"
                :options="options"
              ></b-form-select>
            </b-col>
          </b-row>

        </b-container>
        <b-button
          v-show="card"
          class="mt-3"
          :disabled="spinner"
          variant="success"
          @click="Submit"
        >
          {{ $t('submit')}}
        </b-button>

        <!-- thankyou note -->
        <div v-show="icon">
          <p id="icon"><font-awesome-icon class="text-success" icon="check-circle" /> {{ $t('thankyou')}}!</p>
          <h5 class="offset-3 msg">{{ $t('check')}} !</h5>
          <hr>
          <p class="mt-4">{{ $t('day')}} <strong>{{ data.date }}</strong> {{ $t('time')}} <strong>{{ data.time }}</strong></p>
        </div>
      </b-card>
      <p v-show="response" class="text-danger font-weight-bold mb-0 mt-2">
        {{ $t('message')}}
      </p>
      <b-overlay
        :show="spinner"
        no-wrap
      ></b-overlay>
    </div>
    <br>
    <br>
    <footer class="mt-2">Copyright &copy; 2021 Denisse AB Image: Vue.js</footer>
  </div>
</template>

<script>
import { BFormInput, BFormDatepicker, BButton } from 'bootstrap-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ValidationProvider } from 'vee-validate'
import PostService from '../PostService'
import '../validation'

export default {
  name: 'AppForm',

  props: {
    msg: String,
    lang: String
  },

  components: {
    ValidationProvider,
    BFormInput,
    BFormDatepicker,
    FontAwesomeIcon,
    BButton
  },

  data () {
    return {
      spinner: false,
      card: true,
      icon: false,
      response: false,
      data: {},
      email: '',
      name: '',
      date: '',
      tel: '',
      selected: null,
      options: [
        { value: null, text: 'Choose time - Hora' },
        { value: '12:00 pm', text: '12:00 pm' },
        { value: '1:00 pm', text: '1:00 pm' },
        { value: '2:00 pm', text: '2:00 pm' },
        { value: '3:00 pm', text: '3:00 pm' }
      ]
    }
  },

  methods: {
    dateDisabled (ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 5th of the month
      const weekday = date.getDay()
      const day = date.getDate()
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6 || day === 5
    },

    async Submit () {
      this.spinner = true
      this.data = {}

      try {
        await PostService.insertPost(
          this.email, this.name, this.date, this.tel, this.selected, this.lang

        ).then(res => {
          if (res.status === 201) {
            this.email = ''
            this.name = ''
            this.date = ''
            this.tel = ''
            this.selected = ''
            this.card = false
            this.spinner = false
            this.icon = true
            this.response = false
            this.data = res.data
          } else {
            this.spinner = false
            this.response = true
          }
        })
      } catch (err) {
        alert(this.$t('alert'))
        this.spinner = false
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$green-bg: #c6ebd9;
$error: red;
$green: green;
$sm : 576px;

#card {
  background-color: $green-bg;
}

.form-control.focus, .form-control:focus, .custom-select:focus {
  border-color: $green;
  box-shadow: 0 0 0 0.2rem rgba(77, 192, 181, 0.25);
}

.padding {
  padding-top: 100px;
}

.error {
  color: $error;
}

#icon {
  font-size: 70px;
}

.msg{
  font-family: 'Raleway', sans-serif;
}

@media (max-width: $sm) {
  #icon {
    font-size: 40px;
  }
}
</style>
