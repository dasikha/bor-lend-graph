import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
//import { LayoutPlugin, TablePlugin, FormPlugin, ButtonPlugin, ModalPlugin, NavbarPlugin } from 'bootstrap-vue';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

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
