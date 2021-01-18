import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuetify from 'vuetify';

//import { LayoutPlugin, TablePlugin, FormPlugin, ButtonPlugin, ModalPlugin, NavbarPlugin } from 'bootstrap-vue';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Import Chartkick and chart.js
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))
Vue.use(Vuetify);

// Vue.use(LayoutPlugin);
// Vue.use(TablePlugin);
// Vue.use(FormPlugin);
// Vue.use(ButtonPlugin);
// Vue.use(ModalPlugin);
// Vue.use(NavbarPlugin);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')

export default new Vuetify({
});
