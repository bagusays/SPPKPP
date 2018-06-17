const db = require('../../db')
const jsonParse = require('../Helper/json-parse')

class CustomerService {
    constructor() { }

    async getAllCustomer() {
        try {
            const data = await db.select().from('pp_customers')

            return jsonParse({ result: data})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async detailCustomer(IdCustomer) {
        try {
            const data = await db.select().from('pp_customers').where({ Id: IdCustomer }).first()

            return jsonParse({ result: data})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async editCustomer(param) {
        try {
            const { IdCustomer, CustomerName, PhoneNumber, Address } = param
            const data = await db('pp_customers').where({ Id: IdCustomer }).update({ CustomerName, PhoneNumber, Address })

            return jsonParse({message: "Data customer berhasil di ubah."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async addCustomer(param) {
        try {
            const { CustomerName, PhoneNumber, Address } = param
            const query = await db('pp_customers').insert({
                CustomerName,
                PhoneNumber,
                Address
            })

            return jsonParse({message: "Data customer berhasil ditambah."})
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }

    async deleteCustomer(IdCustomer) {
        try {
            const data = await db('pp_customers').where({Id: IdCustomer}).del();

            return jsonParse({message: "Data customer berhasil di hapus." })
        } catch (error) {
            return jsonParse({ status: 500, message: error.message })
        }
    }
}

module.exports = CustomerService;