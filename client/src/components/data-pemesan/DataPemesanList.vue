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
							<router-link to="/data-pemesan/tambah" class="btn button-action">
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
										<th scope="col" width="5%" class="align-middle">Tenaga Kerja</th>
										<th scope="col" width="5%" class="align-middle">Total Kuantitas</th>
										<th scope="col" class="align-middle">Action</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="data in listCustomers" :key="data.nama">
										<td class="text-center">{{data.nama}}</td>
										<td class="text-center">{{data.jenisKue}}</td>
										<td class="text-center">{{data.kebawelanPelanggan}}</td>
										<td class="text-center">{{data.kesulitanBahanPokok}}</td>
										<td class="text-center">{{data.jarakPengiriman}}</td>
										<td class="text-center">{{data.deadline}}</td>
										<td class="text-center">{{data.tenagaKerja}}</td>
										<td class="text-center">{{data.totalKuantitas}}</td>
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
										<th scope="col" width="5%" class="align-middle">Tenaga Kerja</th>
										<th scope="col" width="5%" class="align-middle">Total Kuantitas</th>
										<th scope="col" width="5%" class="align-middle">Skor</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(data, index) in listCustomers" :key="data.nama">
										<td class="text-center">{{index + 1}}</td>
										<td class="text-center">{{data.nama}}</td>
										<td class="text-center">{{data.jenisKue}}</td>
										<td class="text-center">{{data.kebawelanPelanggan}}</td>
										<td class="text-center">{{data.kesulitanBahanPokok}}</td>
										<td class="text-center">{{data.jarakPengiriman}}</td>
										<td class="text-center">{{data.deadline}}</td>
										<td class="text-center">{{data.tenagaKerja}}</td>
										<td class="text-center">{{data.totalKuantitas}} </td>
										<td style="color: red; font-weight:bold;" class="text-center">0.9938</td>
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
 export default {
	components: {
		'Chart': Chart
	},
	data() {
		return {
			isLoading: false,
			search: '',
			page: 'Data Pemesan',
			isChartShow: false,
			dataChart: null,
			labels: null,
			rawlistCustomers: [{
					nama: 'Budi',
					jenisKue: 'Nastar, Kastengel',
					kebawelanPelanggan: 'Sedang',
					kesulitanBahanPokok: 'Sedang',
					jarakPengiriman: 'Sedang',
					deadline: '10-Jun-2018',
					tenagaKerja: '1',
					totalKuantitas: '20'
				},
				{
					nama: 'Joko',
					jenisKue: 'Nastar, Putri Salju',
					kebawelanPelanggan: 'Sedang',
					kesulitanBahanPokok: 'Sedang',
					jarakPengiriman: 'Sedang',
					deadline: '10-Jun-2018',
					tenagaKerja: '1',
					totalKuantitas: '10'
				},
				{
					nama: 'Anwar',
					jenisKue: 'Nastar, Chocochips, Kastengel, Putri Salju',
					kebawelanPelanggan: 'Sedang',
					kesulitanBahanPokok: 'Sedang',
					jarakPengiriman: 'Sedang',
					deadline: '10-Jun-2018',
					tenagaKerja: '1',
					totalKuantitas: '30'
				},
				{
					nama: 'Susi',
					jenisKue: 'Nastar',
					kebawelanPelanggan: 'Sedang',
					kesulitanBahanPokok: 'Sedang',
					jarakPengiriman: 'Sedang',
					deadline: '10-Jun-2018',
					tenagaKerja: '1',
					totalKuantitas: '10'
				},
				{
					nama: 'Adi',
					jenisKue: 'Nastar, Kastengel, Sagu Keju',
					kebawelanPelanggan: 'Sedang',
					kesulitanBahanPokok: 'Sedang',
					jarakPengiriman: 'Sedang',
					deadline: '10-Jun-2018',
					tenagaKerja: '1',
					totalKuantitas: '30'
				}
			]
		}
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
		kalkulasiPrioritas() {
			this.dataChart = [40, 20, 12, 39, 10, 40];
			this.labels = ['January', 'February', 'March', 'April', 'May', 'June'];
			this.isChartShow = true;
			this.isLoading = false;
			this.$helpers.toast.show("Operation Finished", "check")
		}
	}
}
</script>
