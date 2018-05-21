import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DataPemesanList from '@/components/data-pemesan/DataPemesanList'
import DataPemesanTambah from '@/components/data-pemesan/DataPemesanTambah'

Vue.use(Router)

export default new Router({
    mode: 'history',
    linkActiveClass: "active", // active class for non-exact links.
    routes: [{
            path: '/home',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/data-pemesan',
            name: 'DataPemesan',
            component: DataPemesanList,
            // children: [{
			// 	path: '/tambah',
			// 	name: 'DataPemesanTambah',
            //     component: DataPemesanTambah
            // }]
		},
		{
			path: '/data-pemesan/tambah',
			name: 'DataPemesanTambah',
			component: DataPemesanTambah
		}
    ]
})
