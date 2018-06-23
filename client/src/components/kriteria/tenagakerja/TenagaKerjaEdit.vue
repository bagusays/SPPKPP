<template>
<div>
    <Sidebar></Sidebar>
    <div class="content-wrapper">
        <div class="container-fluid">
            <ol class="breadcrumb">
                <li style="font-size: 15px;" class="breadcrumb-item"> <router-link to="/kriteria/tenagakerja">List Kriteria Tenaga Kerja</router-link>
                </li>
                <li class="breadcrumb-item active">
                    Edit Kriteria Tenaga Kerja
                </li>
            </ol>
            <div class="card">
                <div class="card-header"><span>Edit Kriteria Tenaga Kerja</span></div>
                <div class="card-body">
                    <form v-on:submit.prevent="onSubmit()">
                        <div class="form-group row">
                            <label class="col-md-2 col-form-label">Nama Kriteria<required-tag></required-tag></label>
                            <div class="input-group col-md-4">
                                <input type="text" v-model="form.namaKriteria" v-bind:class="errors.has('namaKriteria') ? 'is-invalid' : ''" name="namaKriteria" v-validate="'required'" class="form-control" required/>
                                <p v-show="errors.has('namaKriteria')" class="invalid-form">{{ errors.first('namaKriteria') }}</p>
                                <div class="input-group-append">
                                    <span class="input-group-text" id="basic-addon2">Orang</span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-2 col-form-label">Bobot<required-tag></required-tag></label>
                            <div class="col-md-4">
                                <input id="bobot" type="text" v-model="form.bobot" name="bobot" :class="errors.has('bobot') ? 'is-invalid' : ''" v-validate="'required'" class="form-control" required/>
                                <b-tooltip triggers="focus" placement="right" target="bobot">Isi dengan value 0 sampai 1. Contoh 0.2 (menggunakan titik)</b-tooltip>
                                <p v-show="errors.has('bobot')" class="invalid-form">{{ errors.first('bobot') }}</p>
                            </div>
                        </div>

                        <div class="float-right">
                            <button type="submit" v-bind:disabled="errors.any()" class="btn button-action"> <i class="fa fa-fw fa-save"> </i><span>Save</span></button>
                        </div>
                    </form>
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
    created() {
        this.getDetail()
    },
    data() {
        return {
            form: {
                namaKriteria: '',
                bobot: ''
            }
        }
    },
    methods: {

        async getDetail() {
            try {
                let param = {
                    Id: this.$route.params.id
                }
                let result = await this.$helpers.axiosAuth.post(`/kriteria/tenagakerja/detail`, param)
                this.form.namaKriteria = result.data.result.CriteriaName
                this.form.bobot = result.data.result.CriteriaValue
            } catch(res) {
                console.log(res)
            }
        },

        async onSubmit() {
            const validate = await this.$validator.validateAll();
            this.form.Id = this.$route.params.id
            if(validate) {
                let res = await this.$helpers.axiosAuth.post(`/kriteria/tenagakerja/edit`, this.form)
                if(res.status == 200) {
                    await this.$helpers.alert.success(res.data.message)
                    this.$router.push({ path: '/kriteria/tenagakerja' })
                } else
                    await this.$helpers.alert.error(res.data.message)
            }
        }
    }
}
</script>
