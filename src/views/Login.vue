<template>
<v-row class="pa-3 mt-5" justify="center">
  <v-responsive max-width="500">
    <v-alert v-if="errors.login" type="error">
      {{errors.login}}
    </v-alert>

    <v-form 
      ref="loginForm"
      v-model="loginValid"
    >
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        :rules="emailRules"
        required
        outlined
      ></v-text-field>
      
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        :rules="passwordRules"
        required
        outlined
      ></v-text-field>

      <v-btn
          class="mr-4"
          type="submit"
          @click="doLogin"
        >
        submit
      </v-btn>

      <v-btn v-model="clear">
        clear
      </v-btn>
    </v-form>
  </v-responsive>
</v-row>
</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
 
  data: () => ({
    password: '',
    email: '',
    loginValid: true,
    errors: {
      login: null
    },
    emailRules: [
      v => !!v || "Email is required",
      v => /.+@.+\..+/.test(v) || "Email must be valid"
    ],
    passwordRules: [
      v => !!v || "Password is required"
    ],
    invalid: null
  }),

  methods: {
    clear () {
      this.email = ''
      this.password = ''
    },
    
    doLogin(e) {
      e.preventDefault();

      if (this.$refs.loginForm.validate()){
        var data = {
          "email": this.email,
          "password": this.password,
          withCredentials: true
        };

        axios.post('http://localhost:8000/api/login',data, {withCredentials: true})
        .then( (response) => {
            if (response.data.message == 'login-success') {
              router.push({path: '/'})
            }
            else {
              this.errors.login = response.data.message;
            }
            // return localStorage.removeItem('user');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return localStorage.removeItem('user');
        })
      }
    }
  }
}
</script>