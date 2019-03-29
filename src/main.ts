import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

var websdk = require('easemob-websdk');
import im from "@/components/WebIM";
let webIM = (<any>window).WebIM = websdk;
Vue.prototype.$WebIM = webIM;
Vue.prototype.$imConn = im.conn();
Vue.prototype.$currentUser = {};


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

