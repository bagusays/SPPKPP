const express       = require('express');
const http          = require("http");
const bodyParser    = require('body-parser');
const Sequelize     = require('./App/Model')
const RouterModule  = require('./router-module')

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// STATIC FOLDER TO SAVE ASSET FILES
// ROUTING CORE
app.use("/", RouterModule);

server.listen(port);
console.log('Magic happens on port ' + port);