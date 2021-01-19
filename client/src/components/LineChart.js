//npm i vue-chartjs chart.js
// install chart.js and vue-chartjs

// import Line and mixins from vue-chartjs
// https://vue-chartjs.org/guide/#example

import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    extends: Line,
    mixins: [reactiveProp], // provide a live update if datasets been changed
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
    // mounted() is most often used to send an HTTP request to fetch data that the component will then render.
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}
