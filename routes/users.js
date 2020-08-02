'use strict';

module.exports.register = (server, serviceLocator) => {
  const auth = require("../middlewares/jwt")

  server.post('/users/login', (req, res) => serviceLocator.get('userController').login(req, res));

  server.get('/users/verify', auth.checkToken, (req, res) => serviceLocator.get('userController').verify(req, res));

  server.post('/users/register', (req, res) => serviceLocator.get('userController').create(req, res));

  server.get('/users/u/:username', auth.checkToken, (req, res) => serviceLocator.get('userController').get(req, res));

};