<template>
<div>
    <ol class="breadcrumb">
        <li style="font-size: 15px;" class="breadcrumb-item"> <a href="/data-pemesan">Data Pemesan</a>
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
                    <label class="col-md-2 col-form-label">Nama</label>
                    <div class="col-md-4">
                        <input type="text" v-bind:class="errors.has('nama') ? 'is-invalid' : ''" name="nama" v-validate="'required|alpha'" class="form-control" required/>
                        <p v-show="errors.has('nama')" class="invalid-form">{{ errors.first('nama') }}</p>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Jenis Kue</label>
                    <div class="col-md-4">
                        <vue-multiselect v-model="jenisKue" v-bind:options="jenisKueOptions" v-bind:multiple="true" v-bind:close-on-select="false" v-bind:clear-on-select="false" v-bind:hide-selected="true" v-bind:preserve-search="true" placeholder="Pick some" label="attribut"
                            track-by="attribut" v-bind:preselect-first="false" name="jenisKue" v-bind:class="errors.has('jenisKue') ? 'is-invalid' : ''" v-validate="'required'" required></vue-multiselect>
                        <p v-show="errors.has('jenisKue')" class="invalid-form">{{ errors.first('jenisKue') }}</p>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Kebawelan Pelanggan</label>
                    <div class="col-md-4">
                        <select class="custom-select">
                            <option v-for="item in kebawelanPelangganOptions" :key="item.attribut" value="item.bobot">{{item.attribut}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Kesulitan Bahan Pokok</label>
                    <div class="col-md-4">
                        <select class="custom-select">
                            <option v-for="item in kesulitanBahanPokokOptions" :key="item.attribut" value="item.bobot">{{item.attribut}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Jarak Pengiriman</label>
                    <div class="col-md-4">
                        <select class="custom-select">
                            <option v-for="item in jarakPengirimanOptions" :key="item.attribut" value="item.bobot">{{item.attribut}}</option>
                        </select>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Deadline</label>
                    <div class="col-md-4">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    <i class="fa fa-calendar" aria-hidden="true"></i>
                                </span>
                            </div>
                            <vuejs-datepicker v-model="dateDeadline" :disabled-dates="dateConfig.disabledDates" name="deadline" :class="errors.has('deadline') ? 'is-invalid' : ''" v-validate="'required'" bootstrap-styling required></vuejs-datepicker>
                            <p v-show="errors.has('deadline')" class="invalid-form">{{ errors.first('deadline') }}</p>
                        </div>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Tenaga Kerja</label>
                    <div class="col-md-4">
                        <select class="custom-select">
                        <option v-for="item in tenagaKerjaOptions" :key="item.attribut" value="item.bobot">{{item.attribut}}</option>
                    </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Total Kuantitas</label>
                    <div class="col-md-1">
                        <input type="text" name="kuantitas" :class="errors.has('kuantitas') ? 'is-invalid' : ''" v-validate="'required|numeric'" class="form-control" required/>
                    </div>
                    <div class="col-md-5">
                        <p v-show="errors.has('kuantitas')" class="invalid-form">{{ errors.first('kuantitas') }}</p>
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
