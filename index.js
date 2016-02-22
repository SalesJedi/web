
const _ = require('lodash'),
  path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  deepFreeze = require('deep-freeze'),
  toFastProperties = require('to-fast-properties'),
  hpp = require('hpp');


// Init the app
global.app = null;
global.app = {};

// Build HTTP server
const Server = express();

// Load Config
app.config = require('./app/lib/config')(Server.get('env'));
app.config.env = Server.get('env');
app.config = deepFreeze(app.config);

// Load Global Logger
require('logger')({
  level: app.config.logger,
  stringify: app.config.env === 'production'
});

// Load Route Helper
app.routeHelper = require('./app/lib/route_helper');

// Express Server Defaults
Server.disable('x-powered-by');
Server.set('etag', true);
Server.set('query parser', 'simple');
Server.set('trust proxy', false);
Server.disable('strict routing');

// View Engine
Server.set('view engine', 'jade');
Server.set('views', path.join(__dirname, './app/views'));
Server.locals = deepFreeze(Object.assign({
  pretty: false,
  env: app.config.env
}, app.config.views));

// Request logger
Server.use(logger.request)

// Server Status
Server.use('/status', function(req, res, next) {
  return res.sendStatus(200);
});

// Bodyparser Middleware
Server.use(bodyParser.json({
  inflate: false,
  strict: true
}));

// HTTP Parameter Pollution Attacks
Server.use(hpp({
  checkQuery: true,
  // JSON parse is not checked,
  // Disabled url-encoded althogether
  checkBody: false
}));

// Public Dir
Server.use(express.static(path.join(__dirname,'./public'), {
  index: false,
  dotfiles: 'ignore',
  etag: false,
  extensions: false,
  redirect: false,
  lastModified: true,
  maxAge: '30d',
  // Set Gzip Headers Prod
  setHeaders: app.config.env === 'production'
    ? function(res, path) {
        if (/\.(css|js)$/i.test(path))
          res.setHeader('Content-Encoding', 'gzip');
      }
    : undefined
}));

// Load Routes
require('./app/routes')(Server);

// Start the Server
toFastProperties(app)
Server.listen(app.config.server.port, function() {
  logger.info('Web started',
              this.address().port,
              app.config.env);
});
