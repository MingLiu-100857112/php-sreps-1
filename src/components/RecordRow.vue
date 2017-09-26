<template>
  <tr>
    <template v-if="editing">
      <td>{{ record.id }}</td>
      <td>
        <input
          v-model.trim="title"
          v-on:keyup.enter="edit"
          class="uk-input uk-form-small uk-form-width-small"
          placeholder="Title"
          type="text">
      </td>
      <td>
        <input
          v-model.trim="quantity"
          v-on:keyup.enter="edit"
          class="uk-input uk-form-small uk-form-width-small"
          placeholder="Quantity"
          type="text">
      </td>
      <td>
        <input
          v-model.trim="date"
          v-on:keyup.enter="edit"
          class="uk-input uk-form-small uk-form-width-medium"
          placeholder="Date"
          type="text">
      </td>
    </template>
    <template v-else>
      <td>{{ record.id }}</td>
      <td>{{ record.title }}</td>
      <td>{{ record.quantity }}</td>
      <td>{{ record.date | formatDate }}</td>
    </template>
    <td>
      <button
        v-if="editing"
        v-on:click="endEditing"
        class="uk-button uk-button-default uk-button-small">
        Cancel
      </button>
      <div v-else class="uk-button-group">
        <button
          v-on:click="beginEditing"
          class="uk-button uk-button-secondary uk-button-small">
          Edit
        </button>
        <button
          v-on:click="remove"
          class="uk-button uk-button-danger uk-button-small">
          Remove
        </button>
      </div>
    </td>
  </tr>
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
