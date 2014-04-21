module.exports = function (callback) {
  var $ = require,
    _ = $('./_');

  $('./lib/get-http-status')(function (error, status, pid) {
    if ( error ) {
      return callback(error);
    }

    if ( ! status ) {
      return callback(new Error('HTTP server already down'));
    }

    try {
      process.kill(pid);
    }
    catch ( error ) {
      callback(error);
    }

    $('fs').unlink($('path').join(_.path, 'lock.pid'), callback);
  });
};