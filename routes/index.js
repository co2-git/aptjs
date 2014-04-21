module.exports = function (app) {
  return function (req, res, next) {
    if ( res.error ) {
      return next();
    }

    res.render('pages/index');
  };
};
