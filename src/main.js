import Vue from 'vue'
import App from './App'

import { database } from './database'
import { formatDate } from './filters'

const vm = new Vue({
  el: '#app',
  data: {
    records: [],
    reports: []
  },
  render: function(createElement) {
    return createElement(App, {
      props: {
        records: this.records,
        reports: this.reports
      }
    })
  }
})

database.child('records').on('value', snapshot => {
  if (snapshot.val() !== null) {
    const object = snapshot.val()
    vm.records = Object.keys(object).map(key => {
      const record = object[key]
      record.quantity = +record.quantity
      record.date = new Date(record.date)
      record.id = key
      return record
    })
  }
  else {
    vm.records = []
  }
})

database.child('reports').on('value', snapshot => {
  if (snapshot.val() !== null) {
    const object = snapshot.val()
    vm.reports = Object.keys(object).map(key => {
      const report = {}
      report.quantity = +object[key]
      report.title = key
      return report
    })
  }
  else {
    vm.reports = []
  }
})
