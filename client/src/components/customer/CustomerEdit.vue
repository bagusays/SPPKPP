<template>
<div>
    <ol class="breadcrumb">
        <li style="font-size: 15px;" class="breadcrumb-item"> <router-link to="/customers">List Orders</router-link>
        </li>
        <li class="breadcrumb-item active">
            Edit Customer
        </li>
    </ol>
    <div class="card">
        <div class="card-header"><span>Edit Customer</span></div>
        <div class="card-body">
            <div id="loading-element" v-if="isLoading"><img src="/img/loader.svg" class="loader" /></div>
            <form v-on:submit.prevent="onSubmit()">
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Nama<required-tag></required-tag></label>
                    <div class="col-md-4">
                        <input type="text" v-model="CustomerName" v-bind:class="errors.has('nama') ? 'is-invalid' : ''" name="nama" v-validate="'required|alpha'" class="form-control" required/>
                        <p v-show="errors.has('nama')" class="invalid-form">{{ errors.first('nama') }}</p>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-2 col-form-label">No Telepon<required-tag></required-tag></label>
                    <div class="col-md-4">
                        <input type="text" v-model="PhoneNumber" name="noTelepon" :class="errors.has('noTelepon') ? 'is-invalid' : ''" v-validate="'required|numeric'" class="form-control" required/>
                        <p v-show="errors.has('noTelepon')" class="invalid-form">{{ errors.first('noTelepon') }}</p>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Alamat</label>
                    <div class="col-md-4">
                        <textarea rows="5" v-model="Address" class="form-control"/>
                        <p v-show="errors.has('alamat')" class="invalid-form">{{ errors.first('alamat') }}</p>
                    </div>
                </div>

                <div class="float-right">
                    <button type="submit" v-bind:disabled="errors.any()" class="btn button-action"> <i class="fa fa-fw fa-save"> </i><span>Save</span></button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    created() {
        this.getDetail()
    },
    data() {
        return {
            isLoading: false,
            CustomerName: '',
            PhoneNumber: '',
            Address: ''
        }
    },
    methods: {
        async getDetail() {
            try {
                let param = {
                    IdCustomer: this.$route.params.id
                }
                let result = await axios.post(`${this.$basevar.baseUrl}/customers/detail`, param)
                console.log(result.data.result)
                this.CustomerName = result.data.result.CustomerName
                this.PhoneNumber = result.data.result.PhoneNumber
                this.Address = result.data.result.Address
            } catch(res) {
                console.log(res)
            }
        },
        async onSubmit() {
            var validate = await this.$validator.validateAll();
            if(validate) {
                let param = {
                    IdCustomer: this.$route.params.id,
                    CustomerName: this.CustomerName,
                    PhoneNumber: this.PhoneNumber,
                    Address: this.Address
                }
                let res = await axios.post(`${this.$basevar.baseUrl}/customers/edit`, param)
                console.log(res.data)
                this.$helpers.toast.show(res.data.result, "check")
                this.$router.push({ path: '/customers' })
            }
            else
                alert('ga lolos')
        }
    }
}
</script>
