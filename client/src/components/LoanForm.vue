<template>
  <div class="loanform">
    <b-card class="mt-3" header-tag="header">
      <template #header>
        <h6 class="mb-0">Please add a {{ loantype }} information: </h6>
      </template>
      <b-card-body fluid>
        <b-form @submit="onSubmit" @reset="onReset" v-if="showform">
          <b-container fluid>
            <!-- User Interface controls -->
            <b-row>
              <b-col lg="4">
                <b-form-group id="input-group-1" label="Contact Name:" label-for="input-1">
                  <b-form-select id="input-1" v-model="form.contact_id" :options="contacts" required></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group id="input-group-2" label="Amount Borrowed:" label-for="input-2">
                  <b-form-input id="input-2" v-model.number="form.initial_amount" type="number" step="any" min=1
                    placeholder="Enter amount" required>
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group id="input-group-3" label="Category:" label-for="input-3">
                  <b-form-select id="input-3" v-model="form.category_id" :options="categories" required></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-form-group label="Remarks:" id="input-group-4" label-for="input-4">
                  <b-form-textarea rows="3" max-rows="4" id="input-4" textarea v-model="form.remarks">
                  </b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="secondary">Reset</b-button>
                <b-alert id="insertalert" v-if="show" show variant="success" small dismissible fade>
                  <strong>Success</strong>. The borrow information has been added. Thank you. 
                </b-alert>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </b-card-body>
    </b-card>
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
  }

  .card {
    border-color: #e4c8d7;
    box-shadow: 3px 3px 3px gray;
  }

  .card-header {
    background-color: #bc92a9;
  }

  .card-header h6 {
    font-weight: 500;
    color: #ffffff;
  }

  .btn-primary {
    /* background-color: #4bcbd4;
    border-color: #4bcbd4; */
    background-color: #484b8a;
    border-color: #484b8a;
    border-radius: 0;
    margin: 3px;
  }

  .btn-secondary {
    /* background-color: #9fd1b4;
    border-color: #a7d0b8; */
    background-color: #bc92a9;
    border-color: #d598a0;
    border-radius: 0;
    margin: 3px;
  }

  #insertalert {
    display: inline;
    width: 60%;
    height: 70%;
    margin-left: 15px;
    font-size: 0.95em;
  }
</style>