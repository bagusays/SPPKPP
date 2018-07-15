<template>
<div>
    <Sidebar></Sidebar>
    <div class="content-wrapper">
        <div class="container-fluid">
            <ol class="breadcrumb">
                <li style="font-size: 15px;" class="breadcrumb-item active">About</li>
            </ol>
            
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <!-- <div class="card-header">About</div> -->
                        <div class="card-body">
                            <h2 style="text-align: center; font-weight: bold">Santhi's Cook and Catering</h2>
							<br>
							<img src="../assets/logo.png" width="400px" height="auto" style="display:block; margin: 0 auto"/><br>
							<br>
							<p style="text-align:center">
								<strong>Sistem Pendukung Pengambilan Keputusan - Prioritas Pesanan Customer</strong><br><br>
								<strong>Santhi's Cook and Catering</strong><br>
								<strong>Telephone</strong> +6285311474050<br>
								<strong>Address</strong> Jl. Dewata Bukit Duri, Tebet, Jakarta Selatan, Indonesia <br>
								<strong>Owner</strong> Ida Nursanthi
							</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Sidebar from './layout/Sidebar.vue'

export default {
	name: 'HelloWorld',
	components: {
		'Sidebar': Sidebar
	},
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  	font-weight: normal;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
  	color: #42b983;
}
</style>
