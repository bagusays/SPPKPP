<template>
<div>
    <Sidebar></Sidebar>
    <div class="content-wrapper">
        <div class="container-fluid">
            <ol class="breadcrumb">
                <li style="font-size: 15px;" class="breadcrumb-item active">Kriteria Deadline Hari</li>
            </ol>
            
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Kriteria Deadline Hari
                            <span class="center"></span>
                            <div class="float-right">
								<router-link to="/kriteria/deadlinehari/tambah" class="btn btn-sm button-action btn-tambah">
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
                                        <tr v-for="data in data" :key="data.Id">
                                            <td class="text-center">{{data.CriteriaName}} Hari</td>
                                            <td class="text-center">{{data.CriteriaValue}}</td>
                                            <td class="text-center">
                                                <router-link :to="'/kriteria/deadlinehari/edit/' + data.Id">
                                                    <button class="btn btn-sm button-action">
                                                        <i class="fa fa-fw fa-edit"></i>
                                                    </button>
                                                </router-link>
                                                
                                                <button @click="onDelete(data.Id)" class="btn btn-sm button-action">
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

    methods: {

        async getList() {
            const result = await this.$helpers.axiosAuth.get(`/kriteria/deadlinehari/list`);
            console.log(result.data)
            this.data = result.data.result;
        },

        async onDelete(Id) {
            const confirm = await this.$helpers.alert.delete()
            console.log(Id)
            if (!confirm.value)
                return false

            const res = await this.$helpers.axiosAuth.post(`/kriteria/deadlinehari/delete`, {Id})
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

