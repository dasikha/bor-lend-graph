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
      <div class="subheader"><p> </p></div>
    </div>
    <div class="quoteflash">Tip of the day: <i>"If you would be wealthy, think of saving as well as getting."</i> – <b>Benjamin Franklin</b></div>
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
    data() {
      return {
        userId: 1, //dummy user
        name: "Lovelyz",
        loantype: "borrow",
      };
    },
    methods: {


    },
    created() {

    },
    mounted() {


    }

  }
</script>

<style>
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  #app {
    font-family: Google Sans, Roboto, Noto Sans, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #ffffff;
  }

  .navbar {
    background-color: #1a73e8 !important;
    border-bottom: #5e94da 0.5px solid;
  }
  #header {
    box-shadow: 0px 2px 3px gray;
    border-bottom: 1px solid black;   
    background-color: #0080ff; 
  }
  .subheader {
    height: .5em;
    padding-left: 20px;
  }
  .subheader > p {
    font-weight: lighter;
    font-size: 0.95em;
    color: #a4eeb7;
  }
  .quoteflash {
    background-color: #e8f0fe;  
    padding: 20px 24px; 

    font-weight: normal;
    font-size: 14px;
    color: #424242;
    margin-bottom: 1.5em;
  }
  .page-header {
    background-color: #93cdd1;
  }
</style>