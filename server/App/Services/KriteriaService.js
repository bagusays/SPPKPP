const db = require('../../db')
const jsonParse = require('../Helper/json-parse')
const _ = require('lodash')

class KriteriaService {

    constructor() { }

    async masterList() {
        try {
            const data = await db('pp_mastercriteria').select().orderBy('Id', 'asc')
            const totalBobotMaster = _.sumBy(data, res => res.CriteriaValue)
            return jsonParse({ 
                result: {
                    data,
                    totalBobotMaster
                } 
            })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async masterDetail(Id) {
        try {
            const data = await db('pp_mastercriteria').select().where({
                Id,
            }).first()
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async masterEdit(param) {
        try {
            const { Id, namaKriteria, bobot } = param
            const data = await db('pp_mastercriteria').where({ Id }).update({ 
                CriteriaName: namaKriteria, 
                CriteriaValue: bobot, 
            })
            return jsonParse({message: "Kriteria berhasil di Edit."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async jenisKueAndFuzzyList() {
        try {
            const jenisKue = await db('pp_subcriteria').select().where({IdMasterCriteria: 1}).orderBy('CriteriaValue', 'desc')
            const fuzzy = await db('pp_fuzzyjeniskuecriteria').select().orderBy('Id', 'asc')
            const totalBobotJenisKue = _.sumBy(jenisKue, res => res.CriteriaValue)
            const totalBobotFuzzy = _.maxBy(fuzzy, res => {
                if(fuzzy.length == res.CriteriaName)
                    return res.CriteriaName
            }).CriteriaName
            return jsonParse({ 
                result: {
                    jenisKue,
                    fuzzy,
                    totalBobotJenisKue,
                    totalBobotFuzzy
                }
             })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async jenisKueDetail(Id) {
        try {
            const data = await db('pp_subcriteria').select().where({
                Id,
            }).first()
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async jenisKueTambah(param) {
        try {
            await this.tambahSubCriteria(1, param.namaKriteria, param.bobot)
            return jsonParse({message: "Kriteria berhasil di tambah."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async jenisKueEdit(param) {
        try {
            await this.editSubCriteria(param.Id, param.namaKriteria, param.bobot)
            return jsonParse({message: "Kriteria berhasil di ubah."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async jenisKueDelete(param) {
        try {
            await this.deleteSubCriteria(param)
            return jsonParse({message: "Kriteria berhasil di hapus."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async fuzzyKueDetail(Id) {
        try {
            const data = await db('pp_fuzzyjeniskuecriteria').select().where({
                Id,
            }).first()
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async fuzzyKueTambah(param) {
        try {
            const { namaKriteria, bobot } = param
            var max = await db('pp_fuzzyjeniskuecriteria').select().orderBy('Id', 'desc').first()
            max = max.Id + 1
            if(max.toString() === namaKriteria) {
                const query = await db('pp_fuzzyjeniskuecriteria').insert({
                    Id: namaKriteria,
                    CriteriaName: namaKriteria,
                    CriteriaValue: bobot,
                })
            } else {
                return jsonParse({result: "error", message: "Kriteria harus berurutan, tidak boleh dilongkap."})    
            }
            return jsonParse({message: "Kriteria berhasil di tambah."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async fuzzyKueEdit(param) {
        try {
            const { Id, namaKriteria, bobot } = param
            const data = await db('pp_fuzzyjeniskuecriteria').where({ Id }).update({ 
                CriteriaName: namaKriteria, 
                CriteriaValue: bobot, 
            })
            return jsonParse({message: "Kriteria berhasil di ubah."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async fuzzyKueDelete(Id) {
        try {
            const data = await db('pp_fuzzyjeniskuecriteria').where({Id}).del();
            return jsonParse({message: "Kriteria berhasil di hapus."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kebawelanPelangganList() {
        try {
            const data = await db('pp_subcriteria').select().where({IdMasterCriteria: 2}).orderBy('CriteriaValue', 'desc')
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kebawelanPelangganDetail(Id) {
        try {
            const data = await db('pp_subcriteria').select().where({
                Id,
            }).first()
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kebawelanPelangganTambah(param) {
        try {
            await this.tambahSubCriteria(2, param.namaKriteria, param.bobot)
            return jsonParse({message: "Kriteria berhasil di tambah."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kebawelanPelangganEdit(param) {
        try {
            await this.editSubCriteria(param.Id, param.namaKriteria, param.bobot)
            return jsonParse({message: "Kriteria berhasil di ubah."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kebawelanPelangganDelete(param) {
        try {
            await this.deleteSubCriteria(param)
            return jsonParse({message: "Kriteria berhasil di hapus."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kesulitanBahanPokokList() {
        try {
            const data = await db('pp_subcriteria').select().where({IdMasterCriteria: 3}).orderBy('CriteriaValue', 'desc')
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kesulitanBahanPokokDetail(Id) {
        try {
            const data = await db('pp_subcriteria').select().where({
                Id,
            }).first()
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kesulitanBahanPokokTambah(param) {
        try {
            await this.tambahSubCriteria(3, param.namaKriteria, param.bobot)
            return jsonParse({message: "Kriteria berhasil di tambah."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kesulitanBahanPokokEdit(param) {
        try {
            await this.editSubCriteria(param.Id, param.namaKriteria, param.bobot)
            return jsonParse({message: "Kriteria berhasil di Edit."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kesulitanBahanPokokDelete(param) {
        try {
            await this.deleteSubCriteria(param)
            return jsonParse({message: "Kriteria berhasil di hapus."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async jarakPengirimanList() {
        try {
            const data = await db('pp_subcriteria').select().where({IdMasterCriteria: 4}).orderBy('CriteriaValue', 'desc')
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async jarakPengirimanDetail(Id) {
        try {
            const data = await db('pp_subcriteria').select().where({
                Id,
            }).first()
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async jarakPengirimanTambah(param) {
        try {
            await this.tambahSubCriteria(4, param.namaKriteria, param.bobot)
            return jsonParse({message: "Kriteria berhasil di tambah."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async jarakPengirimanEdit(param) {
        try {
            await this.editSubCriteria(param.Id, param.namaKriteria, param.bobot)
            return jsonParse({message: "Kriteria berhasil di Edit."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async jarakPengirimanDelete(param) {
        try {
            await this.deleteSubCriteria(param)
            return jsonParse({message: "Kriteria berhasil di hapus."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async deadlineHariList() {
        try {
            const data = await db('pp_deadlinecriteria').select().orderBy('Id', 'asc')
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async deadlineHariDetail(Id) {
        try {
            const data = await db('pp_deadlinecriteria').select().where({
                Id,
            }).first()
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async deadlineHariTambah(param) {
        try {
            const { namaKriteria, bobot } = param
            const query = await db('pp_deadlinecriteria').insert({
                Id: namaKriteria,
                IdMasterCriteria: 5,
                CriteriaName: namaKriteria,
                CriteriaValue: bobot,
            })

            return jsonParse({message: "Kriteria berhasil di tambah."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async deadlineHariEdit(param) {
        try {
            const { Id, namaKriteria, bobot } = param
            const data = await db('pp_deadlinecriteria').where({ Id }).update({ 
                CriteriaName: namaKriteria, 
                CriteriaValue: bobot, 
            })
            return jsonParse({message: "Kriteria berhasil di Edit."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async deadlineHariDelete(Id) {
        try {
            const data = await db('pp_deadlinecriteria').where({Id}).del();
            return jsonParse({message: "Kriteria berhasil di hapus."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async tenagaKerjaList() {
        try {
            const data = await db('pp_subcriteria').select().where({IdMasterCriteria: 6}).orderBy('CriteriaValue', 'desc')
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async tenagaKerjaDetail(Id) {
        try {
            const data = await db('pp_subcriteria').select().where({
                Id,
            }).first()
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async tenagaKerjaTambah(param) {
        try {
            await this.tambahSubCriteria(6, param.namaKriteria, param.bobot)
            return jsonParse({message: "Kriteria berhasil di tambah."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async tenagaKerjaEdit(param) {
        try {
            await this.editSubCriteria(param.Id, param.namaKriteria, param.bobot)
            return jsonParse({message: "Kriteria berhasil di Edit."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async tenagaKerjaDelete(param) {
        try {
            await this.deleteSubCriteria(param)
            return jsonParse({message: "Kriteria berhasil di hapus."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kuantitasPesananList() {
        try {
            const data = await db('pp_subcriteria').select().where({IdMasterCriteria: 7}).orderBy('CriteriaValue', 'desc')
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kuantitasPesananDetail(Id) {
        try {
            const data = await db('pp_subcriteria').select().where({
                Id,
            }).first()
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kuantitasPesananTambah(param) {
        try {
            await this.tambahSubCriteria(7, param.namaKriteria, param.bobot)
            return jsonParse({message: "Kriteria berhasil di tambah."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kuantitasPesananEdit(param) {
        try {
            await this.editSubCriteria(param.Id, param.namaKriteria, param.bobot)
            return jsonParse({message: "Kriteria berhasil di Edit."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kuantitasPesananDelete(param) {
        try {
            await this.deleteSubCriteria(param)
            return jsonParse({message: "Kriteria berhasil di hapus."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async tambahSubCriteria(IdMasterCriteria, CriteriaName, CriteriaValue) {
        try {
            const query = await db('pp_subcriteria').insert({
                IdMasterCriteria,
                CriteriaName,
                CriteriaValue,
            })
        } catch (error) {
            return error
        }
    }

    async editSubCriteria(Id, CriteriaName, CriteriaValue){
        try {
            const data = await db('pp_subcriteria').where({ Id }).update({ 
                CriteriaName, 
                CriteriaValue, 
            })
        } catch (error) {
            return error
        }
    }

    async deleteSubCriteria(Id){
        try {
            const data = await db('pp_subcriteria').where({Id}).del();
        } catch (error) {
            return error
        }
    }
}

module.exports = KriteriaService