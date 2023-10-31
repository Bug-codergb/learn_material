import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import { MyPlugin} from "./plugin/track";
import router from "./router/index";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
console.log(router)
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(MyPlugin);
Vue.use(VueRouter)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

