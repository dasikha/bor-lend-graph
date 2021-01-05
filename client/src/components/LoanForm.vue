<template>
  <div class="loanform">
    The Loan form for borrowing entry
      <div v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
    </div>
    <form>
      <label>Contact Name:</label>
      <select v-model.number="loaninfo.contact_id">
        <option disabled selected value=0>Please select one</option>
        <option
          v-for="contact in contacts"
          v-bind:value="contact.id"
          :key="contact.id"
        >
          {{ contact.name }}
        </option>
      </select>
      <label>Amount:</label>
      $<input v-model.number="loaninfo.initial_amount" type="number" />
      <label>Category:</label>
      <select v-model.number="loaninfo.category_id">
        <option disabled selected value=0>Please select one</option>
        <option
          v-for="category in categories"
          v-bind:value="category.id"
          :key="category.id"
        >
          {{ category.category_name }}
        </option>
      </select>
      <label>Remarks</label>
      <textarea v-model="loaninfo.remarks" rows="7"></textarea>
      <input type="submit" value="Submit" @click="handleAdd" />
      <button type="reset" value="Reset"></button>
    </form>
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
            initial_amount: 0,
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
        this.errors = [];

        if (this.loaninfo.contact_id === 0) this.errors.push("Contact name required.");
        if (this.loaninfo.category_id === 0) this.errors.push('Category required.');
        if (this.loaninfo.initial_amount < 1) this.errors.push('Amount must be more than $0.');
        if (typeof(this.loaninfo.initial_amount) !== "number") this.errors.push('Amount entered in not valid. It should be in number.');

        if (!this.errors.length) return true;
    }
  }
};
</script>

<style>

</style>