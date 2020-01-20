import Vue from 'vue'
import { state } from '../store'

export default function({ $axios, redirect }, inject) {
  // Create a custom axios instance

  $axios.onError((error) => {
    if (error.response.status === 401) {
      //   redirect('/sorry')
      Vue.prototype.$notify({
        type: 'error',
        message: error.response
      })
      state.loginFormVisible = true
      state.UserNotExist = true
    }
  })
  const api = $axios.create({})

  // Set baseURL to something different
  api.setBaseURL('http://localhost:3001')
  if (process.browser) {
    api.setToken(localStorage.token || '', 'Bearer')
  }

  // Inject to context as $api
  inject('api', api)
}