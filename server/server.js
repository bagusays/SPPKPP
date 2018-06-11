const express       = require('express');
const http          = require("http");
const bodyParser    = require('body-parser');
// const Sequelize     = require('./App/Model')
const knex          = require('./db')
const RouterModule  = require('./router-module')
const jwtProvider   = require('./jwt-provider')
const jwt           = require('jsonwebtoken')
const passport      = require('passport')

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

passport.use(jwtProvider.strategy)
app.use(passport.initialize())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// STATIC FOLDER TO SAVE ASSET FILES
// ROUTING CORE
app.use("/", RouterModule);

server.listen(port);
console.log('Magic happens on port ' + port);