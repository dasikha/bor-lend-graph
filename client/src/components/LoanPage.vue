<template>
  <div class="loanpage">
    <div class="pageheader">
  
      <h4>My {{ loantype }} page</h4>
      
    </div>
    <loan-form @addLoan="addNewLoan" :uid="uid" :contacts="contacts" :categories="categories"
      :loantype="loantype" />
    <threshold-bar :thresholdInfo="thresholdInfo" />
    <loan-list :loans="loans" :uid="uid" @deleteLoan="deleteLoanInfo" @addPayment="addNewPayment" />
    <br/>
    <!-- <line-chart :chartdata="chartData" :options="chartOptions"/> -->
    <!-- <LineChart/> -->
    
  </div>
</template>

<script>
  import LoanForm from './LoanForm.vue';
  import LoanList from './LoanList.vue';
  import ThresholdBar from './ThresholdBar.vue';
  // import LineChart from './LineChart.vue';

  export default {
    components: { LoanForm, LoanList, ThresholdBar },
    name: 'LoanPage',
    props: {
      uid: Number,
      loantype: String,
    },
    data() {
      return {
        categories: [],
        contacts: [],
        loans: [],
        thresholdInfo: {}
      }
    },
    methods: {
      getCategories() {
        fetch("/api/categories")
          .then(response => response.json())
          .then(data => {
            this.categories = data;
            this.categories.unshift({ text: 'Select One', value: null });
          })
          .catch(error => {
            console.error("Error in get categories: ", error);
          });
      },
      getContacts(uid) {
        fetch("/api/contacts/" + uid)
          .then(response => response.json())
          .then(data => {
            this.contacts = data;
            this.contacts.unshift({ text: 'Select One', value: null });
          })
          .catch(error => {
            console.error("Error in get contacts: ", error);
          });
      },
      getLoansSummary(id, type) {
        fetch("/api/loans/summary/" + id + "/" + type)
          .then(response => response.json())
          .then(data => this.loans = data)
          .catch(error => {
            console.error("Error in get loan: ", error);
          });
      },
      getThreshold() {
        fetch("/api/threshold/" + this.uid)
          .then(response => response.json())
          .then(data => {
            this.thresholdInfo = data[0];
            // this.thresholdInfo.threshLimit = data[0].threshold_limit;
            // this.thresholdInfo.sumUnpaid = data[0].cur_amt
            // console.log(this.thresholdInfo)
          });
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
            console.error("Error in add loan: ", error);
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
            console.error("Error in delete loan-payment: ", error);
          });
      },
      addNewPayment(data, lstatus = null) {
        const loanid = data.loan_id;
        fetch("/api/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then(response => {
            response.json();
            (lstatus) ? this.updateLoanStatus(loanid, lstatus) : this.getLoansSummary(this.uid, this.loantype);
          })
          .catch(error => {
            console.error("Error in add payment: ", error);
          });
      },
      updateLoanStatus(lid, lstatus) {
        fetch(`/api/loans/${lid}/${lstatus}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: lid, status: lstatus })
        }).then(res => {
          // Continue fetch request here
          res.json();
          this.getLoansSummary(this.uid, this.loantype);
        })
        .catch(error => {
            console.error("Error in update loan: ", error);
        });
      }      
    },
    created() {
      this.getCategories();
      this.getContacts(this.uid);
      this.getLoansSummary(this.uid, this.loantype);
      this.getThreshold();
    },
    mounted() {
      // this.getCategories();
      // this.getContacts();

    }
  }
</script>

<style>

  .loanpage, input {
    font-size: 0.9em;
    /* text-align: center; */
    width: 100%
  }
  .pageheader {
    /* text-align: center; */
    color: #1a73e8;   
    font-size: 24px;    
    text-transform: capitalize;
    margin-left: 25px;
  }

</style>