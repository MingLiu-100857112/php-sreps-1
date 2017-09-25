<template>
  <div id="app" class="uk-grid-small" uk-grid>
    <div>
      <record-form></record-form>
      <report-form v-bind:reports="reports"></report-form>
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

import ReportForm from './components/ReportForm'

export default {
  props: ['records', 'reports'],
  name: 'app',
  components: {
    RecordForm,
    RecordTable,
    RecordRow,
    ReportForm
  }
}
</script>
