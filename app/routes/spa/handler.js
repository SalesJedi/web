
var got = require('got');


exports.Auth = function(req, res, next) {

  var type = req.params.type.trim().toLowerCase();

  got[type === 'login' ? 'get' : 'post'](
    app.config.apiUrl + '/auth/' + type, {
      json: true,
      query: type === 'login' ? req.query : req.body
    },
    function(err, rsp, body) {

      if (err && body === undefined)
        return next(err);

      if (body.statusCode !== 200)
        return res.status(body.statusCode).json(rsp);

      req.session = null
      // ToDo: Create session with role and id:

  });
};


exports.Logout = function(req, res, next) {
  req.session = null
  return res.redirect('/');
};


exports.SPA = function(req, res, next) {







// if (result.success && result.success.role) {

//         // If the user is adming, redirect to admin.
//         if (result.success.role >= fixie.config.auth.roles.limited_admin)
//           return res.json({ redirect: 'http://admin.app.com' });

//         // Set session:
//         req.session = {
//           _id: result.success._id,
//           role: result.success.role
//         };

  console.log('-----------');
  console.log(req.session);
  console.log('-----------');
  req.session = { user: 'cool' };
  return res.render('index');
};
