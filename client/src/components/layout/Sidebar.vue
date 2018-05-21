<template>
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
</b-navbar>
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
						title: ' Data Pemesan',
						icon: 'fa-table',
						link: '/data-pemesan'
					}
				]
			}
		},
		methods: {
			routerLink(val) {
				this.$router.push({ path: val })
				return 'active'
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
