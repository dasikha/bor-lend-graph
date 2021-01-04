<template>
  <div class="loanpage">
    <h1>this is loan</h1>
    <p>
      This page will have the Loan Form and the Loan list. 
      First phase will be solely for Loan type = 'borrow'
      This loan type from parent is {{ loantype }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'LoanPage',
  props: {
    loantype: String
  },
  methods: {
    getCategories() {
      fetch("./api/categories")
        .then(response => response.json())
        .then(data => {
          this.categoryList = data;
          //console.log(this.categoryList);
        });
    },
    getContacts() {
      fetch("/api/contacts")
        .then(response => response.json())
        .then(data => this.contactsList = data);
    },    
    getLoansSummary(id, type) {
        fetch("/api/loans/summary/" + id + "/" + type)
            .then(response => response.json())
            .then(data => this.loanList = data);
    },    
  },
  mounted () {
    this.getCategories();
    console.log(this.categoryList);
    console.log("hello");
  }
}
</script>