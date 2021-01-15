<template>
<div class="small">
    
    <form class="col s12">
      <div class="row">
        
        <div class="input-field col s3">
          <input id="temp" type="text" class="validate" ref='temp'>
          <label for="amount">Amount</label>
        </div>

        <div class="input-field col s3">
          <input id="hum" type="text" class="validate" ref='hum'>
          <label for="date">Date</label>
        </div>
        
        <div class='col s3'>
          <div class="row">

            <!-- Get button -->
            <b-button class="getButton" btn-small teal
            @click="getFavoriot()"
            >
              <i class="material-icons">Get data</i>
            </b-button>

            <b-button class="getButton" btn-small pink
            @click="postFavoriot()"
            >
              <i class="material-icons">Post Data</i>
            </b-button>
          </div>
        </div>

      </div>
    </form>

    <LineChart
        :chart-data="datacollection"
    ></LineChart>
  
  </div>

</template>


<script>
import LineChart from './LineChart.js'
// npm i axios
// import axios from 'axios'

export default {
    components: {
        LineChart
    },
    data() {
        return {
            datacollection: null,
            loaded: false,
            temperature: [0,1,2,3,4,5,6,7,8,9],
            humidity: [9,8,7,6,5,4,3,2,1,0],
            time: [0,1,2,3,4,5,6,7,8,9]
        }
    },
    mounted() {
        this.fillData()

    },
    methods: {
        fillData() {
            this.datacollection = {
              labels: this.time,
                // labels: [0,1,2,3,4,5,6,7,8,9],
                datasets: [
                    {
                        label: 'Temp',
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        borderColor: 'lightblue',
                        pointBackgroundColor: 'red',
                        borderWidth: 1,
                        pointBorderColor: 'red',
                        data: this.temperature

                    },
                    {
                        label: 'Hum',
                        backgroundColor: 'rgba(0, 0, 255, 0.2)',
                        borderColor: 'lightblue',
                        pointBackgroundColor: 'blue',
                        borderWidth: 1,
                        pointBorderColor: 'blue',
                        data: this.humidity

                    }
                ]
            }
            // get Data

        }
    }
}
</script>

<style>
  .small {
      width: 500px;
      height: 100px;
      margin: auto
    }

</style>