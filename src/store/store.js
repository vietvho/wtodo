import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const moduleAuth = {
    namespaced: true,
    state: {
        user: null,
    },
    getters: {
        getUser: state => state.user
    },
    mutations: {
        LOG_OUT(state) {
            state.user = null;
        },

        LOG_IN(state, user) {
            state.user = user;
        }
    },
    action: {

    }
};

const moduleAlert = {
    namespaced: true,
    state: {
        success: null,
    },
    getters: {
    },
    mutations: {
        messageSuccess(state, msg) {
            state.success = msg;
        },
    },
    action: {

    }
};
// export default createStore({
//     modules: {
//         auth: moduleAuth
//     }
// });

const store = new Vuex.Store({
    modules: {
        wauth: moduleAuth,
        alert: moduleAlert
    //   scoreBoard: childA,
    //   resultBoard: childB
    }
  })
export default store;