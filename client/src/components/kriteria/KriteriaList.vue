<template>
<div>
    <Sidebar></Sidebar>
    <div class="content-wrapper">
        <div class="container-fluid">
            <ol class="breadcrumb">
                <li style="font-size: 15px;" class="breadcrumb-item active">List Kriteria</li>
            </ol>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Sidebar from '../layout/Sidebar.vue'

export default {
    components: {
        'Sidebar': Sidebar
    },
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
            const result = await this.$helpers.axiosAuth.get(`/customers/list`);
            this.rawListCustomers = result.data.result;
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
