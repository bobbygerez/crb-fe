<template>
<q-page class="docs-input row main">
    <div class="formContainer self-center col-12 offset-sm-2 col-sm-8 offset-md-3 col-md-6 ">
        <form @submit.prevent="submit">

            <p class="text-h6 q-pa-sm">
                <q-icon name="lock"> </q-icon> USER LOGIN
            </p>
            <q-input outlined v-model="$v.email.$model" label="Username/Email" dark @keyup.enter="login" />
            <q-input v-model="$v.password.$model" outlined :type="isPwd ? 'password' : 'text'" dark class="q-mt-sm form__input" label="Password" @keyup.enter="login">
                <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
                </template>
            </q-input>
            <div>
                <q-btn :loading="loading" @click="login" color="primary" class="q-mt-sm">
                    Login
                </q-btn>
            </div>
            <q-banner dense inline-actions class="text-white bg-red q-mt-sm" v-if="$v.email.$dirty && !$v.email.required||$v.email.$dirty && !$v.email.required||!$v.password.minLength">
                <div class="row">
                    <transition enter-active-class="animated flipInX" leave-active-class="animated flipOutX" appear>
                        <q-banner inline-actions class="text-white bg-red">
                            <div v-if="$v.email.$dirty && !$v.email.required">
                                <q-icon name="email"> </q-icon> Email is required.
                            </div>
                            <div v-if="$v.password.$dirty && !$v.password.required">
                                <q-icon name="lock"> </q-icon> Password is required
                            </div>
                            <div v-if="!$v.password.minLength">
                                <q-icon name="lock"> </q-icon> Password must have at least {{$v.password.$params.minLength.min}} characters.
                            </div>
                        </q-banner>
                    </transition>
                </div>

            </q-banner>

        </form>
    </div>
</q-page>
</template>

<script>
import {
  setAuthHeader
} from 'boot/axios'

import {
  required,
  minLength
} from 'vuelidate/lib/validators'
import {
  mapActions
} from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: '',
      isPwd: true,
      loading: false
    }
  },
  validations: {
    email: {
      required
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  methods: {
    ...mapActions('users', ['setToken', 'setUser', 'setDelivery']),
    ...mapActions('global', ['setLeftDrawer']),
    login () {
      this.loading = true
      this.$v.email.$touch()
      this.$v.password.$touch()
      if (this.$v.$invalid) {
        this.$q.notify({
          message: 'Please review your login credentials.',
          color: 'negative',
          icon: 'warning'
        })
        this.loading = false
      } else {
        this.$axios.post('/login', {
          username: this.email,
          password: this.password
        })
          .then(res => {
            this.setToken(res.data.success.token)
            this.setUser(res.data.user)
            this.setDelivery(res.data.user)

            setAuthHeader(res.data.success.token)
            this.loading = false
            this.setLeftDrawer(true)
            this.$router.push({
              path: '/dashboard'
            })
          })
          .catch(error => {
            this.loading = false
            if (error.response.status === 401) {
              this.$q.notify({
                icon: 'warning',
                color: 'negative',
                message: error.response.data.error
              })
              return
            }
            this.$q.notify({
              icon: 'warning',
              color: 'negative',
              message: error.message
            })
          })
      }
    }
  },
  created () {
    if (this.$store.getters['users/token']) {
      this.$router.push({
        path: '/dashboard'
      })
    }
  }
}
</script>

<style>
.main {
    background: url(../assets/bg-min.jpg);
    background-repeat: no-repeat;
    background-size: cover;
}

.form-wrapper {
    background: rgba(0, 0, 0, 0.5);
    overflow: auto;
}

.form-wrapper,
.form-wrapper input,
.form-wrapper label {
    color: #fff;
}

.header-login {
    text-align: center;
}

.formContainer,
.formContainer input,
.formContainer label {
    color: #fff;
}

.formContainer {
    width: 500px;
    max-width: 90vw;
    background: rgba(0, 0, 0, 0.5);
    padding: 20px;
    overflow: hidden;
}
</style>
