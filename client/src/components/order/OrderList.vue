<template>
<div>
    <Sidebar></Sidebar>
    <div class="content-wrapper">
		<div class="container-fluid">
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
											<th scope="col" width="10%" class="align-middle">Nama</th>
											<th scope="col" width="20%" class="align-middle">Jenis Kue</th>
											<th scope="col" width="5%" class="align-middle">Kebawelan Pelanggan</th>
											<th scope="col" width="10%" class="align-middle">Kesulitan Bahan Pokok</th>
											<th scope="col" width="5%" class="align-middle">Jarak Pengiriman</th>
											<th scope="col" width="15%" class="align-middle">Deadline</th>
											<th scope="col" width="8%" class="align-middle">Tenaga Kerja</th>
											<th scope="col" width="5%" class="align-middle">Total Kuantitas</th>
											<th scope="col" width="10%" class="align-middle">Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="data in listCustomers" :key="data.Id">
											<td class="text-center">{{data.CustomerName}}</td>
											<td class="text-center">{{data.JenisKue}}</td>
											<td class="text-center">{{data.KebawelanPelanggan}}</td>
											<td class="text-center">{{data.KesulitanBahanPokok}}</td>
											<td class="text-center">{{data.JarakPengiriman}}</td>
											<td class="text-center">{{data.DeadlineDate | date}} <br> ({{data.IntervalDeadlineHari}} days remaining)</td>
											<td class="text-center">{{data.TenagaKerja}}</td>
											<td class="text-center">{{data.TotalQuantity}}</td>
											<td class="text-center">
												<router-link :to="'/orders/edit/' + data.IdOrder">
													<button class="btn btn-sm button-action">
														<i class="fa fa-fw fa-edit"></i>
													</button>
												</router-link>
												<button @click="onDelete(data.IdOrder)" class="btn btn-sm button-action">
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
										<tr v-for="(data, index) in listCustomers" :key="data.Id">
											<td class="text-center">{{index + 1}}</td>
											<td class="text-center">{{data.CustomerName}}</td>
											<td class="text-center">{{data.JenisKue}}</td>
											<td class="text-center">{{data.KebawelanPelanggan}}</td>
											<td class="text-center">{{data.KesulitanBahanPokok}}</td>
											<td class="text-center">{{data.JarakPengiriman}}</td>
											<td class="text-center">{{data.DeadlineDate | date}} <br> ({{data.IntervalDeadlineHari}} days remaining)</td>
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
    </div>
</div>
</template>

<script>
 import Chart from '../stuff/Chart'
 import Sidebar from '../layout/Sidebar.vue'

 export default {
	components: {
		'Chart': Chart,
		'Sidebar': Sidebar
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
			const res = await this.$helpers.axiosAuth.get('/orders/getall')
			this.rawlistCustomers = res.data.result
		},

		async onDelete(IdOrder) {
			const confirm = await this.$helpers.alert.delete()
            if (!confirm.value)
                return false

            const res = await this.$helpers.axiosAuth.post(`/orders/delete`, {IdOrder})
            if(res.status == 200) {
                await this.$helpers.alert.success(res.data.message)
                this.getAllOrders()
            } else
                this.$helpers.alert.error(res.data.message)
		},
		
		kalkulasiPrioritas() {
			this.dataChart = this.rawlistCustomers.map(res => res.HasilPerhitunganPrioritas)
			this.labels = this.rawlistCustomers.map(res => res.CustomerName)
			this.isChartShow = true;
			this.isLoading = false;
			this.$helpers.toast.show("Operation Finished", "check")
		}
	}
}
</script>
