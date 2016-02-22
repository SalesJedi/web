
var _ = require('lodash'),
  Joi = require('joi');
  // cookieSession = require('cookie-session');


var VALIDATION_OPTS = {
  abortEarly: false,
  convert: true,
  allowUnknown: true,
  stripUnknown: true,
  skipFunctions: true,
};


exports.sanitize = function(schema) {

  // Compile to Joi schema
  schema.body = schema.body &&
                Joi.compile(schema.body
                   .options(VALIDATION_OPTS));

  schema.params = schema.params &&
                  Joi.compile(schema.params
                     .options(VALIDATION_OPTS));

  schema.query = schema.query &&
                  Joi.compile(schema.query
                     .options(VALIDATION_OPTS));


  return function(req, res, next) {

    // Validate body
    if (schema.body)
      req.body = schema.body.validate(req.body).value || req.body;

    // Validate params
    if (schema.params)
      req.params = Joi.validate(req.params, schema.params).value || req.params;

    // Validate query
    if (schema.query)
      req.query = Joi.validate(req.query, schema.query).value || req.params;

    return next();
  };
};
