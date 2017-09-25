<template>
  <div class="uk-card uk-card-default uk-card-hover uk-card-body uk-margin-bottom">
    <h3 class="uk-card-title">Summary Report</h3>
    <table class="uk-table uk-table-small uk-table-divider">
      <tbody>
        <tr v-for="report in reports">
          <td class="uk-text-left">{{ report.title }}</td>
          <td class="uk-text-right">{{ report.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['reports'],
  name: 'report-form'
}
</script>
