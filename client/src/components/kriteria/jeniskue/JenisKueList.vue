<template>
<div>
    <Sidebar></Sidebar>
    <div class="content-wrapper">
        <div class="container-fluid">
            <ol class="breadcrumb">
                <li style="font-size: 15px;" class="breadcrumb-item active">Kriteria Jenis Kue</li>
            </ol>

            <b-alert show variant="info" v-if="checkBobot">
                <strong>Perhatian!</strong><br>
                <span>
                    Jika ingin mengubah kriteria, total bobot jenis kue harus sama dengan total bobot fuzzy sebelum menggunakan pencarian prioritas.
                </span>
            </b-alert>

            <b-alert show variant="danger" v-if="!checkBobot">
                <strong>Perhatian!</strong><br>
                <span>
                    Total bobot jenis kue dan bobot fuzzy belum sama, silahkan ubah kriteria sebelum menggunakan fitur pencarian prioritas!
                </span>
            </b-alert>
            
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <span class="center">Jenis Kue</span>
                            <div class="float-right">
								<router-link to="/kriteria/jeniskue/tambah" class="btn btn-sm button-action btn-tambah">
									<i class="fa fa-fw fa-plus"></i>
                                    <span>Tambah</span>
								</router-link>
							</div>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead class="thead">
                                        <tr>
                                            <th scope="col" width="20%" class="align-middle">Nama Kriteria</th>
                                            <th scope="col" width="20%" class="align-middle">Bobot</th>
                                            <th scope="col" width="15%" class="align-middle">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="data in data.jenisKue" :key="data.Id">
                                            <td class="text-center">{{data.CriteriaName}}</td>
                                            <td class="text-center">{{data.CriteriaValue}}</td>
                                            <td class="text-center">
                                                <router-link :to="'/kriteria/jeniskue/edit/' + data.Id">
                                                    <button class="btn btn-sm button-action">
                                                        <i class="fa fa-fw fa-edit"></i>
                                                    </button>
                                                </router-link>
                                                
                                                <button @click="onDeleteJenisKue(data.Id)" class="btn btn-sm button-action">
                                                    <i class="fa fa-fw fa-trash"> </i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <span>(<span style="color:red">*</span>) Total bobot jenis kue : <span :style="!checkBobot ? {color: 'red', fontWeight: 'bold'} : 'null'">{{data.totalBobotJenisKue}}</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <span class="center">Fuzzy Jenis Kue</span>
                            <div class="float-right">
								<router-link to="/kriteria/jeniskue/fuzzy/tambah" class="btn btn-sm button-action btn-tambah">
									<i class="fa fa-fw fa-plus"></i>
                                    <span>Tambah</span>
								</router-link>
							</div>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead class="thead">
                                        <tr>
                                            <th scope="col" width="20%" class="align-middle">Nama Kriteria</th>
                                            <th scope="col" width="20%" class="align-middle">Bobot</th>
                                            <th scope="col" width="15%" class="align-middle">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="data in data.fuzzy" :key="data.Id">
                                            <td class="text-center">{{data.CriteriaName}}</td>
                                            <td class="text-center">{{data.CriteriaValue}}</td>
                                            <td class="text-center">
                                                <router-link :to="'/kriteria/jeniskue/fuzzy/edit/' + data.Id">
                                                    <button class="btn btn-sm button-action">
                                                        <i class="fa fa-fw fa-edit"></i>
                                                    </button>
                                                </router-link>
                                                
                                                <button @click="onDeleteFuzzyKue(data.Id)" class="btn btn-sm button-action">
                                                    <i class="fa fa-fw fa-trash"> </i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <span>(<span style="color:red">*</span>) Total bobot fuzzy : <span :style="!checkBobot ? {color: 'red', fontWeight: 'bold'} : 'null'">{{data.totalBobotFuzzy}}</span></span>
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
import Sidebar from '../../layout/Sidebar.vue'

export default {
    components: {
        'Sidebar': Sidebar
    },

    data() {
        return {
            form: {
                kriteria: ''
            },
            data: []
        }
    },

    created() {
        this.getList()
    },

    computed: {
        checkBobot() {
            return this.data.totalBobotJenisKue == this.data.totalBobotFuzzy
        }
    },

    methods: {

        async getList() {
            const result = await this.$helpers.axiosAuth.get(`/kriteria/jeniskue/list`);
            console.log(result.data)
            this.data = result.data.result;
        },

        async onDeleteJenisKue(Id) {
            const confirm = await this.$helpers.alert.delete()
            if (!confirm.value)
                return false

            const res = await this.$helpers.axiosAuth.post(`/kriteria/jeniskue/delete`, {Id})
            if(res.status == 200) {
                await this.$helpers.alert.success(res.data.message)
                this.getList()
            } else
                this.$helpers.alert.error(res.data.message)
        },

        async onDeleteFuzzyKue(Id) {
            const confirm = await this.$helpers.alert.delete()
            if (!confirm.value)
                return false

            const res = await this.$helpers.axiosAuth.post(`/kriteria/jeniskue/fuzzy/delete`, {Id})
            if(res.status == 200) {
                await this.$helpers.alert.success(res.data.message)
                this.getList()
            } else
                this.$helpers.alert.error(res.data.message)
        }
    }
}
</script>

<style lang="scss" scoped>
    .card-header{
        position: relative;
    }
    .center {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .btn-tambah {
        height: 29px;
        background-color: #343E48;
    }
</style>

