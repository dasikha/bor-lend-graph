<template>
  <div class="loanpage">
    <h1>Add Loan ({{ loantype }})</h1>
    <loan-form @addLoan="addNewLoan"
      :uid="uid" 
      :contacts="contacts" 
      :categories="categories" 
      :loantype="loantype" />
    <p>
      Pending: Loan list. 
      First phase will be solely for Loan type = {{ loantype }}
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
    addNewLoan(data) {

      //console.log(JSON.stringify(data));
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
    }
  },
  created () {
    this.getCategories();
    this.getContacts(this.uid);
    this.getLoansSummary(this.uid, this.loantype);
  },
  mounted () {
    // this.getCategories();
    // this.getContacts();

  }
}
</script>