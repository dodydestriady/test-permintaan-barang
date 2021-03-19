import * as types from '../mutation-types'
import axios from 'axios'

export const state = {
  departments: [],
  page: 1
}

export const mutations = {
  [types.ASSIGN_DEPARTMENTS] (state, payload) {
    state.departments = payload
  },
  [types.SET_PAGE] (state, payload) {
    state.page = payload
  }
}

export const getters = {
  departments: state => state.departments,
  page: state => state.page
}

export const actions = {
  async getDepartments ({ commit, state }, payload) {
    try {
      const { data } = await axios.get(`/api/v1/departments?page=${state.page}&search=${payload}`)
      commit(types.ASSIGN_DEPARTMENTS, data)
    } catch (e) {}
  }
}
