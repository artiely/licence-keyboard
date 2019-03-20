import Vue from "vue";
import App from "./App.vue";
import licenceKeyboard from "./package";
Vue.use(licenceKeyboard);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
