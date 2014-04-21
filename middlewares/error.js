module.exports = function error (app) {
  return function (req, res, next) {
    if ( res.error ) {
      /* Log error */
      console.log('Got error'.red);
      console.error((res.error.message || res.error.toString()).yellow);

      if ( res.error.stack ) {
        console.log(res.error.stack);
      }

      if ( res.isAPI ) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: {
          message: res.error.message || res.error.toString(),
          code: res.error.code,
          errno: res.error.errno
        }}, null, 2));
      }

      else {
        /* Render Error View */
        res.render('pages/error', {
          message: res.error.message,
          code: res.error.code
        });
      }
    }

    else {
      next();
    }
  }
};
