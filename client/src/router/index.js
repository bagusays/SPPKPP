import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import OrderList from '@/components/order/OrderList'
import OrderTambah from '@/components/order/OrderTambah'

import CustomerList from '@/components/customer/CustomerList'
import CustomerTambah from '@/components/customer/CustomerTambah'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/home', component: HelloWorld },

        { path: '/orders', component: OrderList },
        { path: '/orders/tambah', component: OrderTambah },
        
        { path: '/customers', component: CustomerList },
		{ path: '/customers/tambah', component: CustomerTambah }
    ]
})
