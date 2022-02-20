import VueRouter from "vue-router";
import Todo from "../views/Todo.vue";
import Vue from 'vue';
// import store from '../store/store';
// import {mapState} from 'vuex';

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Todo",
        component: Todo
    },

    {
        path: "/about",
        name: "About",
        component:     () => import( /* webpackChunkName: "about" */  "../views/About.vue"),
    },

    {
        path: "/login",
        name: "Login",
        component:     () => import( /* webpackChunkName: "login" */  "../views/Login.vue"),
    },

    {
        path: "/register",
        name: "Register",
        component:     () => import( /* webpackChunkName: "register" */  "../views/Register.vue"),
    }
]

const router = new VueRouter({
  mode: 'history',
  routes
})


router.beforeEach(async (to,from,next)=>{
    await Vue.nextTick();
    switch (to.name) {
        case 'Register' :
        case 'ResetPassword' :
        case 'Login': {
            console.log('here');
            const user = (JSON.parse(localStorage.getItem('user')));
            if (user) {
                next({path: '/'})
            }
            next();
            break;
        }
        default:
            next();
            break;
    }
}) ;
export default router;