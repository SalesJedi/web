
var Router = require('express').Router(),
  Joi = require('joi'),
  Handler = require('./handler');

module.exports = Router;


Router.use('/api/:type(login|signup)', Handler.Auth);
Router.get('/logout', Handler.Logout);
Router.get('*', Handler.SPA);
