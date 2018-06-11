const db = require('../../db')
const jsonParse = require('../Helper/json-parse')
const jwt = require('jsonwebtoken')
const jwtProvider = require('../../jwt-provider')

class AuthService {

    constructor() { }

    async requestToken(param) {
        try {
            const { Username, Password } = param
            const q = await db('pp_user').where({Username, Password})

            if(q != 0) {
                const payload = { Username }
                const expiresTime = { expiresIn: 3600*24 }
                const token = jwt.sign(payload, jwtProvider.config.secretOrKey, expiresTime);

                return jsonParse({ result: { token: token }})
            } else
                return jsonParse({ message: 'Username atau password salah', status: 401 })
        } catch (error) {
            return jsonParse({ message: error.message, status: 500 })
        }
    }

    async verifyToken(token) {
        // token = JSON.parse(token)
        jwt.verify(token, jwtProvider.config.secretOrKey, async function(err, decoded) {
            if (err)
                return jsonParse({ message: err, status: 401 })
            else {
                const user = await db('pp_user').where({Username: decoded.Username})
                if(user != 0)
                    return jsonParse({ message: 'ok', status: 200 })
            }
            return jsonParse({ message: 'ok', status: 200 })
        })
    }
}

module.exports = AuthService