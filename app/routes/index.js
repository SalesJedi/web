
const Joi = require('joi');


module.exports = function(Server) {

  /**
   * Footer Pages
   */
  /**** NOT USED ***
  Server.get('/:type(about|terms-of-use|privacy-policy)',
  app.routeHelper.sanitize({
    params: Joi.object({
      type: Joi.string().lowercase().trim()
    })
  }),
  (req, res, next) => {

    var title;

    switch(req.params.type) {
      case 'about':
        title = 'Blah | About Us';
        break;

      case 'terms-of-use':
        title = 'Blah | Terms of Use';
        break;

      case 'privacy-policy':
        title = 'Blah | Privacy Policy';
        break;
    };

    return res.render('footer/'+req.params.type, {
      title: title
    });
  });
  **********((******/


  /**
   * Landing Page
   */
  Server.get('/*', (req, res, next) => {

    return res.render('landing/index', {
      title: 'Blah',
      url: req.originalUrl,
    });
  });


  /**
   * 404 & 500 error hander
   */
  require('./errors')(Server);
};
