import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;


import AntDesign from 'ant-design-vue';
Vue.use(AntDesign);

import 'ant-design-vue/dist/antd.css'; 

new Vue({
  render: h => h(App),
}).$mount('#app')
