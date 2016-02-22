
module.exports = function(Server) {

  // 404 handler
  Server.use(function(req, res, next) {

    return res
      .status(404)
      .render('errors/404', {
        url: req.originalUrl,
        title: 'Route not found'
      });
  });


  // 500 handler
  Server.use(function(err, req, res, next) {

    // Log error
    logger.error(err);

    return res
      .status(err.status || 500)
      .render('errors/500', {
        title: 'Some error occured, please try again.'
      });
  });

};
