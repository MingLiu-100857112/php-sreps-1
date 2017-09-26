<template lang="pug">
div.uk-overflow-auto
  table.uk-table.uk-table-divider
    thead
      tr
        th Identifier
        th.uk-width-small Title
        th.uk-width-small Quantity
        th.uk-width-medium Date
    tbody
      slot
</template>

<script>
export default {
  name: 'record-table'
}
</script>
