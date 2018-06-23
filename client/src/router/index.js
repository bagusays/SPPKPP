import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import HelloWorld from '@/components/HelloWorld'

import Login from '@/components/login/Login'

import About from '@/components/About'

import OrderList from '@/components/order/OrderList'
import OrderTambah from '@/components/order/OrderTambah'
import OrderEdit from '@/components/order/OrderEdit'

import CustomerList from '@/components/customer/CustomerList'
import CustomerTambah from '@/components/customer/CustomerTambah'
import CustomerEdit from '@/components/customer/CustomerEdit'

import MasterList from '@/components/kriteria/master/MasterList'
import MasterEdit from '@/components/kriteria/master/MasterEdit'

import JenisKueList from '@/components/kriteria/jeniskue/JenisKueList'
import JenisKueTambah from '@/components/kriteria/jeniskue/JenisKueTambah'
import JenisKueEdit from '@/components/kriteria/jeniskue/JenisKueEdit'

import FuzzyTambah from '@/components/kriteria/jeniskue/fuzzy/FuzzyTambah'
import FuzzyEdit from '@/components/kriteria/jeniskue/fuzzy/FuzzyEdit'

import KebawelanPelangganList from '@/components/kriteria/kebawelanpelanggan/KebawelanPelangganList'
import KebawelanPelangganTambah from '@/components/kriteria/kebawelanpelanggan/KebawelanPelangganTambah'
import KebawelanPelangganEdit from '@/components/kriteria/kebawelanpelanggan/KebawelanPelangganEdit'

import KesulitanBahanPokokList from '@/components/kriteria/kesulitanbahanpokok/KesulitanBahanPokokList'
import KesulitanBahanPokokTambah from '@/components/kriteria/kesulitanbahanpokok/KesulitanBahanPokokTambah'
import KesulitanBahanPokokEdit from '@/components/kriteria/kesulitanbahanpokok/KesulitanBahanPokokEdit'

import JarakPengirimanList from '@/components/kriteria/jarakpengiriman/JarakPengirimanList'
import JarakPengirimanTambah from '@/components/kriteria/jarakpengiriman/JarakPengirimanTambah'
import JarakPengirimanEdit from '@/components/kriteria/jarakpengiriman/JarakPengirimanEdit'

import DeadlineHariList from '@/components/kriteria/deadlinehari/DeadlineHariList'
import DeadlineHariEdit from '@/components/kriteria/deadlinehari/DeadlineHariEdit'
import DeadlineHariTambah from '@/components/kriteria/deadlinehari/DeadlineHariTambah'

import TenagaKerjaList from '@/components/kriteria/tenagakerja/TenagaKerjaList'
import TenagaKerjaTambah from '@/components/kriteria/tenagakerja/TenagaKerjaTambah'
import TenagaKerjaEdit from '@/components/kriteria/tenagakerja/TenagaKerjaEdit'

import KuantitasPesananList from '@/components/kriteria/kuantitaspesanan/KuantitasPesananList'
import KuantitasPesananTambah from '@/components/kriteria/kuantitaspesanan/KuantitasPesananTambah'
import KuantitasPesananEdit from '@/components/kriteria/kuantitaspesanan/KuantitasPesananEdit'

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/login', props: true, meta: { requireGuest: true }},
        
        { path: '/login', component: Login, props: true, meta: { requireGuest: true }},
        { path: '/home', component: HelloWorld, meta: { requireLogin: true }},

        { path: '/about', component: About, meta: { requireLogin: true }},

        { path: '/orders', component: OrderList, meta: { requireLogin: true } },
        { path: '/orders/tambah', component: OrderTambah, meta: { requireLogin: true } },
        { path: '/orders/edit/:id', component: OrderEdit, meta: { requireLogin: true } },
        
        { path: '/customers', component: CustomerList, meta: { requireLogin: true } },
        { path: '/customers/tambah', component: CustomerTambah, meta: { requireLogin: true } },
        { path: '/customers/edit/:id', component: CustomerEdit, meta: { requireLogin: true } },

        { path: '/kriteria/master', component: MasterList, meta: { requireLogin: true } },
        { path: '/kriteria/master/edit/:id', component: MasterEdit, meta: { requireLogin: true } },

        { path: '/kriteria/jeniskue', component: JenisKueList, meta: { requireLogin: true } },
        { path: '/kriteria/jenisKue/tambah', component: JenisKueTambah, meta: { requireLogin: true } },
        { path: '/kriteria/jeniskue/edit/:id', component: JenisKueEdit, meta: { requireLogin: true } },

        { path: '/kriteria/jeniskue/fuzzy/edit/:id', component: FuzzyEdit, meta: { requireLogin: true } },
        { path: '/kriteria/jeniskue/fuzzy/tambah', component: FuzzyTambah, meta: { requireLogin: true } },
        
        { path: '/kriteria/kebawelanpelanggan', component: KebawelanPelangganList, meta: { requireLogin: true } },
        { path: '/kriteria/kebawelanpelanggan/tambah', component: KebawelanPelangganTambah, meta: { requireLogin: true } },
        { path: '/kriteria/kebawelanpelanggan/edit/:id', component: KebawelanPelangganEdit, meta: { requireLogin: true } },
        
        { path: '/kriteria/kesulitanbahanpokok', component: KesulitanBahanPokokList, meta: { requireLogin: true } },
        { path: '/kriteria/kesulitanbahanpokok/tambah', component: KesulitanBahanPokokTambah, meta: { requireLogin: true } },
        { path: '/kriteria/kesulitanbahanpokok/edit/:id', component: KesulitanBahanPokokEdit, meta: { requireLogin: true } },
        
        { path: '/kriteria/jarakpengiriman', component: JarakPengirimanList, meta: { requireLogin: true } },
        { path: '/kriteria/jarakpengiriman/tambah', component: JarakPengirimanTambah, meta: { requireLogin: true } },
        { path: '/kriteria/jarakpengiriman/edit/:id', component: JarakPengirimanEdit, meta: { requireLogin: true } },
        
        { path: '/kriteria/deadlinehari', component: DeadlineHariList, meta: { requireLogin: true } },
        { path: '/kriteria/deadlinehari/tambah', component: DeadlineHariTambah, meta: { requireLogin: true } },
        { path: '/kriteria/deadlinehari/edit/:id', component: DeadlineHariEdit, meta: { requireLogin: true } },
        
        { path: '/kriteria/tenagakerja', component: TenagaKerjaList, meta: { requireLogin: true } },
        { path: '/kriteria/tenagakerja/tambah', component: TenagaKerjaTambah, meta: { requireLogin: true } },
        { path: '/kriteria/tenagakerja/edit/:id', component: TenagaKerjaEdit, meta: { requireLogin: true } },
        
        { path: '/kriteria/kuantitaspesanan', component: KuantitasPesananList, meta: { requireLogin: true } },
        { path: '/kriteria/kuantitaspesanan/tambah', component: KuantitasPesananTambah, meta: { requireLogin: true } },
        { path: '/kriteria/kuantitaspesanan/edit/:id', component: KuantitasPesananEdit, meta: { requireLogin: true } },


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