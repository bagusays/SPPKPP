import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import HelloWorld from '@/components/HelloWorld'

import Login from '@/components/login/Login'

import OrderList from '@/components/order/OrderList'
import OrderTambah from '@/components/order/OrderTambah'
import OrderEdit from '@/components/order/OrderEdit'

import CustomerList from '@/components/customer/CustomerList'
import CustomerTambah from '@/components/customer/CustomerTambah'
import CustomerEdit from '@/components/customer/CustomerEdit'

import KriteriaList from '@/components/kriteria/KriteriaList'

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/login', props: true, meta: { requireGuest: true }},
        
        { path: '/login', component: Login, props: true, meta: { requireGuest: true }},
        { path: '/home', component: HelloWorld, meta: { requireLogin: true }},

        { path: '/orders', component: OrderList, meta: { requireLogin: true } },
        { path: '/orders/tambah', component: OrderTambah, meta: { requireLogin: true } },
        { path: '/orders/edit/:id', component: OrderEdit, meta: { requireLogin: true } },
        
        { path: '/customers', component: CustomerList, meta: { requireLogin: true } },
        { path: '/customers/tambah', component: CustomerTambah, meta: { requireLogin: true } },
        { path: '/customers/edit/:id', component: CustomerEdit, meta: { requireLogin: true } },

        { path: '/kriteria', component: KriteriaList, meta: { requireLogin: true } },

        { path: '**', redirect: '/home', meta: { requireLogin: true } },
    ]
})

router.beforeEach((to, from, next) => {
    to.matched.some(async res => {
        if(res.meta.requireLogin){
            const token = localStorage.getItem('token')
            if(token == null) {
                next({path: '/login', query: { error: 'Silahkan login terlebih dahulu.' }})
                return false
            } else {
                const token = localStorage.getItem('token')
                const check = await axios.post('http://localhost:3000/auth/verifyToken', JSON.parse(token))
                console.log(check)
                if(check.status == 200)
                    next()
                else
                    next({path: '/login', params: { error: check.message }})
            }
        }

        if(res.meta.requireGuest) {
            const token = localStorage.getItem('token')
            if(token != null)
                next('/home')
            next()
        }
    })
    next()
})

Vue.use(Router)

export default router