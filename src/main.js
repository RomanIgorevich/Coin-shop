import Vue from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./vuex/store";

import "./assets/styles/styles.scss";
import "material-design-icons-iconfont";

Vue.config.productionTip = false;

Vue.filter("OkryglenieDoDvyxZnakovPosleZapjatoi", (value) => {
  return value.toFixed(2);
});
Vue.filter("ZnakRyblja", (value) => {
  return value + " ₽";
});
Vue.filter("DopisyemSht", (value) => {
  return value + " шт.";
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
