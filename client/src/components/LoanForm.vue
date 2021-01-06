<template>
  <div class="loanform">
          
          <div v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
        </div>

        <!-- <div class="form-row">
          <div class="form-group col-md-6"> -->
          <b-form-row >
            <b-form-group class="col-md-6" label="Contact Name:"
            id="input-group-1"
            label-for="input-contact">
              <b-form-select v-model="loaninfo.contact_id" id="input-contact" required>
                <option disabled selected value=null>--- Please select one ---</option>
                <option
                  v-for="contact in contacts"
                  v-bind:value="contact.id"
                  :key="contact.id"
                >
                  {{ contact.name }}
                </option>
              </b-form-select>              
            </b-form-group>       
            
            <b-form-group  class="col-md-6" label="Amount:"
            id="input-group-2"
            label-for="input-amount">
              <b-form-input required v-model.number="loaninfo.initial_amount" id="input-amount" type="number" />
            </b-form-group>

            <b-form-group class="col-md-12" label="Category:"
            id="input-group-3"
            label-for="input-category">
              <b-form-select required id="input-category" v-model.number="loaninfo.category_id">
                <option disabled selected value=null>--- Please select one ---</option>
                <option
                  v-for="category in categories"
                  v-bind:value="category.id"
                  :key="category.id"
                >
                  {{ category.category_name }}
                </option>
              </b-form-select>
            </b-form-group>

            <b-form-group class="col-md-12" label="Remarks:"
            id="input-group-4"
            label-for="input-remarks">
              <b-form-textarea rows="3" max-rows="6" id="input-remarks" textarea v-model="loaninfo.remarks">
              </b-form-textarea>
            </b-form-group>
            <b-button type="submit" @click="handleAdd" variant="outline-primary">Submit</b-button> 
            <b-button type="reset" variant="outline-primary">Reset</b-button>
          </b-form-row>      




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
        loaninfo: {
            user_id: this.uid,
            contact_id: 0,
            date: null,
            initial_amount: null,
            category_id: 0,
            remarks: "",
            status: "active",
            type: this.loantype
        },
        errors: []
    };
  },
  methods: {
    handleAdd(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.loaninfo.date = this.getLocaleDate();
            this.$emit("addLoan", this.loaninfo);
        } 
    },
    getLocaleDate() {
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');//.slice(0, -1);
        return localISOTime;
    },
    validateForm() {
        // this.errors = [];

        // if (this.loaninfo.contact_id === 0) this.errors.push("Contact name required.");
        // if (this.loaninfo.category_id === 0) this.errors.push('Category required.');
        // if (this.loaninfo.initial_amount < 1) this.errors.push('Amount must be more than $0.');
        // if (typeof(this.loaninfo.initial_amount) !== "number") this.errors.push('Amount entered in not valid. It should be in number.');

        // if (!this.errors.length) return true;
    }
  }
};
</script>

<style>

</style>