<template>
    <div class="summary">
        <b-progress v-if="thresholdInfo" max="thresholdInfo.threshold_limit" height="2rem">
            <b-progress-bar :value="value" >
            <span>Progress: <strong>{{ value }} / {{ thresholdInfo.threshold_limit }} </strong></span>
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
        computed: {
            // max: function() {
            //     return this.$props.thresholdInfo.threshold_limit;
            // },
            value: function() {
                return (this.thresholdInfo.cur_amt > this.thresholdInfo.threshold_limit)
                ? this.thresholdInfo.threshold_limit : this.thresholdInfo.cur_amt;
            }
        }        
    }
</script>

<style>
.summary {
    width: 60%;
    margin: 10px 0 20px 25px;
}
</style>