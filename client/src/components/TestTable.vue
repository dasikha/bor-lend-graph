<template>
    <div>
        <b-modal id="modal-delete-loan1" title="Delete" ok-only>
            Testing? {{ selectedLoan }}
        </b-modal>

      <b-table small :fields="fields" :items="loans" responsive="sm">
        <!-- A virtual column -->
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
  
        <!-- A custom formatted column -->
        <template #cell(contact_numbername)="data">
          <b class="text-info">{{ data.name }}</b>, <b>{{ data.contact_number }}</b>
        </template>
    
        <!-- A virtual custom action/buttons column -->
        <template #cell(id)="data">
            <p>{{ data.value }}</p> 
            <b-button  @click="selectedLoan = data.value" >Delete</b-button>
        </template>

        <!-- Optional default data cell scoped slot -->
        <template #cell()="data">
          <i>{{ data.value }}</i>
        </template>
      </b-table>
    </div>
  </template>
  
  <script>
    export default {
        props: {
            uid: Number,
            loantype: String,
            loans: Array
        },        
        data() {
            return {
            fields: [
                // A virtual column that doesn't exist in items
                'index',
                // A column that needs custom formatting
                { key: 'contact_numbername', label: 'Contact Information' },
                // A regular column
                'date',
                // A regular column
                'initial_amount',
                // A regular column
                'totalpaid',
                // A regular column
                'currentamount',
                // A virtual column for button
                { key: 'id', label: 'Action' }
            ],
            items: [
                { name: { first: 'John', last: 'Doe' }, sex: 'Male', age: 42 },
                { name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
                { name: { first: 'Rubin', last: 'Kincade' }, sex: 'Male', age: 73 },
                { name: { first: 'Shirley', last: 'Partridge' }, sex: 'Female', age: 62 }
            ],
            selectedLoan: null
            }
        },
        methods: {
            test() {
                alert("hello");
            }
        }
    }
  </script>