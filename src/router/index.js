import VueRouter from "vue-router";
import Todo from "../views/Todo.vue";
import Vue from 'vue'

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
    }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;