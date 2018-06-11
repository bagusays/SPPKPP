<template>
<div>
	<b-navbar class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
		<a class="navbar-brand" href="index.html"> SPPK-PP</a>
		<b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
		<b-collapse is-nav id="nav_dropdown_collapse" class="collapse navbar-collapse">
			<b-navbar-nav class="navbar-sidenav" id="exampleAccordion">
				<router-link class="nav-link" v-for="item in items" :key="item.title" active-class="active" v-bind:to="item.link">
					<b-nav-item class="nav-item" @click="routerLink(item.link)">
						<i class="fa fa-fw" v-bind:class="item.icon"></i>
						<span class="nav-link-text"> {{item.title}} </span>
					</b-nav-item>
				</router-link>
			</b-navbar-nav>
		</b-collapse>
		<b-navbar-nav class="ml-auto">
			<b-nav-item-dropdown class="bg-dark" right>
				<!-- Using button-content slot -->
				<template slot="button-content">
					<strong style="color: whitesmoke">Admin</strong>
				</template>
				<b-dropdown-item @click="logout()">Signout</b-dropdown-item>
			</b-nav-item-dropdown>
		</b-navbar-nav>
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
						link: '/kriteria'
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
					}
				]
			}
		},
		methods: {
			routerLink(val) {
				this.$router.push({ path: val })
				return 'active'
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
