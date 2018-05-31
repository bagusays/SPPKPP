<template>
	<div>
		<ol class="breadcrumb">
			<li style="font-size: 15px;" class="breadcrumb-item active">{{ page }}</li>
		</ol>
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="card-body">
						<div id="loading-element" v-if="isLoading">
							<img src="../../assets/loader.svg" class="loader" />
						</div>
						<div style="margin-bottom: 20px;" class="float-right">
							<button @click="kalkulasiPrioritas()" class="btn button-action">
								<i class="fa fa-fw fa-signal"> </i>
								<span>Cari Prioritas</span>
							</button>
							<router-link to="/orders/tambah" class="btn button-action">
								<i class="fa fa-fw fa-plus"> </i>
								<span>Tambah</span>
							</router-link>
						</div>
						<div class="col-md-3">
							<input type="text" v-model="search" placeholder="Cari Pemesan..." class="form-control" />
						</div>
						<div class="table-responsive">
							<table class="table table-bordered">
								<thead class="thead">
									<tr>
										<th scope="col" class="align-middle">Nama</th>
										<th scope="col" width="20%" class="align-middle">Jenis Kue</th>
										<th scope="col" width="5%" class="align-middle">Kebawelan Pelanggan</th>
										<th scope="col" width="10%" class="align-middle">Kesulitan Bahan Pokok</th>
										<th scope="col" width="5%" class="align-middle">Jarak Pengiriman</th>
										<th scope="col" class="align-middle">Deadline</th>
										<th scope="col" width="8%" class="align-middle">Tenaga Kerja</th>
										<th scope="col" width="5%" class="align-middle">Total Kuantitas</th>
										<th scope="col" class="align-middle">Action</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="data in listCustomers" :key="data.nama">
										<td class="text-center">{{data.CustomerName}}</td>
										<td class="text-center">{{data.JenisKue}}</td>
										<td class="text-center">{{data.KebawelanPelanggan}}</td>
										<td class="text-center">{{data.KesulitanBahanPokok}}</td>
										<td class="text-center">{{data.JarakPengiriman}}</td>
										<td class="text-center">{{data.DeadlineDate | date}}</td>
										<td class="text-center">{{data.TenagaKerja}}</td>
										<td class="text-center">{{data.TotalQuantity}}</td>
										<td class="text-center">
											<button class="btn btn-sm button-action">
												<i class="fa fa-fw fa-edit"> </i>
											</button>
											<button class="btn btn-sm button-action">
												<i class="fa fa-fw fa-trash"> </i>
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<div v-if="isChartShow" class="card">
					<div class="card-header">
						<span style="font-size: 20px;">Hasil Rating Prioritas</span>
					</div>
					<div class="card-body">
						<div>
							<Chart style="position: relative; height:40%;" v-bind:data=dataChart v-bind:labels=labels></Chart>
						</div>
						<br/>
						<div class="table-responsive">
							<table class="table table-bordered">
								<thead class="thead">
									<tr>
										<th scope="col" width="5%" class="align-middle">No</th>
										<th scope="col" class="align-middle">Nama</th>
										<th scope="col" width="20%" class="align-middle">Jenis Kue</th>
										<th scope="col" width="5%" class="align-middle">Kebawelan Pelanggan</th>
										<th scope="col" width="10%" class="align-middle">Kesulitan Bahan Pokok</th>
										<th scope="col" width="5%" class="align-middle">Jarak Pengiriman</th>
										<th scope="col" class="align-middle">Deadline</th>
										<th scope="col" width="8%" class="align-middle">Tenaga Kerja</th>
										<th scope="col" width="5%" class="align-middle">Total Kuantitas</th>
										<th scope="col" width="7%" class="align-middle">Skor</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(data, index) in listCustomers" :key="data.nama">
										<td class="text-center">{{index + 1}}</td>
										<td class="text-center">{{data.CustomerName}}</td>
										<td class="text-center">{{data.JenisKue}}</td>
										<td class="text-center">{{data.KebawelanPelanggan}}</td>
										<td class="text-center">{{data.KesulitanBahanPokok}}</td>
										<td class="text-center">{{data.JarakPengiriman}}</td>
										<td class="text-center">{{data.DeadlineDate | date}}</td>
										<td class="text-center">{{data.TenagaKerja}}</td>
										<td class="text-center">{{data.TotalQuantity}}</td>
										<td style="color: red; font-weight:bold;" class="text-center">{{data.HasilPerhitunganPrioritas.toFixed(4)}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
 import Chart from '../stuff/Chart'
 import axios from 'axios'
 export default {
	components: {
		'Chart': Chart
	},
	data() {
		return {
			isLoading: false,
			search: '',
			page: 'List Order',
			isChartShow: false,
			dataChart: null,
			labels: null,
			rawlistCustomers: []
		}
	},
	created() {
		this.getAllOrders()
	},
	computed: {
		listCustomers: function() {
			var data = this.rawlistCustomers
			if (this.search == '')
				return data;
			else
				return data.filter((result) => result.nama.toLowerCase().includes(this.search.toLowerCase()))
		}
	},
	methods: {
		async getAllOrders() {
			const res = await axios.get(`${this.$basevar.baseUrl}/orders/getall`)
			this.rawlistCustomers = res.data.result
		},
		kalkulasiPrioritas() {
			const fuzzy = this.rawlistCustomers.map(res => {
				return res.HasilPerhitunganPrioritas
			})
			const nama = this.rawlistCustomers.map(res => {
				return res.CustomerName
			})
			this.dataChart = fuzzy;
			this.labels = nama;
			this.isChartShow = true;
			this.isLoading = false;
			this.$helpers.toast.show("Operation Finished", "check")
		}
	}
}
</script>
