const db = require('../../db')
const jsonParse = require('../Helper/json-parse')

class CustomerService {
    constructor() { }

    async getAllCustomer() {
        try {
            const data = await db.select().from('pp_customers')
            return jsonParse(data)
        } catch (error) {
            return jsonParse(error.message, 500)
        }
    }

    async detailCustomer(IdCustomer) {
        try {
            const data = await db.select().from('pp_customers').where({ IdCustomer })
            return { result: data }
        } catch (error) {
            return jsonParse(error.message, 500)
        }
    }

    async editCustomer(param) {
        try {
            const { IdCustomer, CustomerName, PhoneNumber, Address } = param
            const data = await db('pp_customers').where({ IdCustomer }).update({ CustomerName, PhoneNumber, Address })
            
            return jsonParse("Data customer berhasil di ubah.")
        } catch (error) {
            return jsonParse(error.message, 500)
        }
    }
}

module.exports = CustomerService;