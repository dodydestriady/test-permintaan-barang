<template>
  <card :title="$t('create') +' '+ $t('request-item')">
    <form @submit.prevent="submit">
      <!-- <alert-success :form="form" :message="$t('info_updated')" /> -->
      <div class="row">
        <div class="col-6">
          <div class="form-group row">
            <label for="nik" class="col-12 col-form-label">
              <strong> {{ $t('nik') }} </strong>
            </label>
            <div class="col-md-12">
              <v-select v-model="selectedEmployee"
                        :options="employees.data"
                        label="nik"
                        placeholder="Find By NIK"
                        :filterable="false"
                        required
                        @search="onSearch"
              >
                <template slot="no-options" />
                <template slot="option" slot-scope="option">
                  {{ option.nik }} - {{ option.name }}
                </template>
              </v-select>
            </div>
          </div>

          <div class="form-group row">
            <label for="nik" class="col-12 col-form-label">
              <strong> {{ $t('request_date') }} </strong>
            </label>
            <div class="col-md-12">
              <date-picker v-model="form.request_date" :config="{ format: 'YYYY-MM-DD H:mm:ss' }" required />
            </div>
          </div>
        </div>

        <div class="col-6">
          <table class="table table-sm">
            <tr>
              <th colspan="2">
                {{ $t('summary') }}
              </th>
            </tr>
            <tr>
              <td>
                Requester
              </td>
              <td>{{ selectedEmployee ? selectedEmployee.name : '-' }}</td>
            </tr>
            <tr>
              <td>{{ $t('department') }}</td>
              <td>{{ selectedEmployee ? selectedEmployee.department : '-' }}</td>
            </tr>
            <tr>
              <td>{{ $t('total_item') }}</td>
              <td>{{ form.details.length }}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- List Item -->
      <div class="row">
        <div class="col-12">
          <strong> {{ $t('list_item') }} </strong>
          <v-select id="selectItem"
                    v-model="selectedItem"
                    :options="items.data"
                    label="name"
                    :placeholder="$t('search code or name to add item')"
                    :filterable="false"
                    @search="onSearchItem"
          >
            <template slot="no-options" />
            <template slot="option" slot-scope="option">
              {{ option.code }} - {{ option.name }}
            </template>
          </v-select>
        </div>
        <div class="col-12">
          <table class="table table-striped table-hover table-sm table-bordered">
            <thead>
              <tr class="text-center">
                <th>#</th>
                <th>{{ $t('item') }}</th>
                <th>{{ $t('location') }}</th>
                <th>{{ $t('stock') }}</th>
                <th>{{ $t('quantity') }}</th>
                <th>{{ $t('unit') }}</th>
                <th>{{ $t('status') }}</th>
                <th>x</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="( detail, id ) in form.details" :key="id">
                <td> {{ id+1 }} </td>
                <td> {{ detail.name }} </td>
                <td> {{ detail.location }} </td>
                <td> {{ detail.stock }} </td>
                <td class="p-0">
                  <input
                    v-model="detail.quantity"
                    type="number"
                    class="form-control form-control-sm m-0"
                  >
                </td>
                <td> {{ detail.unit }} </td>
                <td class="bg-success text-white text-sm" :class="{'bg-danger text-white': detail.stock < detail.quantity }"> {{ detail.stock >= detail.quantity ? 'Ok' : 'Insufficient'  }} </td>
                <td class="p-0">
                  <a href="#" class="btn btn-danger btn-sm btn-block" @change="removeItem(id)"> X </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Submit Button -->
      <div class="form-group row">
        <div class="col-12">
          <div v-if="requestItemResponse.data" class="col-12 alert alert-warning">
            <strong> {{ requestItemResponse.data['message'] }} </strong>
            <ul class="list-unstyled">
              <li v-for="(errors, idErrors) in requestItemResponse.data['errors']" :key="idErrors">
                <ul>
                  {{ idErrors }}
                  <li v-for="(error, idError) in errors" :key="idError">
                    {{ error }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 text-right">
          <v-button :loading="requestItemBusy" type="success">
            {{ $t('save') }}
          </v-button>
        </div>
      </div>
    </form>
  </card>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { mapActions, mapGetters } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

export default {
  components: {
    vSelect,
    datePicker
  },
  middleware: 'auth',
  data () {
    return {
      selectedEmployee: null,
      selectedItem: null,
      form: {
        requested_by: null,
        request_date: null,
        details: []
      }
    }
  },
  computed: {
    ...mapGetters({
      requestItemResponse: 'request-item/errors',
      requestItemSuccess: 'request-item/success',
      requestItemBusy: 'request-item/busy',
      employees: 'employee/employees',
      items: 'item/items'
    })
  },
  watch: {
    selectedItem (item) {
      if (item) {
        const { id, name, stock, location, unit, code } = item
        const exists = this.form.details.some(function (field) {
          return field.item_id === id
        })
        if (!exists) {
          this.form.details.push({ item_id: id, name, stock, location, unit, code, quantity: 1 })
        }
        this.selectedItem = null
      }
    },
    selectedEmployee (employee) {
      if (employee) {
        this.form.requested_by = employee.id
      }
    },
    requestItemSuccess (status) {
      console.log(status)
      if (status) {
        this.$router.push({ name: 'request-item.index', params: { success: true } })
      }
    }
  },
  methods: {
    ...mapActions('request-item', ['storeRequestItem']),
    onSearch (search, loading) {
      this.$store.dispatch('employee/getEmployees', { search, loading })
    },
    onSearchItem (search, loading) {
      this.$store.dispatch('item/getItems', { search, loading })
    },
    submit () {
      this.storeRequestItem(this.form)
    },
    removeItem (index) {
      if (this.form.details.length > 1) {
        this.form.details.splice(index, 1)
      }
    }
  }
}
</script>

<style>

</style>
