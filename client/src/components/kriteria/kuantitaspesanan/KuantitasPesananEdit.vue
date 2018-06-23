<template>
<div>
    <Sidebar></Sidebar>
    <div class="content-wrapper">
        <div class="container-fluid">
            <ol class="breadcrumb">
                <li style="font-size: 15px;" class="breadcrumb-item"> <router-link to="/kriteria/kuantitaspesanan">List Kriteria Kuantitas Pesanan</router-link>
                </li>
                <li class="breadcrumb-item active">
                    Tambah Kriteria Kuantitas Pesanan
                </li>
            </ol>
            <div class="card">
                <div class="card-header"><span>Tambah Kriteria Kuantitas Pesanan</span></div>
                <div class="card-body">
                    <form v-on:submit.prevent="onSubmit()">
                        <div class="form-group row">
                            <label class="col-md-2 col-form-label">Nama Kriteria<required-tag></required-tag></label>
                            <div class="col-md-4">
                                <vue-slider v-model="form.valueSlider" v-bind="optionSlider"></vue-slider>
                            </div>
                            <div class="col-md-2">
                                <input type="text" v-model="previewKriteria" disabled class="form-control">
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
import vueSlider from 'vue-slider-component';

export default {
    components: {
        'Sidebar': Sidebar,
        'vue-slider': vueSlider
    },
    data() {
        return {
            form: {
                IdMasterKriteria: 3,
                valueSlider: [],
                namaKriteria: '',
                bobot: ''
            },
            optionSlider: {
                width: "100%",
                height: 5,
                dotSize: 16,
                min: 1,
                max: 50,
                // disabled: false,
                // show: true,
                tooltip: "always",
                bgStyle: {
                    "backgroundColor": "#fff",
                    "boxShadow": "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"
                },
                tooltipStyle: {
                    "backgroundColor": "#414C58",
                    "borderColor": "#414C58"
                },
                processStyle: {
                    "backgroundColor": "#414C58"
                }
            }
        }
    },

    computed: {
        previewKriteria() {
            console.log('aktif')
            return `${this.form.valueSlider[0]} - ${this.form.valueSlider[1]} pcs`
        }
    },

    created() {
        this.getDetail()
    },

    methods: {

        async getDetail() {
            try {
                let param = {
                    Id: this.$route.params.id
                }
                let result = await this.$helpers.axiosAuth.post(`/kriteria/kuantitaspesanan/detail`, param)
                let kriteria = result.data.result.CriteriaName.split('-')
                this.form.valueSlider.push(kriteria[0])
                this.form.valueSlider.push(kriteria[1])
                this.form.bobot = result.data.result.CriteriaValue
            } catch(res) {
                console.log(res)
            }
        },

        async onSubmit() {
            const validate = await this.$validator.validateAll();
            
            if(validate) {
                if(this.form.valueSlider[0] == this.form.valueSlider[1]) {
                    await this.$helpers.alert.error("Jumlah kuantitas tidak boleh sama")
                    return false
                }
                this.form.Id = this.$route.params.id
                this.form.namaKriteria = `${this.form.valueSlider[0]}-${this.form.valueSlider[1]}`
                // let res = await this.$helpers.axiosAuth.post(`/kriteria/kuantitaspesanan/edit`, this.form)
                // if(res.status == 200) {
                //     await this.$helpers.alert.success(res.data.message)
                //     this.$router.push({ path: '/kriteria/kuantitaspesanan' })
                // } else
                //     await this.$helpers.alert.error(res.data.message)
            }
        }
    }
}
</script>
