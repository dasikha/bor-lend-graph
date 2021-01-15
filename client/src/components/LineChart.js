//npm i vue-chartjs chart.js


import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    extends: Line,
    mixins: [reactiveProp],
    props: {
        chartData: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}


    // import { Line, mixins } from 'vue-chartjs'
    // const { reactiveProp } = mixins

    // export default {  //extending the base chart class as mentioned above
    //     extend: Line,
    //     mixins: [reactiveProp],
    //     data () {
    //     return {
    //         options: { //Chart.js options
    //         scales: {
    //             yAxes: [{
    //             ticks: {
    //                 beginAtZero: true
    //             },
    //             gridLines: {
    //                 display: true
    //             }
    //             }],
    //             xAxes: [ {
    //             gridLines: {
    //                 display: false
    //             }
    //             }]
    //         },
    //         legend: {
    //             display: true
    //         },
    //         responsive: true,
    //         maintainAspectRatio: false
    //         }
    //     }
    //     },
    //     mounted () {
    //     // this.chartData is created in the mixin
    //     this.renderChart(this.chartData, this.options)
    //     }
    // }
