<template>
  <div>
    <b-modal id="modal-delete-loan" title="Delete" @ok="handleDelete">
      This will delete all the records for this loan entry.
      Are you sure?
    </b-modal>

    <b-modal id="modal-pay-loan" title="Insert Payment Information" 
      ok-title="Add"
      ref="modal"
      @hidden="resetPayModal"
      @show="setModalPay"
      @ok="handleAddPaymt"
    >      
      <form ref="form" @submit.stop.prevent="handleAddPaymt">
        <div class="form-group">
          <div>For: {{ selectedLoanInfo.name }} </div>
          <label for="datePaidInput">Date Paid:</label>
          <b-form-datepicker v-model="paymentInputs.date" id="dateInput" class="mb-2"></b-form-datepicker>
        </div>

        <div class="form-group">
          <label for="amountPaidInput">Amount Paid:</label>
          <input type="number" class="form-control" v-model="paymentInputs.amount_paid" id="amountPaidInput" aria-describedby="amountHelp">
          <small id="amountHelp" class="form-text text-muted">The value in the Amount Paid, is the unpaid balance. 
            You can put any amount if you're not paying full. </small>          
        </div>

        <!-- <b-form-group
          label="Amount Paid"
          label-for="amount-input"
          invalid-feedback="Amount is required"
          :state="amountState"
        >
          <b-form-input
            id="amount-input"
            v-model="amountPaid"
            :state="amountState"
            required
          ></b-form-input>
        </b-form-group> -->

        
      </form>      
    </b-modal>

    <b-modal id="modal-display-info" title="Borrow Details" scrollable ok-only @hidden="resetData" @ok="resetData">
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

      <b-button v-b-modal.modal-delete-loan  @click="selectedLoan = loan.id">Delete</b-button>
      <b-button v-b-modal.modal-display-info @click="handleDisplay(loan)">Details</b-button>
      <b-button v-b-modal.modal-pay-loan @click="setSelected(loan)">Update Payment</b-button>
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
        selectedLoan: 0,
        selectedLoanInfo: [],
        payments: [],
        paymentInputs: {
          loan_id: 0,
          amount_paid: null,
          date: null
        }
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
      setSelected(loan) {
        this.selectedLoan = loan.id;
        this.selectedLoanInfo = loan;
      },
      handleDisplay(loan) {
        this.setSelected(loan);
        this.getPayments();
      },
      resetData() {
        this.payments = [];        
        this.selectedLoan = 0;
        this.selectedLoanInfo = [];
      },
      handleAddPaymt() {
        this.paymentInputs.date += " 00:00:00";
        //console.log(this.paymentInputs);
        this.$emit("addPayment", this.paymentInputs);
      },
      setModalPay() {
        this.paymentInputs.loan_id = this.selectedLoan;
        this.paymentInputs.amount_paid = this.selectedLoanInfo.currentamount;
      },
      resetPayModal() {
        this.selectedLoan = 0;
        this.selectedLoanInfo = [];
        this.paymentInputs = {
          loan_id: 0,
          amount_paid: null,
          date: null
        }
      }
    }
  }
</script>


<style scoped>


</style>