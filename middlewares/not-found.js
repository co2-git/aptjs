module.exports = function notFound (app) {
  return function (req, res) {
    res.status(404);

    if ( req.path.match(/\.css$/) ) {
      res.header('Content-Type', 'text/css; charset=utf-8');
      res.end('/* Stylesheet not found */');
      return;
    }

    if ( req.path.match(/\.js$/) ) {
      res.header('Content-Type', 'text/js; charset=utf-8');
      res.end('/* Script not found */');
      return;
    }

    res.render('pages/not-found');
  };
};
