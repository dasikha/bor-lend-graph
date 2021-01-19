<template>
<div class="small">
    
    <form class="col s12">
      <div class="row">  
        <!-- <div class="input-field col s3">
          <input id="amount" type="text" class="validate" ref='currentamount'>
          <label for="amount">Amount</label>
        </div>

        <div class="input-field col s3">
          <input id="date" type="text" class="validate" ref='date'>
          <label for="date">Date</label>
        </div> -->
        
        <div class='col s3'>
          <div class="row">
            <!-- Get button -->
            <b-button pill variant="success" size="sm" class="getButton"
            @click="getData()"
            >
              <i class="material-icons">Get data</i>
            </b-button>

            <!-- <b-button class="getButton" btn-small pink
            @click="postData()"
            >
              <i class="material-icons">Post Data</i>
            </b-button> -->
          </div>
        </div>

      </div>
    </form>
    <br>
    <!-- chart.js component -->
    <LineChart
        :chart-data="datacollection"
        /> 
  </div>
</template>


<script>
import LineChart from './LineChart.js'
// npm i axios
import axios from 'axios'

export default {
    components: {
        LineChart 
    },
    // data state
    data() {
        return {
            datacollection: null,
            loaded: false,
            borrow: [0,1,2,3,4,5,6,7,8,9],
            lend: [400,350,1000,500,100], // dummy data
            // month: ['January','February', 'March', 'April', 'May' ] // x-axis
            date: [0,1,2,3,4,5,6,7,8,9]
        }
    },
    async mounted() {
        this.fillData()
        this.loaded = false
        await this.getData()

    },
    // create a function fillData() that will hold the data. it consists of datacollection
    methods: {
        fillData() {
            this.datacollection = {
              labels: this.date, // x-axis
                // labels: [0,1,2,3,4,5,6,7,8,9],
                datasets: [
                    {
                        label: 'Borrow',
                        backgroundColor: 'rgba(0, 0, 255, 0.2)',
                        borderColor: 'lightblue',
                        pointBackgroundColor: 'red',
                        borderWidth: 1,
                        pointBorderColor: 'red',
                        // data: [0,1,2,3,4,5,6,7,8,9], 
                        data: this.borrow // y-axis

                    },
                    {
                        label: 'Lend',
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        borderColor: 'lightblue',
                        pointBackgroundColor: 'blue',
                        borderWidth: 1,
                        pointBorderColor: 'blue',
                        // data: [400,350,1000,500,100]
                        data: this.lend // y-axis

                    }
                ]
            }
        },
        // getData function
        getData() {
          let url = "http://localhost:5000/api/loans/summary/1/borrow"
          let headers = {
            headers: {
              'Content-Type' : 'application/json',
            }
          }
          axios.get(url, headers)
          .then((x)=> {
            // only print from the data. so it prints the array
            console.log(x); 
            let results = x.data
            let amount = [] // y-axis
            let date = [] // x-axis
            for(let i = 0; i < results.length; i++) {
              //parseInt convert string to integer
              let a = parseInt(results[i].currentamount)
              let det = results[i].date.split("T")

              amount.push(a)
              date.push(det)
            }
            this.borrow = amount
            this.date = date
            this.loaded = true
            this.fillData()
          })
          .catch(()=> {
            alert("Sorry, I can't get the data!")
            // console.log(err);
          })

        },
        // postData function
        // postData() {
        //   alert("You clicked me!");
        //   let url = "http://localhost:5000/api/loans/summary/1/borrow"
        //   let headers = {
        //     headers: {
        //       'Content-Type' : 'application/json',
        //     }
        //   }
        //   let dataBody = {
        //     data : {
        //       currentamount : this.$refs.currentamount.value,
        //       date: this.$refs.date.value
        //     }
        //   }
        //   axios.post(url, dataBody, headers)
        //   .then(()=> {
        //     alert("Data posted successfully");
        //     this.getData();
        //   })
        //   .catch(()=> {
        //     alert("Failed to post the data!");
        //   })
        // }
    }
}
</script>

<style>
  .small {
      width: 500px;
      height: 100px;
      margin: auto
    }

  .getButton {
  margin: 0;
  position: absolute;
  top: 80%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  }
  

</style>