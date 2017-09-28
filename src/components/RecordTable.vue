<template lang="pug">
div.overflow
  table.uk-table.uk-table-small
    thead
      tr
        th Identifier
        th.small Title
        th.small Quantity
        th.small Date
    tbody
      slot
</template>

<script>
export default {
  name: 'record-table'
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
