const db = require('../../db')
const jsonParse = require('../Helper/json-parse')
const _ = require('lodash')

class KriteriaService {

    constructor() { }

    async jenisKueList() {
        try {
            const jenisKue = await db('pp_subcriteria').select().where({IdMasterCriteria: 1})
            const fuzzy = await db('pp_fuzzyjeniskuecriteria').select()
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

    async jenisKueEdit(param) {
        try {
            const { idMaster, id } = param

            const data = await db('pp_subcriteria').select().where({
                IdMasterCriteria: idMaster,
                id
            })

            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })

        }
    }

    async kebawelanPelangganList() {
        try {
            const data = await db('pp_subcriteria').select().where({IdMasterCriteria: 2})
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kebawelanPelangganEdit(param) {
        
    }

    async kesulitanBahanPokokList() {
        try {
            const data = await db('pp_subcriteria').select().where({IdMasterCriteria: 3})
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kesulitanBahanPokokEdit(param) {
        
    }

    async jarakPengirimanList() {
        try {
            const data = await db('pp_subcriteria').select().where({IdMasterCriteria: 4})
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async jarakPengirimanEdit(param) {
        
    }

    async deadlineHariList() {
        try {
            const data = await db('pp_deadlinecriteria').select().orderBy('Id', 'asc')
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async deadlineHariEdit(param) {
        
    }

    async tenagaKerjaList() {
        try {
            const data = await db('pp_subcriteria').select().where({IdMasterCriteria: 6})
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async tenagaKerjaEdit(param) {
        
    }

    async kuantitasPesananList() {
        try {
            const data = await db('pp_subcriteria').select().where({IdMasterCriteria: 7})
            return jsonParse({ result: data })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async kuantitasPesananEdit(param) {
        
    }
}

module.exports = KriteriaService