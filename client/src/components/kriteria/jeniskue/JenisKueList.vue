<template>
<div>
    <Sidebar></Sidebar>
    <div class="content-wrapper">
        <div class="container-fluid">
            <ol class="breadcrumb">
                <li style="font-size: 15px;" class="breadcrumb-item active">Kriteria Jenis Kue</li>
            </ol>
            
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Jenis Kue</div>
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
                                                <!-- <router-link :to="'/kriteria/edit/' + data.IdMasterCriteria + '/' + data.Id"> -->
                                                    <button @click="onEdit(data.Id)" class="btn btn-sm button-action">
                                                        <i class="fa fa-fw fa-edit"></i>
                                                    </button>
                                                <!-- </router-link> -->
                                                
                                                <button @click="onDelete(data.Id)" class="btn btn-sm button-action">
                                                    <i class="fa fa-fw fa-trash"> </i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <span>(<span style="color:red">*</span>) Total bobot jenis kue : {{data.totalBobotJenisKue}}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Fuzzy Jenis Kue</div>
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
                                                <!-- <router-link :to="'/kriteria/edit/' + data.IdMasterCriteria + '/' + data.Id"> -->
                                                    <button @click="onEdit(data.Id)" class="btn btn-sm button-action">
                                                        <i class="fa fa-fw fa-edit"></i>
                                                    </button>
                                                <!-- </router-link> -->
                                                
                                                <button @click="onDelete(data.Id)" class="btn btn-sm button-action">
                                                    <i class="fa fa-fw fa-trash"> </i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <span>(<span style="color:red">*</span>) Total bobot fuzzy : {{data.totalBobotFuzzy}}</span>
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

    methods: {

        async getList() {
            const result = await this.$helpers.axiosAuth.get(`/kriteria/jeniskue/list`);
            console.log(result.data)
            this.data = result.data.result;
        },

        async onDelete(IdCustomer) {
            const confirm = await this.$helpers.alert.delete()
            if (!confirm.value)
                return false

            const res = await this.$helpers.axiosAuth.post(`/customers/delete`, {IdCustomer})
            if(res.status == 200) {
                await this.$helpers.alert.success(res.data.message)
                this.getCustomers()
            } else
                this.$helpers.alert.error(res.data.message)
        }
    }
}
</script>
