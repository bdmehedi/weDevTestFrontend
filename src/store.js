import {getToken} from './helpers'

const token = getToken('token');
let isLogin = false;
if (token) {
    isLogin = true;
}

export default {
    state: {
        token: token,
        error: null,
        hasError: false,
        isLogIn: isLogin,
        apiUrl : 'http://backend.test/api',
    },
    mutations: {
        updateToken(state, payload) {
            state.token = payload;
            // localStorage.setItem('token', state.token)
            document.cookie = `token=${state.token}`
            state.isLogIn = true;
        },
        setError(state, payload) {
            state.error = payload;
        },
        hasError(state, payload) {
            state.hasError = payload;
        },
        logout(state) {
            state.isLogIn = false;
            // localStorage.removeItem('token');
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            state.token = null;
        }
    },
    getters: {
        getToken(state) {
            return state.token;
        },
    },
    actions: {
        
    }
};
