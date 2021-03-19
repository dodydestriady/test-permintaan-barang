<template>
  <card :title="$t('request-item')">
    <div class="row">
      <div class="col-12 pull-right">
        <router-link :to="{ name: 'request-item.create' }" class="btn btn-sm btn-primary">
          {{ $t('create') }}
        </router-link>
      </div>
    </div>
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
        <b-table striped hover bordered :items="items.data" :fields="fields" show-empty>
          <template #cell(index)="data">
            {{ data.index + 1 }}
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
  middleware: 'auth',

  data () {
    return {
      fields: [
        { key: 'index', label: '#' },
        { key: 'code', label: 'Code' },
        { key: 'request_date', label: 'Request Date' },
        { key: 'requester', label: 'Requester' },
        { key: 'created_at', label: 'Created At' },
      ],
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      items: 'request-item/requestItems'
    }),
    page: {
      get () {
        return this.$store.state['request-item'].page
      },
      set (val) {
        this.$store.commit(`request-item/${SET_PAGE}`, val)
      }
    }
  },
  watch: {
    page () {
      this.getRequestItems({ search: this.search })
    },
    search () {
      this.getRequestItems({ search: this.search })
    }
  },
  created () {
    this.getRequestItems({ search: this.search })
  },
  methods: {
    ...mapActions('request-item', ['getRequestItems'])
  }
}
</script>

<style>

</style>
