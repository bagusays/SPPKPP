<template>
<div>
    <Sidebar></Sidebar>
    <div class="content-wrapper">
        <div class="container-fluid">
            <ol class="breadcrumb">
                <li style="font-size: 15px;" class="breadcrumb-item active">Kriteria Master</li>
            </ol>

            <b-alert show variant="info" v-if="checkBobot">
                <strong>Perhatian!</strong><br>
                <span>
                    Jika ingin mengubah kriteria master, pastikan total bobot haruslah berjumlah 1.
                </span>
            </b-alert>

            <b-alert show variant="danger" v-if="!checkBobot">
                <strong>Perhatian!</strong><br>
                <span>
                    Total bobot belum berjumlah 1. Silahkan edit sebelum menggunakan fitur pencarian prioritas!
                </span>
            </b-alert>
            
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Master
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
                                        <tr v-for="data in data.data" :key="data.Id">
                                            <td class="text-center">{{data.CriteriaName}}</td>
                                            <td class="text-center">{{data.CriteriaValue}}</td>
                                            <td class="text-center">
                                                <router-link :to="'/kriteria/master/edit/' + data.Id">
                                                    <button class="btn btn-sm button-action">
                                                        <i class="fa fa-fw fa-edit"></i>
                                                    </button>
                                                </router-link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <span>(<span style="color:red">*</span>) Total bobot master : <span :style="!checkBobot ? {color: 'red', fontWeight: 'bold'} : 'null'">{{data.totalBobotMaster}}</span></span>
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
            data: []
        }
    },

    created() {
        this.getList()
    },

    computed: {
        checkBobot() {
            return this.data.totalBobotMaster == 1
        }
    },

    methods: {

        async getList() {
            const result = await this.$helpers.axiosAuth.get(`/kriteria/master/list`);
            console.log(result.data)
            this.data = result.data.result;
        },

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
