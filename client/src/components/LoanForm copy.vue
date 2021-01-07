<template>
  <div class="loanform">

    <!-- <div class="form-row">
          <div class="form-group col-md-6"> -->
    <b-form @click="onSubmit" @reset="onReset" v-if="show">
      <b-form-group class="col-md-6" label="Contact Name:" id="input-group-1" label-for="input-contact">
        <b-form-select v-model="form.contact_id" id="input-contact" type="number" required>
        </b-form-select>
      </b-form-group>

      <b-form-group class="col-md-6" label="Amount:" id="input-group-2" label-for="input-amount">
        <b-form-input required v-model.number="form.initial_amount" id="input-amount" type="number" />
      </b-form-group>

      <b-form-group class="col-md-12" label="Category:" id="input-group-3" label-for="input-category">
        <b-form-select required id="input-category" v-model.number="form.category_id">
          <option disabled selected value=null>--- Please select one ---</option>
          <option v-for="category in categories" v-bind:value="category.id" :key="category.id">
            {{ category.category_name }}
          </option>
        </b-form-select>
      </b-form-group>

      <b-form-group class="col-md-12" label="Remarks:" id="input-group-4" label-for="input-remarks">
        <b-form-textarea rows="3" max-rows="6" id="input-remarks" textarea v-model="form.remarks">
        </b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
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
          user_id: this.uid,
          contact_id: null,
          date: null,
          initial_amount: null,
          category_id: null,
          remarks: '',
          status: 'active',
          type: this.loantype
        },
        show: true
      };
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        alert(JSON.stringify(this.form))
        // if (this.validateForm()) {
        //     this.form.date = this.getLocaleDate();
        //     this.$emit("addLoan", this.form);
        // } 
      },
      getLocaleDate() {
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');//.slice(0, -1);
        return localISOTime;
      },
      //validateForm() {
      // this.errors = [];

      // if (this.form.contact_id === 0) this.errors.push("Contact name required.");
      // if (this.form.category_id === 0) this.errors.push('Category required.');
      // if (this.form.initial_amount < 1) this.errors.push('Amount must be more than $0.');
      // if (typeof(this.form.initial_amount) !== "number") this.errors.push('Amount entered in not valid. It should be in number.');

      // if (!this.errors.length) return true;
      //},
      onReset() {
        event.preventDefault();
        this.form.contact_id = null;
        this.form.date = null;
        this.form.initial_amount = null;
        this.form.category_id = null;
        this.form.remarks = "";

        // Trick to reset/clear native browser form validation state
        this.show = true;
        this.$nextTick(() => {
          this.show = true;
        })
      }
    }
  };
</script>

<style>

</style>