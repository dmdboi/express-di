'use strict';

const serviceLocator = require('../lib/service_locator');
const config = require('./configs')();

//DESC: Registers the logger library from /lib/logger in dependencyMap
serviceLocator.register('logger', () => {
  return require('../lib/logger').create(config.application_logging);
});

serviceLocator.register('transporter', () => {
  return require('../lib/nodemailer').create();
});

serviceLocator.register('axios', () => {
  return require('axios');
});

serviceLocator.register('httpStatus', () => {
  return require('http-status');
});

serviceLocator.register('mongoose', () => {
  return require('mongoose');
});

serviceLocator.register('uniqid', () => {
  return require('uniqid');
});

serviceLocator.register('jwt', () => {
  return require('jsonwebtoken')
});

serviceLocator.register('bcrypt', () => {
  return require('bcrypt')
})

serviceLocator.register('indexController', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const httpStatus = serviceLocator.get('httpStatus');
  const IndexController = require('../controllers/index');

  return new IndexController(log, httpStatus);
});

serviceLocator.register('userService', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const mongoose = serviceLocator.get('mongoose');
  const httpStatus = serviceLocator.get('httpStatus');
  const jwt = serviceLocator.get('jwt')
  const UserService = require('../services/user');

  return new UserService(log, mongoose, httpStatus, jwt, config);
});

serviceLocator.register('userController', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const httpStatus = serviceLocator.get('httpStatus');
  const userService = serviceLocator.get('userService');
  const UserController = require('../controllers/user');

  return new UserController(log, userService, httpStatus);
});