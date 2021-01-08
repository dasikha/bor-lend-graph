<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-modal id="modal-delete-loan" title="Delete" @ok="handleDelete">
          This will delete all the records for this loan entry.
          Are you sure?
        </b-modal>
        
        <b-modal id="modal-pay-loan" title="Insert Payment Information" ok-title="Add" ref="modal"
          @hidden="resetPayModal" @show="setModalPay" @ok="handleAddPaymt">
          <form ref="form" @submit.stop.prevent="handleAddPaymt">
            <div class="form-group">
              <div>For: {{ selectedLoanInfo.name }} </div>
              <label for="datePaidInput">Date Paid:</label>
              <b-form-datepicker v-model="paymentInputs.date" id="dateInput" class="mb-2"></b-form-datepicker>
            </div>

            <div class="form-group">
              <label for="amountPaidInput">Amount Paid:</label>
              <input type="number" class="form-control" v-model="paymentInputs.amount_paid" id="amountPaidInput"
                aria-describedby="amountHelp">
              <small id="amountHelp" class="form-text text-muted">The value in the Amount Paid, is the unpaid balance.
                You can put any amount if you're not paying full. </small>
            </div>
          </form>
        </b-modal>

        <b-modal id="modal-display-info" title="Borrow Details" scrollable ok-only @hidden="resetData" @ok="resetData">
          <loan-details :loaninfo="selectedLoanInfo" :payments="payments" @shortDate="getLocaleDate" />
        </b-modal>
        
        <div class="main-list">
          <b-table default striped bordered small stacked="sm" table-variant="light" :fields="fields" :items="loans"
            responsive="md">
            <template #cell(date)="data">
              {{ getLocaleDate(data.value) }}
            </template>

            <!-- A virtual custom action/buttons column -->
            <template #cell(actions)="row">
              <b-button-group>
                <b-button size="sm" class="mr-1" v-b-modal.modal-delete-loan @click="selectedLoan = row.item.id ">
                  <b-icon icon="trash-fill"></b-icon> Delete
                </b-button>
                <b-button size="sm" class="mr-1" v-b-modal.modal-pay-loan @click="setSelected(row.item)">
                  <b-icon icon="cash-stack"></b-icon> Insert Payment Info
                </b-button>
                <b-button size="sm" class="mr-1" v-b-modal.modal-display-info @click="handleDisplay(row.item)">
                  <b-icon icon="info-circle-fill"></b-icon> Show Details
                </b-button>
              </b-button-group>
            </template>

            <!-- Optional default data cell scoped slot -->
            <template #cell()="data">
              {{ data.value }}
            </template>
          </b-table>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import LoanDetails from './LoanDetails.vue';

  export default {
    components: { LoanDetails },
    name: "LoanList",
    props: {
      uid: Number,
      loantype: String,
      loans: Array
    },
    data() {
      return {
        selectedLoan: 0,
        selectedLoanInfo: {},
        payments: [],
        paymentInputs: {
          loan_id: 0,
          amount_paid: null,
          date: null
        },
        fields: [
          // A regular column
          { key: 'date', sortable: true },
          // A column that needs custom formatting
          { key: 'name', label: 'Lender', sortable: true },
          // A column that needs custom formatting
          { key: 'contact_number', label: 'Contact #' },
          // A regular column
          { key: 'initial_amount', label: 'Amount Borrowed', sortable: true }, '',
          // A regular column
          { key: 'totalpaid', label: 'Total Paid' },
          // A regular column
          { key: 'currentamount', label: 'Current Unpaid' },
          'status',
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
        //console.log(loan);
        this.setSelected(loan);
        this.getPayments();
      },
      resetData() {
        this.payments = [];
        this.selectedLoan = 0;
        this.selectedLoanInfo = {};
      },
      handleAddPaymt() {
        this.paymentInputs.date += " 00:00:00";
        //console.log(this.paymentInputs);
        this.$emit("addPayment", this.paymentInputs);
        this.resetData();
      },
      setModalPay() {
        this.paymentInputs.loan_id = this.selectedLoan;
        this.paymentInputs.amount_paid = this.selectedLoanInfo.currentamount;
      },
      resetPayModal() {
        this.selectedLoan = 0;
        this.selectedLoanInfo = {};
        this.paymentInputs = {
          loan_id: 0,
          amount_paid: null,
          date: null
        }
      },
      getLocaleDate(date) {
        let d = new Date(date);
        return d.toLocaleDateString();
      }
    }
  }
</script>


<style>
  .main-list {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 3px 3px 3px gray;
  }
  .main-list,
  thead {
    font-size: .95em;
  }
  thead {
    background-color: #484b8a;
  }
  thead th {
    color: white;
  }
  /* #e4c8d7 */
  .table button {
    background-color: #93cdd1;
    border-color: #93cdd1;
    /* background-color: #a7d0b8; */
  }
</style>