<template>
  <div>
    <b-modal title="Delete" @ok="handleDelete()" v-model="modalDeleteShow">
      This will delete all the records for this loan entry.
      Are you sure?
    </b-modal>
    <b-modal title="Insert Paid Information" v-model="modalPayShow">
      Payment
    </b-modal>

    <b-modal title="Borrow Details" scrollable v-model="modalDisplayShow" ok-only>
      <b-container fluid>
        <b-row>
          <b-col>Lender: {{ selectedLoanInfo.name }}</b-col>
          <b-col>Date Entered: {{ selectedLoanInfo.date }}</b-col>
        </b-row>
        <b-row>
          <b-col>Amount Borrowed: {{ selectedLoanInfo.inital_amount }}</b-col>
          <b-col>Category: {{ selectedLoanInfo.category_name }}</b-col>
        </b-row>
        <b-row>
          <b-col>
            <div>Remarks:</div>
            <div>{{ selectedLoanInfo.remarks }}</div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div>Payment List:</div>
            <div>
              <b-table striped hover :items="payments"></b-table>
            </div>
          </b-col>
        </b-row>
  
      </b-container>
    </b-modal>
    
    <div v-for="loan in loans" :key="loan.id">
      {{ loan.id }}
      {{ loan.date }}
      {{ loan.remarks }}
      {{ loan.name }} - {{ loan.contact_number }}
      {{ loan.initial_amount }}
      {{ loan.status }}
      {{ loan.totalpaid }}
      {{ loan.currentamount }}

      <b-button @click="modalDeleteShow = !modalDeleteShow; selectedLoan = loan.id">Delete</b-button>
      <b-button @click="modalPayShow = !modalPayShow; selectedLoan = loan.id">Pay</b-button>
      <b-button @click="handleDisplay(loan)">Details</b-button>
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
    data() {
      return {
        modalDeleteShow: false,
        modalPayShow: false,
        modalDisplayShow: false,
        selectedLoan: 0,
        selectedLoanInfo: [],
        payments: []
      }
    },
    methods: {
      handleDelete() {
        //console.log(this.selectedLoan);
        this.$emit("deleteLoan", this.selectedLoan);
      },
      getPayments() {
        fetch("/api/payments/" + this.selectedLoan)
          .then(response => response.json())
          .then(data => this.payments = data);
      },
      handleDisplay(loan) {
        this.modalDisplayShow = !this.modalDisplayShow;
        this.selectedLoan = loan.id;
        this.selectedLoanInfo = loan;
        this.getPayments();

      }
    }
  }
</script>


<style scoped>


</style>