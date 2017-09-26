<template lang="pug">
tr
  template(v-if="editing")
    td {{ record.id }}
    td: input.uk-input.uk-form-small.uk-form-width-small(v-model.trim="title", @keyup.enter="edit", placeholder="Title", type="text")
    td: input.uk-input.uk-form-small.uk-form-width-small(v-model.trim="quantity", @keyup.enter="edit", placeholder="Quantity", type="text")
    td: input.uk-input.uk-form-small.uk-form-width-small(v-model.trim="date", @keyup.enter="edit", placeholder="Date", type="text")
  template(v-else)
    td {{ record.id }}
    td {{ record.title }}
    td {{ record.quantity }}
    td {{ record.date | formatDate }}
  td
    button.uk-button.uk-button-default.uk-button-small(v-if="editing", @click="endEditing") Cancel
    div.uk-button-group(v-else)
      button.uk-button.uk-button-secondary.uk-button-small(@click="beginEditing") edit
      button.uk-button.uk-button-danger.uk-button-small(@click="remove") Remove
</template>

<script>
import { database, updateLocation } from '../database.js'

export default {
  props: ['record'],
  name: 'record-row',
  data: function() {
    return {
      editing: false,
      title: null,
      quantity: null,
      date: null
    }
  },
  methods: {
    beginEditing: function() {
      this.editing = true
      this.title = this.record.title
      this.quantity = this.record.quantity
      this.date = this.record.date
    },
    endEditing: function() {
      this.editing = false
      this.title = this.record.title
      this.quantity = this.record.quantity
      this.date = this.record.date
    },
    edit: function() {
      this.editing = false
      this.title = this.title,
      this.quantity = +this.quantity,
      this.date = new Date(this.date).toJSON()
      database.child('/records/' + this.record.id).set({
        title: this.title,
        quantity: this.quantity,
        date: this.date
      })
      var day = this.date.slice(0, 10)
      var month = this.date.slice(0, 7)
      var year = this.date.slice(0, 4)
      updateLocation('/reports/' + this.title, this.quantity)
      updateLocation('/daily-reports/' + day + '/' + this.title, this.quantity)
      updateLocation('/monthly-reports/' + month + '/' + this.title, this.quantity)
      updateLocation('/annually-reports/' + year + '/' + this.title, this.quantity)
      day = this.record.date.toJSON().slice(0, 10)
      month = this.record.date.toJSON().slice(0, 7)
      year = this.record.date.toJSON().slice(0, 4)
      updateLocation('/reports/' + this.record.title, -this.record.quantity)
      updateLocation('/daily-reports/' + day + '/' + this.record.title, -this.record.quantity)
      updateLocation('/monthly-reports/' + month + '/' + this.record.title, -this.record.quantity)
      updateLocation('/annually-reports/' + year + '/' + this.record.title, -this.record.quantity)
    },
    remove: function() {
      const day = this.record.date.toJSON().slice(0, 10)
      const month = this.record.date.toJSON().slice(0, 7)
      const year = this.record.date.toJSON().slice(0, 4)
      database.child('/records/' + this.record.id).remove()
      updateLocation('/reports/' + this.record.title, -this.record.quantity)
      updateLocation('/daily-reports/' + day + '/' + this.record.title, -this.record.quantity)
      updateLocation('/monthly-reports/' + month + '/' + this.record.title, -this.record.quantity)
      updateLocation('/annually-reports/' + year + '/' + this.record.title, -this.record.quantity)
    }
  }
}
</script>
