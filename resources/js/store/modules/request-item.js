import * as types from '../mutation-types'
import axios from 'axios'

export const state = {
  requestItems: [],
  response: [],
  busy: false,
  page: 1
}

export const mutations = {
  assignResponse (state, payload) {
    state.response = payload
  },
  [types.SET_PAGE] (state, payload) {
    state.page = payload
  },
  setBusy (state, payload) {
    state.busy = payload
  },
  [types.ASSIGN_REQUEST_ITEMS] (state, payload) {
    state.requestItems = payload
  }
}

export const getters = {
  errors: state => {
    return state.response.status === 422 ? state.response : []
  },
  success: state => {
    return state.response.status === 201
  },
  requestItems: state => state.requestItems,
  page: state => state.page,
  busy: state => state.busy,
  [types.SET_PAGE] (state, payload) {
    state.page = payload
  }
}

export const actions = {
  async storeRequestItem ({ commit }, payload) {
    commit('setBusy', true)
    await axios.post('/api/v1/request-item', payload)
      .then((res) => {
        commit('assignResponse', res)
      })
      .catch((res) => {
        commit('assignResponse', res.response)
      })
    commit('setBusy', false)
  },
  async getRequestItems ({ commit, state }, payload) {
    const search = payload.search
    try {
      const { data } = await axios.get(`/api/v1/request-items?page=${state.page}&search=${search}`)
      commit(types.ASSIGN_REQUEST_ITEMS, data)
    } catch (e) {}
  }
}
