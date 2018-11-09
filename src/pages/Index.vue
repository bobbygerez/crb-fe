<template>
  <q-page padding class="row justify-center">
    <div style="width: 800px; max-width: 90vw;">
      <div class="flex-col-docs">
        <h4>User Login</h4>
        <q-alert
          v-if="visible"
          color="negative"
          icon="warning"
          appear
          :actions="[{ label: 'Dismiss', handler: () => { visible = false } }]"
          class="q-mb-sm"
        >
        {{ message }}
        </q-alert>
        <div class="doc-container">
          <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
          <div class="column" style="height: 250px">
            <div class="col-4 col-md-4">
              <q-input
                  v-model="form.email"
                  @blur="$v.form.email.$touch"
                  :error="$v.form.email.$error"
                  stack-label="Email"
                />
                
            </div>
            <div class="col-4 col-md-4">
              <q-input
                  clear-value
                  v-model="form.password"
                  stack-label="Password"
                  type="password"
                />
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
import axios from 'axios'
import { required, email } from 'vuelidate/lib/validators'

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
  created(){
    if (this.$store.getters.userLogin) {
      this.$router.push('/dashboard')
    }
  },
  methods: {
    submit () {
      var data = this
      this.$v.form.$touch()

      if (this.$v.form.$error) {
        this.$q.notify('Please review fields again.')
        return
      }

      axios.post(process.env.API + '/login',{
        email: this.form.email,
        password: this.form.password
      })
      .then(function(res){
        data.$store.dispatch('token', res.data.token);
        data.$store.dispatch('user', res.data.user);
        data.$store.dispatch('userLogin', res.data.userLogin);
        data.$router.push('/dashboard')
      })
      .catch(function(error){
        data.visible = true
        data.message = error.response.data

      })

      
    }
  }
}
</script>