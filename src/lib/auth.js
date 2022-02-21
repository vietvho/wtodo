import axios from "axios";
import store from "../store/store";

const Wauth = {
    // called by Vue.use(FirstPlugin)
    install(Vue) {
        // create a mixin
        Vue.mixin({
            async mounted() {

                const response = await axios.get('/api/user',{
                    withCredentials: true,
                    credentials: 'same-origin',
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    // return store.commit('wauth/LOG_OUT');
                });
        
                if (response.data.message == 'login-success') {
                    localStorage.setItem('user',JSON.stringify(response.data));
                    
                    return store.commit('wauth/LOG_IN',response.data);
                }
                    localStorage.removeItem('user');
                    return store.commit('wauth/LOG_OUT');
            },
            created() {
                // console.log(Vue);
            }
        });
    },
};

export default Wauth;
 