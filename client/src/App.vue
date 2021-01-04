<template>
  <div id="app">
    <div id="header">
      <div>In-a-Pinch</div>
      <div>Welcome {{name}}! </div>
    </div>
    <loan-page :uid="userId" :loantype="loantype" />
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
    };
  },
  methods: {

    
  },
  created () {

  },
  mounted () {


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
