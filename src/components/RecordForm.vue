<template lang="pug">
div.uk-card.uk-card-default.uk-card-hover.uk-card-body.uk-margin-bottom
  form.uk-form-stacked(@submit.prevent="addNewRecord")
    fieldset.uk-fieldset
      legend.uk-legend.uk-card-title Enter new record
      div.uk-margin
        label.uk-form-label Title
        div.uk-form-controls
          input.uk-input.uk-form-small(v-model.trim="title", placeholder="Title", type="text")
      div.uk-margin
        label.uk-form-label Quantity
        div.uk-form-controls
          input.uk-input.uk-form-small(v-model.trim="quantity", placeholder="Quantity", type="text")
      div.uk-margin
        label.uk-form-label Date
        div.uk-form-controls
          input.uk-input.uk-form-small(v-model.trim="date", placeholder="Date", type="text")
    button.uk-button.uk-button-primary(type="submit") Add Record
</template>

<script>
import { database, updateLocation } from '../database.js'

export default {
  name: 'record-form',
  data: function() {
    return {
      title: null,
      quantity: null,
      date: null
    }
  },
  methods: {
    addNewRecord: function() {
      const recordId = database.child('records').push().key
      const record = {
        title: this.title,
        quantity: +this.quantity,
        date: new Date(this.date).toJSON()
      }
      const day = record.date.slice(0, 10)
      const month = record.date.slice(0, 7)
      const year = record.date.slice(0, 4)
      database.child('/records/' + recordId).set(record)
      updateLocation('/reports/' + record.title, record.quantity)
      updateLocation('/daily-reports/' + day + '/' + record.title, record.quantity)
      updateLocation('/monthly-reports/' + month + '/' + record.title, record.quantity)
      updateLocation('/annually-reports/' + year + '/' + record.title, record.quantity)
      this.title = null
      this.quantity = null
      this.date = null
    }
  }
}
</script>
