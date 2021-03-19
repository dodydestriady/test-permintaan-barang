import Vue from 'vue'
import Card from './Card'
import Child from './Child'
import Button from './Button'
import Checkbox from './Checkbox'
// import { AjaxTable, Column } from 'ajax-table-vue'
import { HasError, AlertError, AlertSuccess } from 'vform'

// Components that are registered globaly.
[
  Card,
  Child,
  Button,
  Checkbox,
  HasError,
  AlertError,
  AlertSuccess
  // AjaxTable,
  // Column
].forEach(Component => {
  Vue.component(Component.name, Component)
})
