import * as types from '../mutation-types'
import axios from 'axios'

export const state = {
  employees: [],
  page: 1
}

export const mutations = {
  [types.ASSIGN_EMPLOYEES] (state, payload) {
    state.employees = payload
  },
  [types.SET_PAGE] (state, payload) {
    state.page = payload
  }
}

export const getters = {
  employees: state => state.employees,
  page: state => state.page
}

export const actions = {
  async getEmployees ({ commit, state }, payload) {
    const search = payload.search
    payload.loading(true)
    try {
      const { data } = await axios.get(`/api/v1/employees?page=${state.page}&search=${search}`)
      payload.loading(false)
      commit(types.ASSIGN_EMPLOYEES, data)
    } catch (e) {}
  }
}
