import * as types from '../mutation-types'
import axios from 'axios'

export const state = {
  locations: [],
  page: 1
}

export const mutations = {
  [types.ASSIGN_LOCATIONS] (state, payload) {
    state.locations = payload
  },
  [types.SET_PAGE] (state, payload) {
    state.page = payload
  }
}

export const getters = {
  locations: state => state.locations,
  page: state => state.page
}

export const actions = {
  async getLocations ({ commit, state }, payload) {
    try {
      const { data } = await axios.get(`/api/v1/locations?page=${state.page}&search=${payload}`)
      commit(types.ASSIGN_LOCATIONS, data)
    } catch (e) {}
  }
}
