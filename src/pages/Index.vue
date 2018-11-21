<template>
  <q-page padding class="row justify-center">
    <div style="width: 800px; max-width: 90vw;">
      <div class="flex-col-docs">
        <h4>User Login</h4>
        <q-alert v-if="visible" color="negative" icon="warning" appear :actions="[{ label: 'Dismiss', handler: () => { visible = false } }]" class="q-mb-sm">
          {{ message }}
        </q-alert>
        <div class="doc-container">
          <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
          <div class="column" style="height: 250px">
            <div class="col-4 col-md-4">
              <q-input v-model="form.email" stack-label="Username/Email" />

            </div>
            <div class="col-4 col-md-4">
              <q-input clear-value v-model="form.password" stack-label="Password" type="password" />
              <br />
              <q-btn color="primary" @click="submit">Login</q-btn>
            </div>
          </div>
        </div>

      </div>
    </div>
  </q-page>
</template>

<style lang="stylus">
</style>

<script>
// import axios from 'axios'
import { required, email } from 'vuelidate/lib/validators'
import { setAuthHeader } from 'plugins/axios'

export default {
  data () {
    return {
      visible: false,
      message: '',
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      email: { required, email }
    }
  },
  created () {
    console.log('url', process.env.API)
    if (this.$store.getters.userLogin) {
      this.$router.push('/dashboard')
    }
  },
  methods: {
    submit () {
      // this.$v.form.$touch()

      // if (this.$v.form.$error) {
      //   this.$q.notify('Please review fields again.')
      //   return
      // }

      this.$axios.request({
        url: '/login',
        method: 'post',
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
        .then(res => {
          this.$store.dispatch('pattys/token', res.data.success.token)
          this.$store.dispatch('pattys/user', res.data.user)
          this.$store.dispatch('pattys/userLogin', res.data.userLogin)
          this.$store.dispatch('globals/menus', res.data.menus)
          // this.$q.localStorage.set('token', res.data.success.token)
          this.$router.push('/dashboard')
          // setAuthHeader(this.$store.getters['pattys/token'])
        })
        .catch(error => {
          this.visible = true
          this.message = error.response.data.error
        })
    }
  }
}
</script>
