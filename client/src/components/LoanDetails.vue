<template>
    <div>
        <b-container fluid>
            <b-row>
                <b-col>Lender: {{ loaninfo.name }}</b-col>
                <b-col>Date Entered: {{ loaninfo.date }}</b-col>
            </b-row>
            <b-row>
                <b-col>Amount Borrowed: ${{ loaninfo.inital_amount }}</b-col>
                <b-col>Category: {{ loaninfo.category_name }}</b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div>Remarks:</div>
                    <div>{{ loaninfo.remarks }}</div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div></div>
                    <div>
                        <b-table striped small table-variant="light" hover :items="payments"></b-table>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    
    export default {
        name: "LoanDetails",
        props: {
            loaninfo: Object,
            payments: Array
        },
        method: {

        }
    }
</script>

<style></style>