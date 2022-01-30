import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";
Vue.config.productionTip = false;

/**filter for converting epoch date to
 * 'HH:mm:ss' format using moment
 */
Vue.filter("countDown", function (value, flag) {
  /**if we do not have the flag for column
   * or the value is not number just come back the value
   */
  if (!flag || typeof value !== "number") return value;
  if (!value) return "";
  return moment.utc(value * 1000).format("HH:mm:ss");
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
