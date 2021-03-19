<template>
  <card :title="$t('employee')">
    <div class="row">
      <div class="col-12">
        <div class="panel-heading">
          <div class="pull-right">
            <div class="row">
              <div class="col-md-12">
                <input v-model="search" type="text" class="form-control" :placeholder="$t('find')">
              </div>
            </div>
          </div>
        </div>
        <b-table striped hover bordered :items="employees.data" :fields="fields" show-empty>
          <template slot="name" slot-scope="row">
            {{ row.name }}
          </template>
          <template slot="note" slot-scope="row">
            {{ row.note }}
          </template>
          <template slot="department" slot-scope="row">
            {{ row.department }}
          </template>
        </b-table>

        <div class="row">
          <div class="col-6">
            <p v-if="employees.data">
              <i class="fas fa-bars" /> {{ employees.data.length }} of {{ employees.meta.total }}
            </p>
          </div>
          <div class="col-6 pull-right">
            <b-pagination
              v-if="employees.data && employees.data.length > 0"
              v-model="page"
              :total-rows="employees.meta.total"
              :per-page="employees.meta.per_page"
              aria-controls="de"
            />
          </div>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { SET_PAGE } from '~/store/mutation-types'
export default {
  data () {
    return {
      fields: [
        { key: 'id', label: 'id' },
        { key: 'name', label: 'Name' },
        { key: 'department', label: 'Department' }
      ],
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      employees: 'employee/employees'
    }),
    page: {
      get () {
        return this.$store.state.employee.page
      },
      set (val) {
        this.$store.commit(`employee/${SET_PAGE}`, val)
      }
    }
  },
  watch: {
    page () {
      this.getEmployees({ search: this.search })
    },
    search () {
      this.getEmployees({ search: this.search })
    }
  },
  created () {
      this.getEmployees({ search: this.search })
  },
  methods: {
    ...mapActions('employee', ['getEmployees'])
  }
}
</script>

<style>

</style>
