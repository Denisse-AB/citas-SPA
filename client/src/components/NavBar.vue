<template>
  <div>
      <b-navbar id="fixed" variant="light" class="shadow fixed-top " type="light">
        <b-navbar-nav>
          <b-nav-item href="/">{{ $t('home')}}</b-nav-item>
        <!-- logo -->
        </b-navbar-nav>
            <b-navbar-brand class="mx-auto" href="/">
              <img alt="Vue logo" src="../assets/logo.png">
            </b-navbar-brand>
        <!-- dropdown -->
        <b-navbar-nav>
          <b-nav-item-dropdown :text="$t('lang')" right>
          <b-dropdown-item v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">{{entry.title}}</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    <AppForm msg="Welcome" :lang="$t('calendar')"/>
  </div>
</template>

<script>
import AppForm from '../components/AppForm.vue'

export default {
  name: 'App',
  components: {
    AppForm
  },

  data () {
    return {
      languages: [
        { language: 'en', title: 'English' },
        { language: 'es', title: 'Español' }
      ]
    }
  },
  methods: {
    changeLocale (locale) {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'es' : 'en'
    }
  }
}
</script>

<style lang="scss">
img {
  height: 60px;
}
</style>
