import Vue from 'vue'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faUser, faLock, faSignOutAlt, faCog, faDatabase, faChevronLeft, faChevronRight, faArrowDown, faArrowUp, faTrash, faTrashAlt, faCalendarCheck, faTimesCircle, faBars
} from '@fortawesome/free-solid-svg-icons'

import {
  faGithub
} from '@fortawesome/free-brands-svg-icons'
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons'

library.add(
  faUser,
  faLock,
  faSignOutAlt,
  faCog,
  faGithub,
  faDatabase,
  faCalendar,
  faArrowUp,
  faArrowDown,
  faChevronRight,
  faChevronLeft,
  faTrash,
  faTrashAlt,
  faCalendarCheck,
  faTimesCircle,
  faClock,
  faBars
)

Vue.component('Fa', FontAwesomeIcon)
dom.watch()
