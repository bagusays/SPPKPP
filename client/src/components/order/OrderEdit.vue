<template>
<div>
    <Sidebar></Sidebar>
    <div class="content-wrapper">
        <div class="container-fluid">
            <ol class="breadcrumb">
                <li style="font-size: 15px;" class="breadcrumb-item"> <router-link to="/orders">List Orders</router-link>
                </li>
                <li class="breadcrumb-item active">
                    Edit Order
                </li>
            </ol>
            <div class="card">
                <div class="card-header"><span>Edit Order</span></div>
                <div class="card-body">
                    <div id="loading-element" v-if="isLoading"><img src="/img/loader.svg" class="loader" /></div>
                    <form v-on:submit.prevent="onSubmit()">
                        <div class="form-group row">
                            <label class="col-md-2 col-form-label">Nama<required-tag></required-tag></label>
                            <div class="col-md-4">
                                <vue-multiselect v-model="form.Nama" v-bind:options="namaOptions" v-bind:preserve-search="true" placeholder="Cari customer" label="CustomerName"
                                    track-by="CustomerName" v-bind:preselect-first="false" name="nama" v-bind:class="errors.has('nama') ? 'is-invalid' : ''" v-validate="'required'" required></vue-multiselect>
                                <p v-show="errors.has('nama')" class="invalid-form">{{ errors.first('nama') }}</p>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-2 col-form-label">Jenis Kue<required-tag></required-tag></label>
                            <div class="col-md-4">
                                <vue-multiselect v-model="form.JenisKue" v-bind:options="jenisKueOptions" v-bind:multiple="true" v-bind:close-on-select="false" v-bind:clear-on-select="false" v-bind:hide-selected="true" v-bind:preserve-search="true" placeholder="Pick some" label="CriteriaName"
                                    track-by="CriteriaName" v-bind:preselect-first="false" name="jenisKue" v-bind:class="errors.has('jenisKue') ? 'is-invalid' : ''" v-validate="'required'" required></vue-multiselect>
                                <p v-show="errors.has('jenisKue')" class="invalid-form">{{ errors.first('jenisKue') }}</p>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-2 col-form-label">Kebawelan Pelanggan<required-tag></required-tag></label>
                            <div class="col-md-4">
                                <select class="custom-select" v-model="form.KebawelanPelanggan" :class="errors.has('nama') ? 'is-invalid' : ''" name="kebawelanPelanggan" v-validate="{required: true, not_in: ''}">
                                    <option v-for="item in kebawelanPelangganOptions" :key="item.CriteriaName" :value="item.Id">{{item.CriteriaName}}</option>
                                </select>
                                <p v-show="errors.has('kebawelanPelanggan')" class="invalid-form">{{ errors.first('kebawelanPelanggan') }}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 col-form-label">Kesulitan Bahan Pokok<required-tag></required-tag></label>
                            <div class="col-md-4">
                                <select class="custom-select" v-model="form.KesulitanBahanPokok" :class="errors.has('nama') ? 'is-invalid' : ''" name="kesulitanBahanPokok" v-validate="{required: true, not_in: ''}">
                                    <option v-for="item in kesulitanBahanPokokOptions" :key="item.CriteriaName" :value="item.Id">{{item.CriteriaName}}</option>
                                </select>
                                <p v-show="errors.has('kesulitanBahanPokok')" class="invalid-form">{{ errors.first('kesulitanBahanPokok') }}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 col-form-label">Jarak Pengiriman<required-tag></required-tag></label>
                            <div class="col-md-4">
                                <select class="custom-select" v-model="form.JarakPengiriman" :class="errors.has('nama') ? 'is-invalid' : ''" name="jarakPengiriman" v-validate="{required: true, not_in: ''}">
                                    <option v-for="item in jarakPengirimanOptions" :key="item.CriteriaName" :value="item.Id" required>{{item.CriteriaName}}</option>
                                </select>
                                <p v-show="errors.has('jarakPengiriman')" class="invalid-form">{{ errors.first('jarakPengiriman') }}</p>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-2 col-form-label">Deadline<required-tag></required-tag></label>
                            <div class="col-md-4">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">
                                            <i class="fa fa-calendar" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <vuejs-datepicker v-model="form.DeadlineDate" :format="dateFormat" :disabled-dates="dateConfig.disabledDates" name="deadline" :class="errors.has('deadline') ? 'is-invalid' : ''" v-validate="'required'" bootstrap-styling required></vuejs-datepicker>
                                    <p v-show="errors.has('deadline')" class="invalid-form">{{ errors.first('deadline') }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-2 col-form-label">Tenaga Kerja<required-tag></required-tag></label>
                            <div class="col-md-4">
                                <select class="custom-select" v-model="form.TenagaKerja" :class="errors.has('nama') ? 'is-invalid' : ''" name="tenagaKerja" v-validate="{required: true, not_in: ''}">
                                <option v-for="item in tenagaKerjaOptions" :key="item.CriteriaName" :value="item.Id">{{item.CriteriaName}}</option>
                            </select>
                            <p v-show="errors.has('tenagaKerja')" class="invalid-form">{{ errors.first('tenagaKerja') }}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 col-form-label">Total Kuantitas<required-tag></required-tag></label>
                            <div class="col-md-1">
                                <input type="text" v-model="form.TotalQuantity" name="kuantitas" :class="errors.has('kuantitas') ? 'is-invalid' : ''" v-validate="'required|numeric'" class="form-control" required/>
                            </div>
                            <div class="col-md-5">
                                <p v-show="errors.has('kuantitas')" class="invalid-form">{{ errors.first('kuantitas') }}</p>
                            </div>
                        </div>
                        <div class="float-right">
                            <button type="submit" v-bind:disabled="errors.any()" class="btn button-action"> <i class="fa fa-fw fa-save"> </i><span>Save</span></button>
                        </div>
                    </form>
                    <pre>
                        {{form}}
                    </pre>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker';
import Sidebar from '../layout/Sidebar.vue'

export default {
    components: {
        'vue-multiselect': Multiselect,
        'vuejs-datepicker': Datepicker,        
        'Sidebar': Sidebar

    },
    created() {
        this.getParameter()
        this.getDetail()
    },
    data() {
        return {
            isLoading: false,

            form: {
                IdOrder: this.$route.params.id,
                Nama: '',
                JenisKue: [],
                KebawelanPelanggan: '',
                KesulitanBahanPokok: '',
                JarakPengiriman: '',
                DeadlineDate: '',
                TenagaKerja: '',
                TotalQuantity: ''
            },

            namaOptions: [],
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
        dateFormat(date) {
            return moment(date).format('YYYY/MM/DD');
        },

        async getParameter() {
            const result = await this.$helpers.axiosAuth.get(`/orders/parameter`)
            this.namaOptions = result.data.result.nama
            this.jenisKueOptions = result.data.result.jenisKue
            this.kebawelanPelangganOptions = result.data.result.kebawelanPelanggan
            this.kesulitanBahanPokokOptions = result.data.result.kesulitanBahanPokok
            this.jarakPengirimanOptions = result.data.result.jarakPengiriman
            this.tenagaKerjaOptions = result.data.result.tenagaKerja
        },

        async getDetail() {
            let param = {
                IdOrder: this.$route.params.id
            }
            const result = await this.$helpers.axiosAuth.post(`/orders/detail`, param)
            this.form.Nama = result.data.result.nama
            this.form.JenisKue = result.data.result.jenisKue
            this.form.KebawelanPelanggan = result.data.result.kebawelanPelanggan.IdSubCriteria
            this.form.KesulitanBahanPokok = result.data.result.kesulitanBahanPokok.IdSubCriteria
            this.form.JarakPengiriman = result.data.result.jarakPengiriman.IdSubCriteria
            this.form.TenagaKerja = result.data.result.tenagaKerja.IdSubCriteria
            this.form.DeadlineDate = result.data.result.nama.DeadlineDate
            this.form.TotalQuantity = result.data.result.nama.TotalQuantity
            console.log(this.form)
        },

        async onSubmit() {
            var validate = await this.$validator.validateAll();
            if(!validate) {
                alert('ga lolos')
                return false
            }
            console.log(this.form.DeadlineDate)
            this.form.DeadlineDate = moment(this.form.DeadlineDate, 'YYYY-MM-DD').format('YYYY/MM/DD')
            console.log(this.form.DeadlineDate + ' setelah')
            const result = await this.$helpers.axiosAuth.post(`/orders/edit`, this.form)
            if(result.status == 200) {
                await this.$helpers.alert.success(result.data.message)
                this.$router.push({ path: '/orders' })
            } else
                this.$helpers.alert.error(result.data.message)
        }
    }
}
</script>
