<template>
<div>
    <ol class="breadcrumb">
        <li style="font-size: 15px;" class="breadcrumb-item active">List Customers</li>
    </ol>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <div id="loading-element" v-if="isLoading">
                        <img src="../../assets/loader.svg" class="loader" />
                    </div>
                    <div style="margin-bottom: 20px;" class="float-right">
                        <router-link to="/customers/tambah" class="btn button-action">
                            <i class="fa fa-fw fa-plus"> </i>
                            <span>Tambah</span>
                        </router-link>
                    </div>
                    <div class="col-md-3">
                        <input type="text" v-model="search" placeholder="Cari Customer..." class="form-control" />
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="thead">
                                <tr>
                                    <th scope="col" width="20%" class="align-middle">Nama</th>
                                    <th scope="col" width="20%" class="align-middle">No Telephone</th>
                                    <th scope="col" class="align-middle">Alamat</th>
                                    <th scope="col" width="15%" class="align-middle">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in listCustomers" :key="data.IdCustomer">
                                    <td class="text-center">{{data.CustomerName}}</td>
                                    <td class="text-center">{{data.PhoneNumber}}</td>
                                    <td class="text-center" v-bind:style="[data.Address == '-' ? {'color': 'red'} : {}]">{{ data.Address }}</td>
                                    <td class="text-center">
                                                <router-link :to="'/customers/edit/' + data.IdCustomer">
                                        
                                            <button class="btn btn-sm button-action">
                                                <i class="fa fa-fw fa-edit"></i>
                                            </button>
                                                </router-link>
                                        
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
</div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            isLoading: false,
            search: '',
            rawListCustomers: []
        }
    },
    created() {
        this.getCustomers()
    },
    computed: {
        listCustomers: function() {
			var data = this.rawListCustomers
			if (this.search == '')
				return data;
			else
				return data.filter((result) => result.CustomerName.toLowerCase().includes(this.search.toLowerCase()))
		}
    },
    methods: {
        async getCustomers() {
            const result = await axios.get(`${this.$basevar.baseUrl}/customers/list`);
            this.rawListCustomers = result.data.result;
        }
    }
}
</script>
