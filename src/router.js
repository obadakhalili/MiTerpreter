import Code from './components/Code.vue';
import Docs from './components/Docs.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes =  [
  {
    path: '/(code)?',
    component: Code
  },
  {
    path: '/docs',
    component: Docs
  }
];

export default new VueRouter({
  mode: 'history',
  routes
});