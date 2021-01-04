<template>
    <div class="loanform">
        The Loan form for borrowing entry
        <form>
            <label>Contact Name:</label>
            <select v-model="contact_id">
                <option disabled value="">Please select one</option>
                <option v-for="contact in contacts" v-bind:value="contact.id" :key="contact.id">
                    {{ contact.name }}
                </option>
            </select>
            <label>Amount:</label>
            <input v-model="initial_amount"
                type="text"
            />
            <label>Category:</label>
            <select v-model="category_id">
                <option disabled value="">Please select one</option>
                <option v-for="category in categories" v-bind:value="category.id" :key="category.id">
                    {{ category.category_name }}
                </option>
            </select>            
            <label>Remarks</label>
            <textarea v-model="remarks" rows="7" />

        </form>
    </div>

</template>

<script>
export default {
    name: 'LoanForm',
    props: {
        uid: Number,
        loantype: String,
        contacts: Array,
        categories: Array
    },
    data () {
        return {
            user_id: this.uid,
            contact_id: null,
            date: null,
            initial_amount: 0,
            category_id: null,
            remarks: "",
            status: "active",
            type: this.loantype
        };
    },
    methods: {

    }
}
</script>