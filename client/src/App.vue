<template>
  <div id="app">
    <div class="appheader">
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
      <div class="subheader"> </div>
    </div>
    <div class="quoteflash">
      <b-icon icon="star-fill" variant="primary"></b-icon>
      Quote of the day: <i>"The art is not in making money, but in keeping it."</i> – <b>Anonymous</b>
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
    data() {
      return {
        userId: 1, //dummy user
        name: "Lovelyz",
        loantype: "borrow",
      };
    },
    methods: {


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

  .navbar-brand {
    color: #d6eaff;
  }

  .subheader {
    position: relative;
    height: 20px;
    z-index: 5;
    background-color: #0080ff;
    box-shadow: 0px 3px 3px rgb(54, 76, 117);
    border-bottom: 1px solid black;
  }

  .quoteflash {
    position: relative;
    background-color: #e8f0fe;
    z-index: 2;
    padding: 20px 24px;
    font-weight: normal;
    font-size: 14px;
    color: #424242;
    margin-bottom: 1.5em;
  }

  #grad1 {
    height: 200px;
    background-color: gray;
    /* For browsers that do not support gradients */
    background-image: linear-gradient(to bottom right, #b5c1d1, #f4f6f9);
  }

</style>