<template>
  <div class="loanform">
    <b-card class="mt-3" header-tag="header">
      <template #header>
        <h6 class="mb-0">Please add a {{ loantype }} information: </h6>
      </template>
      <b-card-body>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group class="col-md-4" id="input-group-1" label="Contact Name:" label-for="input-1">
            <b-form-select id="input-1" v-model="form.contact_id" :options="contacts" required></b-form-select>
          </b-form-group>

          <b-form-group class="col-md-4" id="input-group-2" label="Amount:" label-for="input-2"
            description="The amount you are borrowing.">
            <b-form-input id="input-2" v-model.number="form.initial_amount" type="number" step="any" min=1
              placeholder="Enter amount" required></b-form-input>
          </b-form-group>

          <b-form-group class="col-md-4" id="input-group-3" label="Category:" label-for="input-3">
            <b-form-select id="input-3" v-model="form.category_id" :options="categories" required></b-form-select>
          </b-form-group>

          <b-form-group class="col-md-4" label="Remarks:" id="input-group-4" label-for="input-4">
            <b-form-textarea rows="3" max-rows="6" id="input-4" textarea v-model="form.remarks">
            </b-form-textarea>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
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
        show: true
      };
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        this.form.date = this.getLocaleDate();
        this.$emit("addLoan", this.form);
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.contact_id = null;
        this.form.initial_amount = null;
        this.form.remarks = '';
        this.form.category_id = null
        this.form.date = null;

        // Trick to reset/clear native browser form validation state
        this.show = true
        this.$nextTick(() => {
          this.show = true
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
</style>