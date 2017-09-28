<template lang="pug">
div.record-form.card
  form(@submit.prevent="addNewRecord")
    fieldset
      legend Enter new record
      div.margin
        label(for="title") Title
        div.control
          input(v-model.trim="title", name="title", placeholder="Title", type="text")
      div.margin
        label(for="quantity") Quantity
        div.control
          input(v-model.trim="quantity", name="quantity", placeholder="Quantity", type="text")
      div.margin
        label(for="date") Date
        div.controls
          input(v-model.trim="date", name="date", placeholder="Date", type="text")
    button(type="submit") Add Record
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

<style lang="sass" scoped>
@import "~uikit/src/scss/variables-theme.scss"
@import "~uikit/src/scss/mixins-theme.scss"
@import "~uikit/src/scss/uikit-theme.scss"

div.card
  @extend .uk-card
  @extend .uk-card-default
  @extend .uk-card-hover
  @extend .uk-card-body
  @extend .uk-margin-bottom

div.controls
  @extend .uk-form-controls

div.margin
  @extend .uk-margin

form
  @extend .uk-form-stacked

fieldset
  @extend .uk-fieldset

legend
  @extend .uk-legend
  @extend .uk-card-title

label
  @extend .uk-form-label

input
  @extend .uk-input
  @extend .uk-form-small

button
  @extend .uk-button
  @extend .uk-button-primary
</style>
