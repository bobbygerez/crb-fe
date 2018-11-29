<template>
  <q-layout>
    <q-page-container>
      <q-page class="docs-input row main">
        <div class="formContainer self-center col-12 offset-sm-2 col-sm-8 offset-md-3 col-md-6">
          <div class="row justify-center">
            <div>
              <h3>PBMIS</h3>
            </div>
          </div>
          <!-- Always add a <form> tag on your form inputs if you want the 'next' button to work on mobile devices, otherwise each input forms
          will show 'go' or submit instead which is a UX blunder since you'll have to click for the proceeding input field or hide the
          keyboard everytime if the other input fields are covered by it-->
          <form>
            <f-v-field-validator :val="$v.form.email">
              <q-input
                @blur="$v.form.email.$touch"
                :error="$v.form.email.$error"
                v-model="form.email"
                float-label="Username"
                value=""
                color="primary"
                :dark="dark"
                @keyup.enter="login"
              />
            </f-v-field-validator>
            <br>
            <f-v-field-validator :val="$v.form.password">
              <q-input
                @blur="$v.form.password.$touch"
                :error="$v.form.password.$error"
                v-model="form.password"
                float-label="Password"
                value=""
                color="primary"
                :dark="dark"
                type="password"
                @keyup.enter="login"
              />
            </f-v-field-validator>
            <br>
            <div>
              <br>
              <q-btn
                class="full-width"
                :loading="loading"
                @click="login"
                color="primary"
              >
                Login
              </q-btn>
              <br>
              <br>
              <q-btn
                class="pull-right"
                flat
                dense
                label="Forgot password?"
                @click="$refs.minimizedModal.show()"
                no-caps
              />
              <q-modal
                ref="minimizedModal"
                minimized
                :content-css="{padding: '20px'}"
              >
                <div class="q-display-1 q-mb-md">Forgot Password</div>
                <p>Enter your email address associated with your account to reset your password.</p>
                <q-input
                  type="text"
                  float-label="Email Address"
                  value=""
                />
                <br>
                <q-btn
                  flat
                  color="primary"
                >Reset Password</q-btn>
                <q-btn
                  flat
                  color="primary"
                  @click="$refs.minimizedModal.hide()"
                >Cancel</q-btn>
              </q-modal>
            </div>
            <f-v-error-summary
              :valObj="$v"
              class="q-my-sm"
            />
          </form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
// import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
import { setAuthHeader } from 'plugins/axios'
import FVErrorSummary from 'components/form-validations/FVErrorSummary'
import FVFieldValidator from 'components/form-validations/FVFieldValidator'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    FVErrorSummary,
    FVFieldValidator
  },
  data () {
    return {
      visible: false,
      message: '',
      form: {
        email: '',
        // username: '',
        password: ''
      },
      dark: true,
      loading: false
    }
  },
  validations: {
    form: {
      email: { required, _$Username_or_Email: () => true },
      password: { required, _$Password: () => true }
    }
  },
  computed: {
    ...mapState('pattys', ['token'])
  },
  methods: {
    ...mapActions('pattys', ['setToken', 'setUser', 'setUserLogin']),
    ...mapActions('globals', ['setMenus']),
    login () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Please review fields again.')
        return
      }
      if (this.loading === true) {
        return
      }
      this.loading = true

      this.$axios.request({
        url: '/login',
        method: 'post',
        data: this.form
      })
        .then(res => {
          this.setToken(res.data.success.token)
          this.setUser(res.data.user)
          this.setUserLogin(res.data.userLogin)
          this.setMenus(res.data.menus)
          this.$router.push('/dashboard')
          setAuthHeader(this.token)
        })
        .catch(error => {
          this.loading = false
          if (error.response.status === 401) {
            this.$q.notify({ type: 'negative', message: error.response.data.error })
            return
          }
          this.$q.notify({ type: 'negative', message: error.message })
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
