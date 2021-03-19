<template>
  <card :title="$t('location')">
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
        <b-table striped hover bordered :items="locations.data" :fields="fields" show-empty>
          <template slot="name" slot-scope="row">
            {{ row.name }}
          </template>
          <template slot="name" slot-scope="row">
            {{ row.note }}
          </template>
        </b-table>

        <div class="row">
          <div class="col-6">
            <p v-if="locations.data">
              <i class="fas fa-bars" /> {{ locations.data.length }} of {{ locations.meta.total }}
            </p>
          </div>
          <div class="col-6 pull-right">
            <b-pagination
              v-if="locations.data && locations.data.length > 0"
              v-model="page"
              :total-rows="locations.meta.total"
              :per-page="locations.meta.per_page"
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
      locations: 'location/locations'
    }),
    page: {
      get () {
        return this.$store.state.location.page
      },
      set (val) {
        this.$store.commit(`location/${SET_PAGE}`, val)
      }
    }
  },
  watch: {
    page () {
      this.getLocations(this.search)
    },
    search () {
      this.getLocations(this.search)
    }
  },
  created () {
    this.getLocations(this.search)
  },
  methods: {
    ...mapActions('location', ['getLocations'])
  }
}
</script>

<style>

</style>
