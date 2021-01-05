<template>
  <div>
    <div>I'm the loan list - is this fine?</div>
    <div>
        <div v-for="loan in loans" :key="loan.id">
          {{ loan.id }}
          {{ loan.date }}
          {{ loan.remarks }}
          {{ loan.name }} - {{ loan.contact_number }}
          {{ loan.initial_amount }}
          {{ loan.status }}
          {{ loan.totalpaid }}
          {{ loan.currentamount }}
          <button @click="handleDelete(loan.id)" type="submit">Del</button>
          <button type="submit">Display</button>
          <button type="submit">Done</button>
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
    handleDelete(loanId) {
      console.log(loanId);
      this.$emit("deleteLoan", loanId);
    }
  }
}
</script>


<style scoped>


</style>