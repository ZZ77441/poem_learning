import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css';
import axios from 'axios'
import request from './utils/request';
var echarts = require('echarts');

//今日诗词接口
const jinrishici = require('jinrishici');
// jinrishici.load(result => {
//   console.log(result);
// });


Vue.config.productionTip = false;
//引入elementui
Vue.use(ElementUI);
//引入echarts图表
Vue.prototype.$echarts = echarts;
//引入axios
Vue.prototype.$axios = axios;
//自定义axios
Vue.prototype.request = request;
//今日诗词接口
Vue.prototype.jinrishici = jinrishici;

//注册全局组件
import TopNav from "@/components/TopNav.vue";
import PoemCard from '@/components/PoemCard.vue';
import Aside from '@/components/Aside.vue'
Vue.component("top-nav", TopNav);
Vue.component("poem-card", PoemCard);
Vue.component("a-side", Aside);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
