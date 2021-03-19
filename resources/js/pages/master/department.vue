<template>
  <card :title="$t('department')">
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
        <b-table striped hover bordered :items="departments.data" :fields="fields" show-empty>
          <template slot="name" slot-scope="row">
            {{ row.name }}
          </template>
          <template slot="name" slot-scope="row">
            {{ row.note }}
          </template>
        </b-table>

        <div class="row">
          <div class="col-6">
            <p v-if="departments.data">
              <i class="fas fa-bars" /> {{ departments.data.length }} of {{ departments.meta.total }}
            </p>
          </div>
          <div class="col-6 pull-right">
            <b-pagination
              v-if="departments.data && departments.data.length > 0"
              v-model="page"
              :total-rows="departments.meta.total"
              :per-page="departments.meta.per_page"
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
        { key: 'note', label: 'Note' }
      ],
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      departments: 'department/departments'
    }),
    page: {
      get () {
        return this.$store.state.department.page
      },
      set (val) {
        this.$store.commit(`department/${SET_PAGE}`, val)
      }
    }
  },
  watch: {
    page () {
      this.getDepartments(this.search)
    },
    search () {
      this.getDepartments(this.search)
    }
  },
  created () {
    this.getDepartments(this.search)
  },
  methods: {
    ...mapActions('department', ['getDepartments'])
  }
}
</script>

<style>

</style>
