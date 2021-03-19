<template>
  <card :title="$t('unit')">
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
        <b-table striped hover bordered :items="units.data" :fields="fields" show-empty>
          <template slot="name" slot-scope="row">
            {{ row.name }}
          </template>
          <template slot="name" slot-scope="row">
            {{ row.note }}
          </template>
        </b-table>

        <div class="row">
          <div class="col-6">
            <p v-if="units.data">
              <i class="fas fa-bars" /> {{ units.data.length }} of {{ units.meta.total }}
            </p>
          </div>
          <div class="col-6 pull-right">
            <b-pagination
              v-if="units.data && units.data.length > 0"
              v-model="page"
              :total-rows="units.meta.total"
              :per-page="units.meta.per_page"
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
      units: 'unit/units'
    }),
    page: {
      get () {
        return this.$store.state.unit.page
      },
      set (val) {
        this.$store.commit(`unit/${SET_PAGE}`, val)
      }
    }
  },
  watch: {
    page () {
      this.getunits(this.search)
    },
    search () {
      this.getunits(this.search)
    }
  },
  created () {
    this.getunits(this.search)
  },
  methods: {
    ...mapActions('unit', ['getunits'])
  }
}
</script>

<style>

</style>
