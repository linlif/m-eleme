// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

import './common/stylus/index.styl';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    linkActiveClass: 'active', // 配置激活时候的类名
    routes: [
      {path: '/goods', component: goods},
      {path: '/ratings', component: ratings},
      {path: '/seller', component: seller}
    ]
  }
);

new Vue({
  // el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
}).$mount('#app');

// 指定默认的跳转路由
// router.push('goods');

