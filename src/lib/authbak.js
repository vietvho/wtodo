import axios from "axios";
import store from "../store/store";

export default class bWauth {
    constructor () {
        bWauth.auth();
    }

    static async auth() {
        // const store = useStore;
        // const response = await fetch('http://localhost:8000/api/user', {
        //     headers: {'Content-Type': 'application/json'},
        //     credentials: 'include'
        // });

        // Make a request for a user with a given ID
        const response = await axios.get('http://localhost:8000/api/user',{
            withCredentials: true,
            credentials: 'same-origin',
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return store.commit('LOG_OUT');
        })

        if (response.data.message == 'login-success') {
            return store.commit('LOG_IN',JSON.stringify(response.data));
            // return localStorage.setItem('user', JSON.stringify(await response.json())); //fetch
        }
        return store.commit('LOG_OUT');
    }
}