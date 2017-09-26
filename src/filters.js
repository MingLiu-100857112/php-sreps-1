import Vue from 'vue'

export const formatDate = Vue.filter('formatDate', date => {
  return date.toDateString()
})
