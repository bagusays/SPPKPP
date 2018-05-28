const Sequelize = require('sequelize');

const connection = new Sequelize('mysql://root:1234@127.0.0.1:3306/sppk_pp_saw');

connection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = connection;