<template>
  <div class="loanpage">
    <b-container fluid>
      <b-row>
        <b-col>
          <h5></h5>
          <loan-form @addLoan="addNewLoan" :uid="uid" :contacts="contacts" :categories="categories"
            :loantype="loantype" />
          <loan-list :loans="loans" @deleteLoan="deleteLoanInfo" @addPayment="addNewPayment" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import LoanForm from './LoanForm.vue';
  import LoanList from './LoanList.vue';
  //import FormTable from './FormTable.vue';
  //import TestForm from './TestForm.vue';

  export default {
    components: { LoanForm, LoanList },
    name: 'LoanPage',
    props: {
      uid: Number,
      loantype: String,
    },
    data() {
      return {
        categories: [],
        contacts: [],
        loans: []
      };
    },
    methods: {
      getCategories() {
        fetch("/api/categories")
          .then(response => response.json())
          .then(data => {
            this.categories = data;
            this.categories.unshift({ text: 'Select One', value: null });
          });
      },
      getContacts(uid) {
        fetch("/api/contacts/" + uid)
          .then(response => response.json())
          .then(data => {
            this.contacts = data;
            this.contacts.unshift({ text: 'Select One', value: null });
          });
      },
      getLoansSummary(id, type) {
        fetch("/api/loans/summary/" + id + "/" + type)
          .then(response => response.json())
          .then(data => this.loans = data);
      },
      addNewLoan(data) {
        fetch("/api/loans", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then(response => {
            response.json();
            this.getLoansSummary(this.uid, this.loantype);
          })
          .catch(error => {
            console.error("Error in add: ", error);
          });
      },
      deleteLoanInfo(loanId) {
        fetch("/api/loans/" + loanId, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => {
            response.json();
            this.getLoansSummary(this.uid, this.loantype);
          })
          .catch(error => {
            console.error("Error in delete: ", error);
          });
      },
      addNewPayment(data) {
        fetch("/api/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then(response => {
            response.json();
            this.getLoansSummary(this.uid, this.loantype);
          })
          .catch(error => {
            console.error("Error in add: ", error);
          });
      }
    },
    created() {
      this.getCategories();
      this.getContacts(this.uid);
      this.getLoansSummary(this.uid, this.loantype);
    },
    mounted() {
      // this.getCategories();
      // this.getContacts();

    }
  }
</script>

<syle></syle>