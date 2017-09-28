<template lang="pug">
div#app(uk-grid)
  div
    record-form
  record-table
    record-row(v-for="record in records", :record="record", :key="record.id")
</template>

<script>
import UIkit from 'uikit'

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

<style lang="sass">
@import "~uikit/src/scss/variables-theme.scss"
@import "~uikit/src/scss/mixins-theme.scss"
@import "~uikit/src/scss/uikit-theme.scss"

#app
  @extend .uk-grid-small
</style>
