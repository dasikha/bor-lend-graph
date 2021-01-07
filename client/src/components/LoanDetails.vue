<template>
    <div>
        <b-container fluid>
            <b-row>
                <b-col>Lender: {{ selectedLoanInfo.name }}</b-col>
                <b-col>Date Entered: {{ selectedLoanInfo.date }}</b-col>
            </b-row>
            <b-row>
                <b-col>Amount Borrowed: {{ selectedLoanInfo.inital_amount }}</b-col>
                <b-col>Category: {{ selectedLoanInfo.category_name }}</b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div>Remarks:</div>
                    <div>{{ selectedLoanInfo.remarks }}</div>
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
            selectedLoanInfo: Array,
            payments: Array
        }
    }
</script>

<style></style>