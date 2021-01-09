<template>
  <div class="loanform">
    <b-form @submit="onSubmit" @reset="onReset" v-if="showform">
      <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
          <b-col lg="7">
            <b-form-group id="input-group-1" label="Contact Name:" label-for="input-1">
              <b-form-select id="input-1" v-model="form.contact_id" :options="contacts" required></b-form-select>
            </b-form-group>
          </b-col>
          <b-col lg="5">
            <b-form-group id="input-group-2" label="Amount Borrowed:" label-for="input-2">
              <b-form-input id="input-2" v-model.number="form.initial_amount" type="number" step="any" min=1
                placeholder="Enter amount" required>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group id="input-group-3" label="Category:" label-for="input-3">
              <b-form-select id="input-3" v-model="form.category_id" :options="categories" required></b-form-select>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Remarks:" id="input-group-4" label-for="input-4">
              <b-form-textarea rows="2" max-rows="3" id="input-4" textarea v-model="form.remarks">
              </b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col lg="12" class="hiddendiv">
            <b-alert id="insertalert" v-if="show" show variant="success" dismissible fade>
              <strong>Success</strong>. The borrow information has been added. Thank you.
            </b-alert>
          </b-col>
          <b-col lg="12">
            <b-button type="submit" variant="primary">Add a Borrow Information</b-button>
            <b-button type="reset" variant="secondary">Reset</b-button>
          </b-col>

        </b-row>
      </b-container>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: "LoanForm",
    props: {
      uid: Number,
      loantype: String,
      contacts: Array,
      categories: Array,
    },
    data() {
      return {
        form: {
          contact_id: null,
          initial_amount: null,
          category_id: null,
          remarks: '',
          date: null,
          user_id: this.uid,
          status: 'active',
          type: this.loantype,
        },
        showform: true,
        show: false
      };
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        this.form.date = this.getLocaleDate();
        this.$emit("addLoan", this.form);
        this.show = true;
        this.onReset(event);
      },
      onReset(event) {
        event.preventDefault();
        // Reset our form values
        this.form.contact_id = null;
        this.form.initial_amount = null;
        this.form.remarks = '';
        this.form.category_id = null
        this.form.date = null;
        setTimeout(() => { this.show = false; }, 3000);
        // Trick to reset/clear native browser form validation state
        this.showform = true
        this.$nextTick(() => {
          this.showform = true
        })
      },
      getLocaleDate() {
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');//.slice(0, -1);
        return localISOTime;
      }
    }

  };
</script>

<style scoped>
  .loanform {
    padding: 10px 15px;
    background-color: #ffffff;
    font-weight: bold;
    margin-bottom: 5px;
    border: solid 1px #e4e4e4;
    width: 60%;
    border-radius: 0.5em;
    margin: 0 25px 20px 25px;
    /* margin-bottom: 20px; */
    /* box-shadow: 3px 5px 5px rgb(124, 124, 124); */
  }

  .btn-primary {
    background-color: #1a73e8;
    border-color: #1a73e8;
    border-radius: 0;
    margin: 3px;
  }

  .btn-secondary {
    background-color: #005086;
    border-color: #185abc;

    border-radius: 0;
    margin: 3px;
  }

  #insertalert {
    font-size: 0.9em;
    font-weight: normal;
    border: 5px white solid;
  }

  .alert-dismissible .close {
    padding: 0 !important;
  }

  .hiddendiv {
    height: 50px;
  }
.form-group {
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}
.form-control, .custom-select {
  font-size: 0.95em;
}
  .loanform .row .col {
    margin-bottom: 5px;
  }

  @media only screen and (max-width: 800px) {
    .loanform {
      width: 100%;
      margin-right: 0;
      margin-left: 0;
    }
  }
</style>