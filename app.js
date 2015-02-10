"use strict";
var express = require('express');
var app = express();

// var auth = express.basicAuth('testUser', 'testPass');

var nconf = require('nconf');
nconf.argv().env().file({ file: 'local.json' });

require('./settings')(app, express, nconf);
require('./routes')(app, nconf);


// var Sequelize = require('sequelize')
//   , sequelize = new Sequelize('treedb', 'barisakis', 'password', {
//       dialect: "postgres",
//       port: 5432,
//     })
 
// sequelize
//   .authenticate()
//   .complete(function(err) {
//     if (!!err) {
//       console.log('Unable to connect to the database:', err)
//     } else {
//       console.log('Connection has been established successfully.')
//     }
//   })

var port = process.env.PORT || nconf.get('port');
console.log('Listening at 127.0.0.1:' + port);
app.listen(port);
