<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="navList"
      app
     >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <span v-if="user">{{user.name | capitalize }}'s</span>
            <span v-else>Vue</span>
            Todo
          </v-list-item-title>
          <v-list-item-subtitle v-if="!user">
            Please login to save your to-do list
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          :target="item.target"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div v-if="errors.logout">
          {{ errors.logout }}
        </div>

        <div v-if="user" class="pa-2">
          <v-btn
            @click="doLogOut"
            small block
          >
            Log Out
          </v-btn>
        </div>

        <div v-else class="pa-2">
          <v-btn class="mb-2"  :to="'login'" small block>
            Log In
          </v-btn>
          <v-btn color="primary"  :to="'register'" small block>
            Register
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="navList = !navList"></v-app-bar-nav-icon>

      <v-toolbar-title>{{this.$route.name}}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-main>    

    <v-bottom-sheet
      class="text-center"
      inset
      :value="success"
      :hide-overlay="true"
    >
      <v-alert 
      class="mb-0"
        type="success">
        {{success}}
    </v-alert>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
  import {mapState} from 'vuex';
  import axios from 'axios';
  import store from "./store/store";

  export default {
    
    data: () => ({ 
        navList: null,
        errors: {
          logout: null
        },
        items: [
          { title: 'Todo', icon: 'mdi-format-list-checks', to: '/'},
          { title: 'About', icon: 'mdi-help-box', to: '/about'},
        ],
     }),

    computed: {
      ...mapState('wauth',{
        user: state => state.user,
      }),
      ...mapState('alert',{
        success: state=> state.success
      }),
      // sheet : ()=>{
      //   return this.success ? true : false   
      // }
    },
   
    methods: {
      doLogOut() {
        axios.post('http://localhost:8000/api/logout',{}, {withCredentials: true})
        .then( (response) => {
            if (response.data.message == 'logged-out') {
              localStorage.removeItem('user');
              store.commit('wauth/LOG_OUT');
            }
            else {
              this.errors.logout = 'Logout has failed. Please try once more.';
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            this.errors.logout = 'Logout has failed. Please try once more.';
        })
      } 
    } 
  }
</script>