'use strict';

require('dotenv').config();
const config = require('./configs/configs')();
const serviceLocator = require('./configs/di');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

// Initialize the database
const Database = require('./configs/database');
new Database(config.mongo.port, config.mongo.host, config.mongo.name);

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const formsRoutes = require('./routes/forms');
const analyticsRoutes = require('./routes/analytics');

var server = express();

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(cors())

indexRoutes.register(server, serviceLocator);
userRoutes.register(server, serviceLocator);
formsRoutes.register(server, serviceLocator);
analyticsRoutes.register(server, serviceLocator)

server.listen(5000, () => {
    console.log("server started on port 5001")
})
