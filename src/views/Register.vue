<template>
<v-row class="pa-3 mt-5" justify="center">
  <v-responsive max-width="500">
    <v-alert v-if="errors.register" type="error">
      {{errors.register}}
    </v-alert>

    <v-form 
      ref="registerForm"
      v-model="registerValid"
    >
        <v-text-field
            v-model="name"
            label="Name"
            type="text"
            :rules="nameRules"
            required
            outlined
        ></v-text-field>

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
            @click="doRegister"
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
    name: '',
    registerValid: true,
    errors: {
      register: null
    },
    emailRules: [
      v => !!v || "Email is required",
      v => /.+@.+\..+/.test(v) || "Email must be valid"
    ],
    passwordRules: [
      v => !!v || "Password is required"
    ],
    nameRules: [
      v => !!v || "Name is required"
    ],
    invalid: null
  }),

  methods: {
    clear () {
      this.email = ''
      this.password = ''
    },
    
    doRegister(e) {
      e.preventDefault();

      if (this.$refs.registerForm.validate()){
        var data = {
            "name": this.name,
            "email": this.email,
            "password": this.password,
            withCredentials: true
        };

        axios.post('/api/register',data, {withCredentials: true})
        .then( (response) => {
            if (response.data.error) {
              this.errors.register = response.data.info;
            }
            else {
              router.push({path: '/'})
            }
            // return localStorage.removeItem('user');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            this.errors.register = "Error in registering. Please try again!"
            return localStorage.removeItem('user');
        })
      }
    }
  }
}
</script>