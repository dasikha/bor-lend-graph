<template>
  <div id="app">
    <div id="header">
      In-a-Pinch
      Welcome {{name}}!
    </div>
    <loan-page :loantype="loantype" />
   </div>
</template>

<script>
import LoanPage from './components/LoanPage.vue';

export default {
  name: 'App',
  components: {
    LoanPage
  },
  data(){
    return {
      userId: 1, //dummy user
      name: "Lovelyz",  
      loantype: "borrow",
      contactsList: []      
    };
  },
  methods: {
    getContacts() {
      fetch("/api/contacts")
        .then(response => response.json())
        .then(data => {
          this.contactsList = data;
          console.log("===> ", this.contactsList);
        });
    }
  },
  mounted () {
    this.getContacts();

  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.header {
  background-color: #7fffd4;
}
</style>
