<template>
  <div>
    <div>I'm the loan list - is this fine?</div>
    <div>
        <div v-for="loan in loans" :key="loan.id">
          {{ loan.name }}
          {{ loan.date }}
          {{ loan.remarks }}
          {{ loan.name }}
          {{ loan.contact_number }}
          {{ loan.initial_amount }}
          {{ loan.status }}
          {{ loan.totalpaid }}
          {{ loan.currentamount }}
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoanList",
  props: {
    uid: Number,
    loantype: String,
    loans: Array
  },
  methods: {

  }
}
</script>


<style>

</style>