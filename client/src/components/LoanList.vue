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

    <b-table striped small :fields="fields" :items="loans" responsive="sm" >
      <!-- A virtual custom action/buttons column -->
      <template #cell(actions)="row">
          <b-button size="sm" class="mr-1" v-b-modal.modal-delete-loan  @click="selectedLoan = row.item.id ">Delete</b-button>
          <b-button size="sm" class="mr-1" v-b-modal.modal-pay-loan @click="setSelected(row.item)">Insert Payment Info</b-button>          
          <b-button size="sm" class="mr-1" v-b-modal.modal-display-info @click="handleDisplay(row.item)">Details</b-button>
      </template>

      <!-- Optional default data cell scoped slot -->
      <template #cell()="data">
        <i>{{ data.value }}</i>
      </template>
    </b-table>
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
        },
        fields: [
          // A regular column
          'date',          
          // A column that needs custom formatting
          { key: 'name', label: 'Lender' },
          // A column that needs custom formatting
          { key: 'contact_number', label: 'Contact #' },
          // A regular column
          { key: 'initial_amount', label: 'Amount Borrowed' },'',
          // A regular column
          { key: 'totalpaid', label: 'Total Paid' },
          // A regular column
          { key: 'currentamount', label: 'Current Unpaid' },'',
          // A virtual column for button
          { key: 'actions', label: 'Actions' }
        ]
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
        console.log(loan);
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