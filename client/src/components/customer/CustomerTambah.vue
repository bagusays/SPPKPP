<template>
<div>
    <ol class="breadcrumb">
        <li style="font-size: 15px;" class="breadcrumb-item"> <router-link to="/orders">List Orders</router-link>
        </li>
        <li class="breadcrumb-item active">
            Tambah Pemesan
        </li>
    </ol>
    <div class="card">
        <div class="card-header"><span>Tambah Pemesan</span></div>
        <div class="card-body">
            <div id="loading-element" v-if="isLoading"><img src="/img/loader.svg" class="loader" /></div>
            <form v-on:submit.prevent="onSubmit()">
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Nama<required-tag></required-tag></label>
                    <div class="col-md-4">
                        <input type="text" v-bind:class="errors.has('nama') ? 'is-invalid' : ''" name="nama" v-validate="'required|alpha'" class="form-control" required/>
                        <p v-show="errors.has('nama')" class="invalid-form">{{ errors.first('nama') }}</p>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-2 col-form-label">No Telepon<required-tag></required-tag></label>
                    <div class="col-md-4">
                        <input type="text" name="noTelepon" :class="errors.has('noTelepon') ? 'is-invalid' : ''" v-validate="'required|numeric'" class="form-control" required/>
                        <p v-show="errors.has('noTelepon')" class="invalid-form">{{ errors.first('noTelepon') }}</p>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Alamat</label>
                    <div class="col-md-4">
                        <textarea rows="5" class="form-control"/>
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
import Multiselect from 'vue-multiselect'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker';
import axios from 'axios'

export default {
    components: {
        'vue-multiselect': Multiselect,
        'vuejs-datepicker': Datepicker
    },
    created() {
        this.getParameter()
    },
    data() {
        return {
            isLoading: false,
            dateDeadline: '',
            jenisKue: null,

            jenisKueOptions: [],
            kebawelanPelangganOptions: [],
            kesulitanBahanPokokOptions: [],
            jarakPengirimanOptions: [],
            tenagaKerjaOptions: [],

            dateConfig: {
                disabledDates : {
                    to: moment().add(1, 'days')._d
                }
            }
        }
    },
    methods: {
        async getParameter() {
            try {
                const result = await axios.get('http://localhost:3000/data-pemesan/parameter')
                this.jenisKueOptions = result.data.jenisKue
                this.kebawelanPelangganOptions = result.data.kebawelanPelanggan
                this.kesulitanBahanPokokOptions = result.data.kesulitanBahanPokok
                this.jarakPengirimanOptions = result.data.jarakPengiriman
                this.tenagaKerjaOptions = result.data.tenagaKerja
            } catch(res) {
                console.log(res)
            }
        },
        async onSubmit() {
            var validate = await this.$validator.validateAll();
            if(validate) {
                alert('lolos')
            }
            else
                alert('ga lolos')
        }
    }
}
</script>
