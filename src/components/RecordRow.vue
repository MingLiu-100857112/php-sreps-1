<template>
<tr>
  <template v-if="editing">
      <td>{{ record.id }}</td>
      <td>
        <input
          v-model.trim="newRecord.title"
          v-on:keyup.enter="doneEditing"
          class="uk-input uk-form-small uk-form-width-small"
          placeholder="Title"
          type="text">
      </td>
      <td>
        <input
          v-model.trim="newRecord.quantity"
          v-on:keyup.enter="doneEditing"
          class="uk-input uk-form-small uk-form-width-small"
          placeholder="Quantity"
          type="text">
      </td>
      <td>
        <input
          v-model.trim="newRecord.date"
          v-on:keyup.enter="doneEditing"
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
      newRecordId: this.record.id,
      newRecord: {
        title: this.record.title,
        quantity: this.record.quantity,
        date: this.record.date
      }
    }
  },
  methods: {
    beginEditing: function() {
      this.editing = true
    },
    endEditing: function() {
      this.editing = false
      this.newRecordId = this.record.id
      this.newRecord = {
        title: this.record.title,
        quantity: this.record.quantity,
        date: this.record.date
      }
    },
    doneEditing: function() {
      this.editing = false
      this.newRecordId = this.newRecordId
      this.newRecord = {
        title: this.newRecord.title,
        quantity: +this.newRecord.quantity,
        date: new Date(this.newRecord.date).toJSON()
      }
      var day = this.newRecord.date.slice(0, 10)
      var month = this.newRecord.date.slice(0, 7)
      var year = this.newRecord.date.slice(0, 4)
      database.child('/records/' + this.newRecordId).set(this.newRecord)
      updateLocation('/reports/' + this.newRecord.title, this.newRecord.quantity)
      updateLocation('/daily-reports/' + day + '/' + this.newRecord.title, this.newRecord.quantity)
      updateLocation('/monthly-reports/' + month + '/' + this.newRecord.title, this.newRecord.quantity)
      updateLocation('/annually-reports/' + year + '/' + this.newRecord.title, this.newRecord.quantity)
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
