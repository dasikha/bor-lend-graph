<template>
  <div id="app">
    <div id="header">
      <b-navbar toggleable="lg" type="dark">
        <b-navbar-brand href="#">In-a-Pinch</b-navbar-brand>
    
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Borrow</b-nav-item>
            <b-nav-item href="#" disabled>Lend</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>Welcome {{name}}!</em>
              </template>
              <b-dropdown-item href="#">Settings</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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
  color: #2c3e50;
  background-color: #dcdcd7;
}
.navbar {
 background-color: #484b8a !important;
 box-shadow: 0px 2px 3px gray;
 border-bottom: 1px solid darkblue;
}
.page-header {
  background-color: #93cdd1;
}
</style>
