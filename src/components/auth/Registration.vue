<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="green">
                <v-toolbar-title>Регистрация</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-text-field 
                  prepend-icon="person"
                  name="login" 
                  label="Email" 
                  type="email"
                  v-model="email"
                  :rules="emailRules"
                  ></v-text-field>
                  <v-text-field 
                  id="password" 
                  prepend-icon="lock" 
                  name="password" 
                  label="Пароль" 
                  type="password"
                  :counter="6"
                  :rules="pswRules"
                  v-model="password"
                  ></v-text-field>
                  <v-text-field 
                  prepend-icon="lock" 
                  name="confirm-password" 
                  label="Подтверждение пароля" 
                  type="password"
                  :counter="6"
                  :rules="cpswRules"
                  v-model="confirmPassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                color="primary"
                @click="onSubmit"
                :loading="loading"
                :disabled="!valid || loading"
                >Регистрация</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
export default {
    data () {
        return {
           email: '',
           password: '',
           confirmPassword: '',
           valid: false,
           emailRules: [
        v => !!v || 'Введите E-mail',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Введите корректный E-mail'
      ],
      pswRules: [
        v => !!v || 'Введите пароль',
        v => (v && v.length >= 6) || 'Пароль должен быть не меньше 6 символов'
      ],
      cpswRules: [
        v => !!v || 'Повторите пароль',
        v => (v === this.password) || 'Пароли не совпадают'
      ],
        }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
        onSubmit () {
            if (this.$refs.form.validate()) {
                const user = {
                    email: this.email,
                    password: this.password
                }

                this.$store.dispatch('registerUser', user)
                .then(() => {
                  this.$router.push('/')
                })
                .catch(err => console.log(err))
            }
        }
    }
}
</script>

