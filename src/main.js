// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './styles/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import primaryBtn from './components/primaryBtn'
import textBtn from './components/textBtn'
// import './mock'
import api from './api'
import untils from './untils'
import vali from './untils/vali'
import dicData from './untils/dic'

Vue.component('priBtn', primaryBtn)
Vue.component('textBtn', textBtn)
Vue.config.productionTip = false
Vue.prototype.dicData = dicData
Vue.prototype.api = api
Vue.prototype.vali = vali
Vue.prototype.untils = untils
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
