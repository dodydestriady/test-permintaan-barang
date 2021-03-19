import * as types from '../mutation-types'
import axios from 'axios'

export const state = {
  units: [],
  page: 1
}

export const mutations = {
  [types.ASSIGN_UNITS] (state, payload) {
    state.units = payload
  },
  [types.SET_PAGE] (state, payload) {
    state.page = payload
  }
}

export const getters = {
  units: state => state.units,
  page: state => state.page
}

export const actions = {
  async getunits ({ commit, state }, payload) {
    try {
      const { data } = await axios.get(`/api/v1/units?page=${state.page}&search=${payload}`)
      commit(types.ASSIGN_UNITS, data)
    } catch (e) {}
  }
}
