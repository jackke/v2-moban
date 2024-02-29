import Vue from "vue";
import Vuex from "vuex";
import index from "./modules/index";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user:{
      username: '',
      userid : ''
    },
  },
  getters: {
    
  },
  mutations: {
    setUser(state, user){
      state.user = user
    },
    setToken(state,token){
      state.token = token
      localStorage.setItem('token', token)
    },
    delToken(state){
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    getToken(){
      return this.state.token
    }
  },
  modules: {
    index
  }
});

export default store;
