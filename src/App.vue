<template>
  <div id="app" class="uk-grid-small" uk-grid>
    <div>
      <record-form></record-form>
    </div>
    <record-table>
      <record-row
        v-for="record in records"
        v-bind:record="record"
        v-bind:key="record.id">
      </record-row>
    </record-table>
  </div>
</template>

<script>
import RecordForm from './components/RecordForm'
import RecordTable from './components/RecordTable'
import RecordRow from './components/RecordRow'

export default {
  props: ['records', 'reports'],
  name: 'app',
  components: {
    RecordForm,
    RecordTable,
    RecordRow
  }
}
</script>
