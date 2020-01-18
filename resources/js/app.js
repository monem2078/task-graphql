/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
require('./bootstrap');

window.Vue = require('vue');

Vue.component('main-app', require('./components/main-app.vue').default);
Vue.component('products', require('./components/products.vue').default);
Vue.component('buyers', require('./components/buyers.vue').default);
Vue.component('orders', require('./components/orders.vue').default);
Vue.component('order', require('./components/order.vue').default);

import ApolloClient from "apollo-boost"
import VueApollo from "vue-apollo"

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: "/graphql"
  })
});

Vue.use(VueApollo);

import VueRouter from 'vue-router'
import products from './components/products'
import buyers from './components/buyers'
import orders from './components/orders'
import order from './components/order'
Vue.use(VueRouter)



const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'products',
            component: products
        },
        {
            path: '/buyers',
            name: 'buyers',
            component: buyers
        },
        {
            path: '/orders',
            name: 'orders',
            component: orders,
        },
        {
            path: '/buyer/orders/:id',
            name: 'user-order',
            component: order,
        },
    ],
});

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    apolloProvider,
});
