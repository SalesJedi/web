
const defaults = {
  server: {
    port: process.env.NODE_PORT || process.env.PORT || 5001
  },

  logger: 'debug',

  views: {
    baseUrl: process.env.BASE_URL || '',
    assetUrl: process.env.ASSET_URL || '',
    version: process.env.VERSION || Date.now(),
    GA: process.env.GA || 'UA-xxxxxx',
  }
};

const prod = {
  logger: 'info',
};


module.exports = function(env) {

  return require('extend')(
    true,
    defaults,
    env === 'production' ? prod : {}
  );
};
