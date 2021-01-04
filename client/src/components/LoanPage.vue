<template>
  <div class="loanpage">
    <h1>Add Loan ({{ loantype }})</h1>
    <loan-form :uid="uid" :contacts="contacts" :categories="categories" :loantype="loantype" />
    <p>
      This page will have the Loan Form and the Loan list. 
      First phase will be solely for Loan type = 'borrow'
      This loan type from parent is {{ loantype }}
    </p>
  </div>
</template>

<script>
import LoanForm from './LoanForm.vue';

export default {
  components: { LoanForm },
  name: 'LoanPage',
  props: {
    uid: Number,
    loantype: String, 
  },
  data () {
    return {
      categories: [],
      contacts: [],      
      loans:[]
    };
  },
  methods: {
    getCategories() {
      fetch("/api/categories")
        .then(response => response.json())
        .then(data => {
          this.categories = data;
        });
    },
    getContacts(uid) {
      fetch("/api/contacts/" + uid)
        .then(response => response.json())
        .then(data => this.contacts = data);
    },
    getLoansSummary(id, type) {
        fetch("/api/loans/summary/" + id + "/" + type)
            .then(response => response.json())
            .then(data => this.loans = data);
    },
    addStudents(uid, type, data) {
      fetch("/api/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        response.json();
        this.getLoansSummary(uid, type);
      })
      .catch(error => {
        console.error("Error in add: ", error);
      });
    }
  },
  created () {
    this.getCategories();
    this.getContacts(this.uid);
  },
  mounted () {
    // this.getCategories();
    // this.getContacts();

  }
}
</script>