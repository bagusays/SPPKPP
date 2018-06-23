<template>
<div>
	<b-navbar class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
		<a class="navbar-brand" href="index.html"> SPPK-PP</a>
		<b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
		<b-collapse is-nav id="nav_dropdown_collapse" class="collapse navbar-collapse">
			<b-navbar-nav class="navbar-sidenav" id="exampleAccordion">

				<li class="nav-link" v-for="item in items" :key="item.title" :class="urlActive(item.link) ? 'link-active' : ''">
				<b-nav-item v-b-toggle.collapse1 class="nav-item" @click="routerLink(item.link, item.children)">
					<i class="fa fa-fw" v-bind:class="item.icon"></i>
					<span class="nav-link-text"> {{item.title}} </span>
					<b-collapse :visible="urlActive(item.link) ? true : false" id="collapse1">
						<li class="sidebar-children" v-for="children in item.children" :key="children.title" :class="children.link == url ? 'link-active' : ''">
							<router-link v-bind:to="children.link">
								<b-nav-item class="nav-item" @click="routerLink(children.link)">
									<!-- <a :href="children.link">{{children.title}}</a> -->
									<i class="fa fa-fw" v-bind:class="children.icon"></i>
									<span class="nav-link-text"> {{children.title}} </span>
								</b-nav-item>
							</router-link>
						</li>
					</b-collapse>
				</b-nav-item>
				</li>			

				<li class="nav-link">
				<b-nav-item v-b-toggle.collapse1 class="nav-item" @click="logout()">
					<i class="fa fa-fw fa-sign-out"></i>
					<span class="nav-link-text"> Sign out </span>
				</b-nav-item>
				</li>			
				
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
	<footer class="sticky-footer">
		<div class="container">
			<div class="text-center">
				<small>Copyright © Bagus 2018</small>
			</div>
		</div>
	</footer>
</div>
</template>

<script>
	export default {
		data() {
			return {
				url: window.location.pathname,
				items: [{
						title: ' Home',
						icon: 'fa-dashboard',
						link: '/home'
					},
					{
						title: ' Kriteria',
						icon: 'fa-wrench',
						link: '/kriteria',
						children: [
							{title: "Master", link: '/kriteria/master', icon: 'fa-globe'},
							{title: "Jenis Kue", link: '/kriteria/jeniskue', icon: 'fa-cutlery'},
							{title: "Kebawelan Pelanggan", link: '/kriteria/kebawelanpelanggan', icon: 'fa-commenting-o'},
							{title: "Kesulitan Bahan Pokok", link: '/kriteria/kesulitanbahanpokok', icon: 'fa-inbox'},
							{title: "Jarak Pengiriman", link: '/kriteria/jarakpengiriman', icon: 'fa-location-arrow'},
							{title: "Deadline Hari", link: '/kriteria/deadlinehari', icon: 'fa-clock-o'},
							{title: "Tenaga Kerja", link: '/kriteria/tenagakerja', icon: 'fa-users'},
							{title: "Kuantitas Pesanan", link: '/kriteria/kuantitaspesanan', icon: 'fa-cubes'},
						]
					},
					{
						title: ' Orders',
						icon: 'fa-table',
						link: '/orders'
					},
					{
						title: ' Customers',
						icon: 'fa-user',
						link: '/customers'
					},
					{
						title: ' About',
						icon: 'fa-heart',
						link: '/about'
					}
				],
				url: window.location.pathname,
			}
		},

		methods: {
			routerLink(val, children) {
				if(children == null)
					this.$router.push({ path: val })
				else
					this.showChildren = true
			},

			urlActive(link) {
				return window.location.pathname.includes(link)
			},

			logout() {
				localStorage.removeItem('token')
				this.$router.push({ path: '/login' })
			}
		}
	}

</script>

<style scoped>
	.active {
		background: rgb(72, 81, 89);
		color: whitesmoke !important;
	}

	.navbar-nav {
		background-color: rgb(52, 62, 72) !important;
	}

	.active {
		background-color: #485159
	}
	
	.navbar-sidenav {
		width: 250px
	}

</style>
