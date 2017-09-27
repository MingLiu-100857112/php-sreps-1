<template lang="pug">
div#app.uk-grid-small(uk-grid)
  div
    record-form
  record-table
    record-row(v-for="record in records", :record="record", :key="record.id")
</template>

<script>
import RecordForm from './components/RecordForm'
import RecordTable from './components/RecordTable'
import RecordRow from './components/RecordRow'

export default {
  props: ['records'],
  name: 'app',
  components: {
    RecordForm,
    RecordTable,
    RecordRow
  }
}
</script>
