<template>
  <div class="uk-overflow-auto">
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th>Identifier</th>
          <th class="uk-width-small">Title</th>
          <th class="uk-width-small">Quantiy</th>
          <th class="uk-width-medium">Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'record-table'
}
</script>
