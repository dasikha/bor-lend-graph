<template>
    <div>
        <b-progress :max="thresholdInfo.threshold_limit" height="2rem">
            <b-progress-bar :value="thresholdCurMax">
              <span>Progress: <strong>{{ value }} / {{ max }}</strong></span>
            </b-progress-bar>
          </b-progress>
          
    </div>
</template>

<script>
    export default {
        name: "ThresholdBar",
        props: {
            thresholdInfo: Object,
        },
        data() {
            console.log(this.thresholdInfo.cur_amt);
            this.thresholdCurMax = (this.thresholdInfo.cur_amt > this.thresholdInfo.threshold_limit)
                ? this.thresholdInfo.threshold_limit : this.thresholdInfo.cur_amt;
            return {
                thresholdCurMax: 0
            }
        },
        created () {
            this.thresholdCurMax = (this.thresholdInfo.cur_amt > this.thresholdInfo.threshold_limit)
                ? this.thresholdInfo.threshold_limit : this.thresholdInfo.cur_amt;
        }
    }
</script>

<style>

</style>