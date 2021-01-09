<template>
  <div class="loanlist">
    <b-container fluid>
      <b-row>
        <b-col>
          <b-modal id="modal-delete-loan" title="Delete" @ok="handleDelete">
            This will delete all the records for this loan entry.
            Are you sure?
          </b-modal>

          <b-modal id="modal-pay-loan" title="Insert Payment Information" hide-footer ref="modal"
            @hidden="resetPayModal" @show="setModalPay">
            <div>Paid to: {{ selectedLoanInfo.name }} </div>
            <b-form @submit="handleAddPaymt">
              <b-form-group label="Date Payment Made:" label-for="datePaidInput">
                <b-form-input type="date" id="datePaidInput" v-model="paymentInputs.date" required></b-form-input>
              </b-form-group>

              <b-form-group label="Amount Paid:" label-for="amountPaidInput" description="The value in the Amount Paid, is the unpaid balance.
              You can put any amount if you're not paying full.">
                <b-form-input type="number" step="any" min=1 id="amountPaidInput"
                  v-model.number="paymentInputs.amount_paid" placeholder="Enter amount" required></b-form-input>
              </b-form-group>
              <div class="custom-modal-footer">
                <button class="btn btn-secondary mr-2" @click="$bvModal.hide('modal-pay-loan')"
                  type="reset">Close</button>
                <button class="btn btn-primary ml-2" type="submit">Submit form</button>
              </div>
            </b-form>
          </b-modal>

          <b-modal id="modal-display-info" title="Borrow Details" scrollable ok-only @hidden="resetData"
            @ok="resetData">
            <loan-details :loaninfo="selectedLoanInfo" :payments="payments" @shortDate="getLocaleDate" />
          </b-modal>

          <div class="main-list">
            <b-table default small striped stacked="sm" :fields="fields"
              :items="loans" responsive="md">
              <template #cell(date)="data">
                {{ getLocaleDate(data.value) }}
              </template>

              <template #cell(status)="data">
                <p class="text-capitalize"><span :class="['badge', data.value === 'done' ? 'badge-success' : 'badge-secondary']"> {{ data.value }}</span></p>
              </template>

              <!-- A virtual custom action/buttons column -->
              <template #cell(actions)="row">
                <b-button-group>
                  <b-button size="sm" class="mr-1" v-b-modal.modal-delete-loan @click="selectedLoan = row.item.id ">
                    <b-icon icon="trash-fill"></b-icon>
                  </b-button>
                  <b-button size="sm" class="mr-1" v-b-modal.modal-pay-loan @click="setSelected(row.item)">
                    <b-icon icon="cash-stack"></b-icon> Add Payment
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
  </div>
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
        form: {
          email: '',
          name: ''
        },
        selectedLoan: 0,
        selectedLoanInfo: {},
        thresholdInfo: {},
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
          { key: 'initial_amount', label: 'Amount Borrowed', variant: 'warning', sortable: true }, '',
          // A regular column
          { key: 'totalpaid', label: 'Total Paid', variant: 'success' },
          // A regular column
          { key: 'currentamount', label: 'Current Unpaid' },
          { key: 'status',  sortable: true },
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
      getThreshold() {
        fetch("/api/threshold/" + this.uid)
          .then(response => response.json())
          .then(data => this.thresholdInfo = data);
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
        let loanStatus = null;

        event.preventDefault();
        this.paymentInputs.date += " 00:00:00";
        //console.log(this.paymentInputs);
        if (this.paymentInputs.amount_paid >= this.selectedLoanInfo.currentamount) loanStatus = "done";
        this.$emit("addPayment", this.paymentInputs, loanStatus);
        this.resetData();
        this.$bvModal.hide('modal-pay-loan')
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
    },
    created() {
      this.getThreshold();
    }
  }
</script>


<style>
  .loanlist {
    padding: 20px 0 0 10px;
    background-color: #e8eaed;
  }
  .main-list {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 2px gray;
    border: 1px solid #dadce0;
    width: 90%;
  }

  .main-list,  thead {
    font-size: 1em;
  }

  thead {
    background-color: #e1f5fe !important;
  }

  thead th {
    color: #01579b;
  }

  .done {
    font-weight: bold;
    color:#1a960a;
  }

  /* #e4c8d7 */
  .table button {
    background-color: #01579b;
    border-color: #01579b;
    /* background-color: #a7d0b8; */
  }

  .custom-modal-footer {
    text-align: right;
    border-top: lightgray solid 1px;
    margin-top: 10px;
    padding-top: 10px;
  }

  .table-striped tbody tr:nth-of-type(odd) {
    background-color: #fafafa !important;
  }

  /*------------- Responsive part ------------*/

  @media only screen and (max-width: 800px) {
    .main-list {
      width: 100%;
    }
  }

</style>