import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import OrderList from '@/components/order/OrderList'
import OrderTambah from '@/components/order/OrderTambah'
import OrderEdit from '@/components/order/OrderEdit'

import CustomerList from '@/components/customer/CustomerList'
import CustomerTambah from '@/components/customer/CustomerTambah'
import CustomerEdit from '@/components/customer/CustomerEdit'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/home', component: HelloWorld },

        { path: '/orders', component: OrderList },
        { path: '/orders/tambah', component: OrderTambah },
        { path: '/orders/edit/:id', component: OrderEdit },
        
        { path: '/customers', component: CustomerList },
        { path: '/customers/tambah', component: CustomerTambah },
        { path: '/customers/edit/:id', component: CustomerEdit }
    ]
})
