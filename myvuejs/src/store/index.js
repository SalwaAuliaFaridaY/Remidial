import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://mylaravel.test/api'
export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    }, 
  },
  actions: {
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    login(context, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/login', {
              username: payload.username,
              password: payload.password,
            })
              .then(response => {
                const token = response.data.access_token
                console.log(response.data)
                localStorage.setItem('access_token', token)
                context.commit('setToken', token)
                resolve(response)
              })
              .catch(error => {
                console.log(error)
                reject(error)
              })
            })
    },
    logout(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    },
  },
  getters: {
  }
})