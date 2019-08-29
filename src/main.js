import Vue from 'vue'
import App from './app.vue'
import './less-test.less'
import './sass-test.scss'

new Vue({
  render: (h) => h(App),
}).$mount('#app')