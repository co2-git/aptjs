module.exports = function routesPartials (app) {
  return function (req, res, next) {
    if ( res.error ) {
      return next();
    }

    res.render('partials/' + req.params.partial);
  };
};
