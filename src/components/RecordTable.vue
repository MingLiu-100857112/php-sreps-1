<template lang="pug">
div#record-table.overflow
  table.uk-table.uk-table-small
    thead
      tr
        th Identifier
        th.small Title
        th.small Quantity
        th.small Date
        th: button(@click="clear", type="button", uk-close)
    tbody
      slot
</template>

<script>
import UIkit from 'uikit'
import { database } from '../database'

export default {
  name: 'record-table',
  methods: {
    clear: function() {
      database.remove()
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~uikit/src/scss/variables-theme.scss"
@import "~uikit/src/scss/mixins-theme.scss"
@import "~uikit/src/scss/uikit-theme.scss"

div.overflow
  @extend .uk-overflow-auto

table
  @extend .uk-table-divider

th.small
  @extend .uk-width-small
</style>
