<template>
  <div class="uk-card uk-card-default uk-card-hover uk-card-body uk-margin-bottom">
    <form
      v-on:submit.prevent="addNewRecord"
      class="uk-form-stacked">
      <fieldset class="uk-fieldset">
        <legend class="uk-legend uk-card-title">Enter new record</legend>
        <div class="uk-margin">
          <label
            class="uk-form-label"
            for="form-title">
            Title
          </label>
          <div class="uk-form-controls">
            <input
              v-model.trim="title"
              class="uk-input uk-form-small"
              placeholder="Title"
              type="text">
          </div>
        </div>
        <div class="uk-margin">
          <label
            class="uk-form-label"
            for="form-quantity">
            Quantity
          </label>
          <div class="uk-form-controls">
            <input
              v-model.trim="quantity"
              class="uk-input uk-form-small"
              placeholder="Quantity"
              type="text">
          </div>
        </div>
        <div class="uk-margin">
          <label
            class="uk-form-label"
            for="form-quantity">
            Date
          </label>
          <div class="uk-form-controls">
            <input
              v-model.trim="date"
              class="uk-input uk-form-small"
              placeholder="Date"
              type="text">
          </div>
        </div>
      </fieldset>
      <button
        class="uk-button uk-button-primary"
        type="submit">
        Add Record
      </button>
    </form>
  </div>
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
