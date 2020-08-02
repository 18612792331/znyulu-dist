import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import httpInterceptor from '@/common/http.interceptor.js';
import VueClipboard from 'vue-clipboard2';

Vue.use(uView);
Vue.use(VueClipboard);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})

// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)
app.$mount()
