import * as types from '../mutation-types'
import axios from 'axios'

export const state = {
  items: [],
  page: 1
}

export const mutations = {
  [types.ASSIGN_ITEMS] (state, payload) {
    state.items = payload
  },
  [types.SET_PAGE] (state, payload) {
    state.page = payload
  }
}

export const getters = {
  items: state => state.items,
  page: state => state.page
}

export const actions = {
  async getItems ({ commit, state }, payload) {
    const search = payload.search
    if (payload.loading) {
      payload.loading(true)
    }
    try {
      const { data } = await axios.get(`/api/v1/items?page=${state.page}&search=${search}`)
      if (payload.loading) {
        payload.loading(true)
      }
      commit(types.ASSIGN_ITEMS, data)
    } catch (e) {}
  }
}
