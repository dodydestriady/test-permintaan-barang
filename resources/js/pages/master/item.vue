<template>
  <card :title="$t('item')">
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
        <b-table striped hover bordered :items="items.data" :fields="fields" show-empty :loading="loading">
          <template slot="code" slot-scope="row">
            {{ row.code }}
          </template>
          <template slot="name" slot-scope="row">
            {{ row.name }}
          </template>
          <template slot="stock" slot-scope="row">
            {{ row.stock }}
          </template>
          <template slot="location" slot-scope="row">
            {{ row.location }}
          </template>
          <template slot="unit" slot-scope="row">
            {{ row.unit }}
          </template>
        </b-table>

        <div class="row">
          <div class="col-6">
            <p v-if="items.data">
              <i class="fas fa-bars" /> {{ items.data.length }} of {{ items.meta.total }}
            </p>
          </div>
          <div class="col-6 pull-right">
            <b-pagination
              v-if="items.data && items.data.length > 0"
              v-model="page"
              :total-rows="items.meta.total"
              :per-page="items.meta.per_page"
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
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Name' },
        { key: 'location', label: 'Location' },
        { key: 'unit', label: 'Unit' },
        { key: 'stock', label: 'Stock' }
      ],
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      items: 'item/items'
    }),
    loading: {
      set (val) {
        return val
      },
      get () {
        return false
      }
    },
    page: {
      get () {
        return this.$store.state.item.page
      },
      set (val) {
        this.$store.commit(`item/${SET_PAGE}`, val)
      }
    }
  },
  watch: {
    page () {
      this.getItems({ search: this.search, loading: this.loading })
    },
    search () {
      this.getItems({ search: this.search, loading: this.loading })
    }
  },
  created () {
    this.getItems({ search: this.search, loading: this.loading })
  },
  methods: {
    ...mapActions('item', ['getItems'])
  }
}
</script>

<style>

</style>
