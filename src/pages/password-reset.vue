<template>
  <q-layout>
    <q-page-container>
      <q-page class="docs-input row main">
        <div class="formContainer self-center col-12 offset-sm-2 col-sm-8 offset-md-3 col-md-6">
          <div class="row justify-center">
            <div>
              <h3>Password Reset</h3>
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
                float-label="Email"
                value=""
                color="primary"
                :dark="dark"
                @keyup.enter="reset"
                disable
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
                @keyup.enter="reset"
              />
              <q-input
                @blur="$v.form.password.$touch"
                :error="$v.form.password_confirmation.$error"
                v-model="form.password_confirmation"
                float-label="Confirm Password"
                value=""
                color="primary"
                :dark="dark"
                type="password"
                @keyup.enter="reset"
              />
            </f-v-field-validator>
            <br>
            <div>
              <br>
              <q-btn
                class="full-width"
                :loading="loading"
                @click="reset"
                color="primary"
              >
                Submit
              </q-btn>
              <br>
              <br>
              
              
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
      email: '',
      visible: false,
      message: '',
      form: {
        email: '',
        password_confirmation: '',
        password: '',
        token: ''
      },
      dark: true,
      loading: false
    }
  },
  validations: {
    form: {
      email: { required, _$Username_or_Email: () => true },
      password: { required, _$Password: () => true },
      password_confirmation: { required, _$Password: () => true }
    }
  },
  computed: {
    ...mapState('pattys', ['token'])
  },
  created(){
      this.getUserInfo();
  },
  methods: {
    ...mapActions('pattys', ['setToken', 'setUser', 'setUserLogin']),
    ...mapActions('globals', ['setMenus']),
    reset() {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Please review fields again.')
        return
      }
      if (this.loading === true) {
        return
      }
      this.loading = true

      this.$axios.post(`password/reset`,{
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation,
        token: this.form.token
      }, {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then().catch(error => {
                this.loading = false
                this.$q.notify({ type: 'negative', message: error})
            });
      
    },
    getUserInfo(){
        this.$axios.get(`password/find/${this.$route.params.token}`)
            .then(res =>{
                this.form.token = this.$route.params.token
                this.form.email = res.data.email
            })
        ;
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
